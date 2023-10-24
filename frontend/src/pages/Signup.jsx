import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { MdEmail, MdLock } from 'react-icons/md';
import { BiSolidUser } from 'react-icons/bi';
import { registerUser } from '../slice/authSlice';
import {
  Container,
  Wave,
  FormCon,
  Button,
  ImgContainer,
  StyledLink,
} from '../component/styles/signup-loginStyles';
import InputField from '../component/InputField';
import { isEmailValid, isPasswordValid } from '../utils/utils';

export default function SignUp() {
  
  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
    confirmPwd: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPwd: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPwd: '',
  });


  const validateForm = () => {
    let isValid = true;

    const { email, password, confirmPwd } = signUpData;

    if (!isEmailValid(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }

    if (!isPasswordValid(password)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 8 characters long and contain special characters.',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }

    if (confirmPwd !== password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPwd: 'Password does not match',
      }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPwd: '',
      }));
    }
    return isValid;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      dispatch(registerUser(signUpData))
        .then((response) => {
          if (response.payload) {
            toast.success("Signed Up Successfully!");
            navigate('/login');
          } else {
            toast.error('An error occurred during sign-up. Please try again.');
          }
        })
        .catch((error) => {
          toast.error('An error occurred during sign-up. Please try again.');
        });

      setSignUpData({
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field) => {
    if (signUpData[field] === "") {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const inputFields = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      icon: <BiSolidUser />,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      icon: <MdEmail />,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      icon: <MdLock />,
    },
    {
      label: 'Confirm Password',
      name: 'confirmPwd',
      type: 'password',
      icon: <MdLock />,
    },
  ];

  return (
    <>
      <Wave src="/wave.png" />
      <Container>
        <ImgContainer>
          <img src="/signup.svg" />
        </ImgContainer>
        <FormCon>
          <form onSubmit={handleSignUp} method="POST">
            <img src="/avatar.svg" />
            <h2>Sign Up</h2>
            {inputFields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={signUpData[field.name]}
                onFocus={() => handleInputFocus(field.name)}
                onBlur={() => handleInputBlur(field.name)}
                onChange={handleChange}
                required
                icon={field.icon}
                isFocused={isFocused[field.name]}
                error={formErrors[field.name]}
              />
            ))}
            <StyledLink>
              Already have an account? <Link to="/login">Login</Link>
            </StyledLink>
            <Button>Register</Button>
          </form>
        </FormCon>
      </Container>
    </>
  );
}