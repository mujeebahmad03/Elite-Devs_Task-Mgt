import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MdOutlineClose } from "react-icons/md";
import { StyledForm, FormTitle, FormContainer, FormWrapper, ButtonContainer, CloseButton } from '../component/styles/StyledForm.styled';
import { Button } from './styles/Button.styled';
import { createNewTask, updateTask } from '../slice/taskSlice';

function TaskModal({ modalOpen, setModalOpen, type, task }) {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    if (type === 'update' && task) {
      setTitle(task.title);
      setCompleted(task.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [type, task, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      toast.error('Title should not be empty');
      return;
    }

    if (type === 'update') {
      if (task.title !== title || task.completed !== completed) {
        const updatedTask = { ...task, title, completed };
        dispatch(updateTask({ task_id: task.id, updatedTask, token }));
        toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    } else {
      const newTask = { title, completed };
      dispatch(createNewTask({ task: newTask, token, userId }));
      toast.success('Task added successfully');
    }

    setModalOpen(false);
  };

  return (
    modalOpen && (
      <FormWrapper>
        <FormContainer>
          <CloseButton
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
          >
            <MdOutlineClose />
          </CloseButton>
          <StyledForm onSubmit={handleSubmit}>
            <FormTitle>{type === 'update' ? 'Update' : 'Add'} Task</FormTitle>
            <label htmlFor="title">Title
              <input
                type="text"
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
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
              <Button $primary='true'>{type === 'update' ? 'Update' : 'Add'} Task</Button>
              <Button
                $secondary='true'
                type='button'
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </ButtonContainer>
          </StyledForm>
        </FormContainer>
      </FormWrapper>
    )
  );
}

export default TaskModal;
