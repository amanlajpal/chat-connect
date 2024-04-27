import axiosInstance from "@/connections/axiosInstance";
import { setAuthentication } from "@/store/authenticationSlice";
import { setUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetUserFromToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getToken = () => {
    axiosInstance
      .get("/v1/auth/getUserFromToken")
      .then((response) => {
        const userRegistered = response?.data?.data;
        dispatch(
          setUser({
            id: userRegistered?.id,
            firstName: userRegistered?.firstName,
            lastName: userRegistered?.lastName,
            phoneNumber: userRegistered?.phoneNumber,
            email: userRegistered?.email,
            profilePhoto: userRegistered?.profilePhoto,
            createdAt: userRegistered?.createdAt,
          })
        );
        if (userRegistered?.id) {
          dispatch(
            setAuthentication({
              isAuthenticated: true,
              isTokenVerified: true,
            })
          );
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error, "error!");
        dispatch(
          setAuthentication({
            isAuthenticated: false,
            isTokenVerified: true,
          })
        );
        navigate("/");
      });
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getToken();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);
  return <div></div>;
};
export default GetUserFromToken;
