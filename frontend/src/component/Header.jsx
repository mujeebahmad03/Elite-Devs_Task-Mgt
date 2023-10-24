import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./styles/Button.styled";
import { StyledHeader } from "./styles/Title.styled";
import { ButtonGroup } from "./styles/Containers.styled";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const profilePageRoute = "/profile";
  return (
    <StyledHeader>
      <div className="logo">
        <img style={{ borderRadius: "50%" }} src="/myLogo.jpg" alt="" />
      </div>
      <ButtonGroup>
        {location.pathname !== profilePageRoute && (
          <Button $primary="true" onClick={() => navigate(profilePageRoute)}>
            Profile
          </Button>
        )}
        <Button $primary="true" type="button" onClick={() => onLogout()}>
          Logout
        </Button>
      </ButtonGroup>
    </StyledHeader>
  );
}

export default Header;
