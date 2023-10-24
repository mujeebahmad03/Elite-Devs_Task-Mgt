import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { TaskWrapper } from "./styles/Containers.styled";
import { LoneText } from "./styles/Title.styled";


function TaskContent() {
  const taskList = useSelector(state => state.tasks.tasks); 
  const filterStatus = useSelector(state => state.tasks.filterStatus); 

  const filteredTaskList = taskList.filter(item => {
    if(filterStatus === 'all') return true;
    if (filterStatus === 'complete' && item.completed) return true;
    if (filterStatus === 'incomplete' && !item.completed) return true;
    return false;
  });


  return (
    <TaskWrapper>
      {filteredTaskList.length === 0 ? (
        <LoneText>No tasks found</LoneText>
      ) : (
        <div>
          {filteredTaskList.map(task => (
            <TaskItem key={task.id} task={task}/>
          ))}
        </div>
      )}
    </TaskWrapper>
  );
}

export default TaskContent;
