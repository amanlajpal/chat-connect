package com.project.chatconnectbackend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.chatconnectbackend.dto.AuthenticationRequest;
import com.project.chatconnectbackend.dto.AuthenticationResponse;
import com.project.chatconnectbackend.dto.RegisterRequest;
import com.project.chatconnectbackend.dto.ResponseDTO;
import com.project.chatconnectbackend.enumValues.ResponseStatus;
import com.project.chatconnectbackend.model.User;
import com.project.chatconnectbackend.service.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
class ChatConnectBackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AuthenticationService authenticationService;

	@Test
	void testRegisterUser() throws Exception {
		// Mocking authentication service response
		AuthenticationResponse authResponse = new AuthenticationResponse(
				"testToken",
				"User registered successfully",
				"success",
				null);
		when(authenticationService.register(Mockito.any(RegisterRequest.class), Mockito.any(HttpServletResponse.class)))
				.thenReturn(authResponse);

		// Performing POST request to register a user
		MvcResult result = mockMvc.perform(post("/api/v1/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{
						\"name\": \"testName\",
						\"phoneNumber\": \"1234567891\",
						 \"password\": \"testPassword\"}
						 """))
				.andExpect(status().isOk())
				.andReturn();

		// Parse response body as JSON
		String responseBody = result.getResponse().getContentAsString();
		JSONObject json = new JSONObject(responseBody);

		// Extract token property
		String token = json.getString("token");
		String message = json.getString("message");

		// Assertion
		assertEquals("testToken", token);
		assertEquals("User registered successfully", message);
	}

	@Test
	void testLoginUser() throws Exception {
		// Mocking authentication service response
		User user = new User(); // Create a specific user object
		ResponseDTO responseDTO = new ResponseDTO(ResponseStatus.success, user, "Logged in! Welcome testName", 0);
		when(authenticationService.authenticate(Mockito.any(AuthenticationRequest.class),
				Mockito.any(HttpServletResponse.class)))
				.then(invocation -> {
					HttpServletResponse response = invocation.getArgument(1);
					// Add the token cookie to the response
					Cookie cookie = new Cookie("token", "testToken");
					cookie.setHttpOnly(true);
					response.addCookie(cookie);
					return responseDTO;
				});

		MvcResult result = mockMvc.perform(post("/api/v1/auth/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"phoneNumber": "1234567891",
						 "password": "testPassword"}"""))
				.andExpect(status().isOk())
				.andReturn();

		// Assertion
		Cookie[] cookies = result.getResponse().getCookies();
		assertEquals(1, cookies.length);
		assertEquals("token", cookies[0].getName());
		assertEquals("testToken", cookies[0].getValue());
		assertTrue(cookies[0].isHttpOnly());
	}

	@Test
	void testLogoutUser() throws Exception {
		// Mocking authentication service response
		Map<String, Object> logoutResponse = new HashMap<>();
		logoutResponse.put("status", "success");
		logoutResponse.put("message", "Logged out successfully!");
		when(authenticationService.logout(Mockito.any(HttpServletRequest.class),
				Mockito.any(HttpServletResponse.class)))
				.thenReturn(logoutResponse);

		// Performing POST request to logout a user
		MvcResult result = mockMvc.perform(post("/api/v1/auth/logout")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		// Parse response body as JSON
		String responseBody = result.getResponse().getContentAsString();
		JSONObject json = new JSONObject(responseBody);

		// Extract token property
		String token = json.getString("status");
		String message = json.getString("message");

		// Assertion
		assertEquals("success", token);
		assertEquals("Logged out successfully!", message);

	}

}