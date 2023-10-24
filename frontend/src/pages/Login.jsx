import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../slice/authSlice";
import {
  Container,
  Wave,
  FormCon,
  Button,
  ImgContainer,
  StyledLink,
} from "../component/styles/signup-loginStyles";
import InputField from "../component/InputField";
import { MdLock } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import toast from "react-hot-toast";

export default function Login() {
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleInputFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field, value) => {
    if (!value) {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Dispatch the loginUser action
    dispatch(loginUser(loginData))
      .then((response) => {
        if (response.payload) {
          toast.success("Login successful");
          navigate("/dashboard");
        } else {
          toast.error("Login failed. Please check your username and password.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while logging in. Please try again.");
      });

    setLoginData({ username: "", password: "" });
  };

  return (
    <>
      <Wave src="/wave.png" />
      <Container>
        <ImgContainer>
          <img src="/welcome.svg" />
        </ImgContainer>
        <FormCon>
          <form onSubmit={handleLogin} method="POST">
            <img src="/avatar.svg" />
            <h2>Welcome</h2>
            <InputField
              label="Username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              onFocus={() => handleInputFocus("username")}
              onBlur={() => handleInputBlur("username", loginData.username)}
              required
              icon={<BiSolidUser />}
              isFocused={isFocused.username}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              onFocus={() => handleInputFocus("password")}
              onBlur={() => handleInputBlur("password", loginData.password)}
              required
              icon={<MdLock />}
              isFocused={isFocused.password}
            />
            <StyledLink>
              Do not have an account? <Link to="/">Sign up</Link>
            </StyledLink>
            <Button>Login</Button>
          </form>
        </FormCon>
      </Container>
    </>
  );
}
