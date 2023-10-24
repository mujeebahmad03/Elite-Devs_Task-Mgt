import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Header from "./component/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyles from "./component/styles/GlobalStyle";
import { Toaster } from "react-hot-toast";
import { logoutUser } from "./slice/authSlice";
import { appRoutes } from "./routes/appRoutes";
import { useEffect } from "react";

const theme = {
  primary: "#38d39f",
  black1: "#646681",
  black2: "#585858",
  bg1: "#f8f8ff",
  bg2: "#ecedf6",
  bg3: "#cccdde",
  gray1: "#eee",
  gray2: "#dedfe1",
  black: "black",
  white: "white",
};

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { token, user } = useSelector((state) => state.auth);
  const userId = Number(user?.user?.id) || Number(user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser({ token, userId }));
    navigate("/login");
  };

  const routes = appRoutes(isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Routes>
        {Object.entries(routes).map(([path, element]) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
