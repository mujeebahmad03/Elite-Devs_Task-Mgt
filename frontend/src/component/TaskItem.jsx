/* eslint-disable react/prop-types */
import { useDispatch, useSelector} from "react-redux"
import { Item, Details, TaskTexts, TaskText, TaskActions, Icon } from "./styles/TaskItems.styled"
import { MdDelete, MdEdit } from 'react-icons/md'
import toast from "react-hot-toast"
import TaskModal from "./TaskModal"
import { useEffect, useState } from "react"
import CheckBox from "./CheckBox"
import { useNavigate } from 'react-router-dom';
import { deleteTask, updateTask } from "../slice/taskSlice"

function TaskItem({ task }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(task.completed); 
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setChecked(task.completed);
  }, [task.completed]);

  const handleDelete = () => {
    dispatch(deleteTask({ task_id: task.id, token }));
    toast.success('Task deleted successfully');
  }

  const handleEdit = () => {
    setUpdateModalOpen(true);
  }

  const handleCheck = () => {
    // Calculate the new checked state based on the task's completed status
    const newChecked = !checked;
    setChecked(newChecked);
  
    // Dispatch 'updateTask' with the updated 'status'
    const updatedTask = { ...task, completed: newChecked };
    dispatch(updateTask({ task_id: task.id, updatedTask, token }));
  }

  const handleClick = () => {
    if (task) {
      const taskDetailsURL = `/task/${task.id}`;
      navigate(taskDetailsURL);
    }
  }
  
  return (
    <>
      <Item>
        <Details>
          <CheckBox checked={checked} handleCheck={handleCheck} />
          <TaskTexts onClick={handleClick}>
            <TaskText className={task.completed ? 'completed' : ''}>
              {task.title}
            </TaskText>
          </TaskTexts>
        </Details>
        <TaskActions>
          <Icon
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button" tabIndex={0}>
            <MdDelete />
          </Icon>
          <Icon
            onKeyDown={handleEdit}
            onClick={handleEdit} role="button" tabIndex={0}>
            <MdEdit />
          </Icon>
        </TaskActions>
      </Item>
      <TaskModal
        task={task}
        type='update'
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  )
}

export default TaskItem;
