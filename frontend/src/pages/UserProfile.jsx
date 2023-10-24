import { useState } from "react";
import { useSelector } from "react-redux";

import "../style/UserProfile.css";
import { Button } from "../component/styles/Button.styled";
import PasswordChangeForm from "../component/PasswordChange";
import ProfileEditForm from "../component/ProfileEditForm";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  const [profileData, setProfileData] = useState({ ...user });

  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // Toggle edit mode and password change mode
  const toggle = (mode) => {
    mode === "edit"
      ? setIsEditing((prev) => !prev)
      : setChangePassword((prev) => !prev);
  };

  const userProfileData = () => {
    if (isEditing) {
      return (
        <ProfileEditForm
          profileData={profileData}
          setIsEditing={setIsEditing}
          setProfileData={setProfileData}
        />
      );
    } else if (changePassword) {
      return <PasswordChangeForm setChangePassword={setChangePassword} />;
    } else {
      return (
        // Display user information when not in edit mode
        <div>
          <h3>Profile Info</h3>
          <hr />
          <div className="info">
            <h4>First Name</h4>
            <p>{profileData.first_name}</p>
          </div>
          <div className="info">
            <h4>Last Name</h4>
            <p>{profileData.last_name}</p>
          </div>
          <div className="info">
            <h4>Email</h4>
            <p>{profileData.email}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div className="profile-container">
        <div className="profile-bio">
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            alt=""
          />
          <p>{user.username}</p>
        </div>
        <div className="profile-info">
          {userProfileData()}
          {!changePassword && !isEditing && (
            <div className="button-group">
              <Button $primary="true" onClick={() => toggle("edit")}>
                Edit Profile
              </Button>
              <Button onClick={() => toggle("changePwd")}>
                Change Password
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
