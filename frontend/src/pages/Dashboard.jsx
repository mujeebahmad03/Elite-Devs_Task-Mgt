import { Title, Welcome } from "../component/styles/Title.styled";
import ActionNav from "../component/ActionNav";
import TaskContent from "../component/TaskContent";
import {
  Container,
  ActionWrapper,
} from "../component/styles/Containers.styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slice/taskSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    // Only fetch tasks if the token is available
    if (token) {
      dispatch(fetchTasks(token)); // Pass the headers in the fetchTasks action
    }
  }, [dispatch, token]);

  return (
    <Container>
      <Welcome>
        {user.first_name ? (
          <h1>Welcome, {user.first_name}</h1>
        ) : (
          <h1>Welcome</h1>
        )}
      </Welcome>

      <Title>Task Manager</Title>
      <ActionWrapper>
        <ActionNav />
        <TaskContent />
      </ActionWrapper>
    </Container>
  );
}

export default Dashboard;
