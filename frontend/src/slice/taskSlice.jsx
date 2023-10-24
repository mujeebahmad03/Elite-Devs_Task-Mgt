import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosConfig';

// Fetch tasks with authentication
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (token, thunkAPI) => {
  try {
    const response = await axiosInstance.get('list/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


// Create a task
export const createNewTask = createAsyncThunk('tasks/createNewTask', 
  async ({ task, token, userId }, thunkAPI) => {
    try {
      const taskWithUser = { ...task, user: userId };
      const response = await axiosInstance.post(`create/`, taskWithUser, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});


// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', 
  async ({ task_id, updatedTask, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`update/${task_id}/`, updatedTask, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({task_id, token}, thunkAPI) => {
  try {
    await axiosInstance.delete(`delete/${task_id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return task_id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filterStatus: 'all',
    status: 'idle',
    error: null,
  },
  reducers: {
    // Action to update the filter status
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error =action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const existingTask = state.tasks.find((task) => task.id === updatedTask.id);
        if (existingTask) {
          existingTask.title = updatedTask.title;
          existingTask.completed = updatedTask.completed;
          existingTask.description = updatedTask.description;
        }
        state.status = 'succeeded';
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error =action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find((task) => task.id === taskId);
export const {updateFilterStatus} = taskSlice.actions;
export default taskSlice.reducer;
