package com.project.chatconnectbackend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.chatconnectbackend.config.JwtService;
import com.project.chatconnectbackend.dto.AuthenticationRequest;
import com.project.chatconnectbackend.dto.AuthenticationResponse;
import com.project.chatconnectbackend.dto.RegisterRequest;
import com.project.chatconnectbackend.model.User;
import com.project.chatconnectbackend.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            // @ResponseBody means the returned String is the response, not a view name
            // @RequestParam means it is a parameter from the GET or POST request
            // Split name by space
            String[] avatarUrls = new String[] {
                    "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg",
                    "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg",
                    "https://img.freepik.com/free-photo/portrait-boy-blue-cap-glasses-3d-rendering_1142-40451.jpg",
                    "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034077.jpg",
                    "https://img.freepik.com/premium-photo/happy-3d-cartoon-man-using-laptop-siting-transparent-white-background_973886-19.jpg"
            };

            String name = request.getName();
            String phone = request.getPhoneNumber();
            String password = request.getPassword();
            String[] nameParts = name.split(" ");

            // Check if name has only one part (no spaces)
            String firstName;
            String lastName;
            if (nameParts.length == 1) {
                firstName = nameParts[0].trim(); // Use entire name as first name
                lastName = ""; // Set last name to empty string
            } else {
                // Use first part as first name and remaining parts as last name
                firstName = nameParts[0].trim();
                lastName = name.substring(name.indexOf(" ") + 1).trim();
            }

            User newUser = new User();
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName);
            newUser.setPhoneNumber(phone);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setProfilePhoto(avatarUrls[(int) (Math.random() * avatarUrls.length)]);

            User createdUser = userRepository.save(newUser);
            newUser.setId(createdUser.getId());

            var jwt = jwtService.generateToken(newUser);

            return AuthenticationResponse
                    .builder()
                    .token(jwt)
                    .message("User registered successfully")
                    .status("success")
                    .data(newUser)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getPhoneNumber(),
                            request.getPassword()));

            var user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow();

            var jwt = jwtService.generateToken(user);

            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setDomain("localhost");
            cookie.setPath("/");
            cookie.setSecure(false);
            response.addCookie(cookie);

            return AuthenticationResponse
                    .builder()
                    .token(jwt)
                    .message("Logged in! Welcome " + user.getFirstName())
                    .status("success")
                    .data(user)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
