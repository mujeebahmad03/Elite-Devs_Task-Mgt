import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';
import TaskDetails from '../pages/TaskDetails';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';


export const appRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return {
      '/login': <Navigate to="/dashboard" />,
      '/': <Navigate to="/dashboard" />,
      '/dashboard': <Dashboard />,
      '/profile': <UserProfile />,
      '/task/:taskId': <TaskDetails />,
    };
  } else {
    return {
      '/dashboard': <Navigate to="/login" />,
      '/profile': <Navigate to="/login" />,
      '/task/:taskId': <Navigate to="/login" />,
      '/': <SignUp />,
      '/login': <Login />,
    };
  }
};
