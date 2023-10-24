import { MdLock } from "react-icons/md";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changePassword } from "../slice/authSlice";
import { isPasswordValid } from "../utils/utils";
import toast from "react-hot-toast";
import { Button } from "./styles/Button.styled";

const inputFields = [
  {
    label: "Current Password",
    name: "currentPassword",
    type: "password",
    icon: <MdLock />,
  },
  {
    label: "New Password",
    name: "newPassword",
    type: "password",
    icon: <MdLock />,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    icon: <MdLock />,
  },
];

function PasswordChangeForm({ setChangePassword }) {
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.auth);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isFocused, setIsFocused] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordError, setPasswordError] = useState("");

  const passwordValid = () => {
    let isValid = true;
    const { newPassword, confirmPassword } = passwordData;

    if (!isPasswordValid(newPassword)) {
      setPasswordError(
        "Password should be at least 8 characters long and contain special characters."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== newPassword) {
      setPasswordError("Password does not match");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = passwordData;
    const pwdValid = passwordValid();
    if (pwdValid) {
      dispatch(changePassword({ currentPassword, newPassword, token }));
      toast.success("Password changed successfully");
    } else if (passwordError) {
      toast.error(passwordError);
    } else {
      toast.error(error || "No changes made");
    }
    handleCancel();
  };

  const clearFields = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field) => {
    if (passwordData[field] === "") {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    setChangePassword(false);
    clearFields();
  };

  return (
    <div>
      <h3>Change Password</h3>
      {inputFields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={passwordData[field.name]}
          onFocus={() => handleInputFocus(field.name)}
          onBlur={() => handleInputBlur(field.name)}
          isFocused={isFocused[field.name]}
          onChange={handleChange}
          required
          icon={field.icon}
          error={field.name !== "currentPassword" ? passwordError : ""}
        />
      ))}
      <div className="button-group">
        <Button $primary="true" onClick={handlePasswordChange}>
          Save Password
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default PasswordChangeForm;
