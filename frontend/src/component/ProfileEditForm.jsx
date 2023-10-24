import React, { useState } from "react";
import { Button } from "../component/styles/Button.styled";
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import InputField from "./InputField";
import { isEmailValid } from "../utils/utils";
import { updateProfile } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProfileEditForm = ({ profileData, setProfileData, setIsEditing }) => {
  const dispatch = useDispatch();
  const { token, error, user } = useSelector((state) => state.auth);

  const [isFocused, setIsFocused] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    let isValid = true;
    if (!isEmailValid(profileData.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    return isValid;
  };

  // Function to handle profile updates
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const emailValid = validateEmail();
    if (emailValid) {
      console.log(profileData);
      // Dispatch an action to update the user's profile in Redux state
      const { email, first_name, last_name } = profileData;
      dispatch(updateProfile({ token, email, first_name, last_name }));
      toast.success("Profile updated successfully");
      // Close the edit profile form or perform any other necessary actions
      setIsEditing(false);
    } else {
      toast.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({ ...user });
  };

  const handleInputFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field) => {
    if (profileData[field] === "") {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const inputFields = [
    {
      label: profileData.first_name ? "" : "FirstName",
      name: "first_name",
      type: "text",
      icon: <BiSolidUser />,
    },
    {
      label: profileData.last_name ? "" : "LastName",
      name: "last_name",
      type: "text",
      icon: <BiSolidUser />,
    },
    {
      label: profileData.email ? "" : "Email",
      name: "email",
      type: "email",
      icon: <MdEmail />,
    },
  ];

  return (
    <div>
      <h3>Edit Profile</h3>
      <hr />
      {inputFields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={profileData[field.name]}
          onFocus={() => handleInputFocus(field.name)}
          onBlur={() => handleInputBlur(field.name)}
          onChange={handleChange}
          required
          icon={field.icon}
          isFocused={isFocused[field.name]}
          error={field.name === "email" ? emailError : ""}
        />
      ))}
      <div className="button-group">
        <Button $primary="true" onClick={handleProfileUpdate}>
          Save Changes
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
