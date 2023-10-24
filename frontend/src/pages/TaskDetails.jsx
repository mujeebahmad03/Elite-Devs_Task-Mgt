import { StyledForm, FormTitle, FormContainer, ButtonContainer } from '../component/styles/StyledForm.styled';
import { Button } from '../component/styles/Button.styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { LoneText } from '../component/styles/Title.styled';
import { updateTask } from '../slice/taskSlice';

function TaskDetails() {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const taskList = useSelector(state => state.tasks.tasks);
  const task = taskList.find(task => task.id === +taskId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed); 
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [task]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      toast.error('Title should not be empty');
      return;
    }

    if (task && (task.title !== title || task.completed !== completed)) {
      const updatedTask = { ...task, title, completed };
      dispatch(updateTask({ task_id: task.id, updatedTask, token }));
      toast.success('Task Updated successfully');
      setUpdated(true);
    } else {
      toast.error('No changes made');
    }
  };

  const handleCancel = () => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
    }
  };
  const handleBack =() => {
    navigate('/dashboard')    
  }
  return (
    <>
      {task ? (
        <FormContainer>
          <StyledForm onSubmit={handleSubmit}>
            <FormTitle>Update Task</FormTitle>
            <label htmlFor="title">Title
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label htmlFor="completed">Status
              <select
                name="completed"
                id="completed"
                value={completed ? 'complete' : 'incomplete'}
                onChange={e => setCompleted(e.target.value === 'complete')}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <ButtonContainer>
            {updated ? <Button $primary="true" type='button' onClick={handleBack}>Back</Button> 
            : <Button $primary="true">Update Task</Button>}
              <Button $secondary="true" type="button" onClick={handleCancel} onKeyDown={handleCancel}>
                Cancel
              </Button>
            </ButtonContainer>
          </StyledForm>
        </FormContainer>
      ) : (
        <LoneText>No task found</LoneText>
      )}
    </>
  );
}

export default TaskDetails;
