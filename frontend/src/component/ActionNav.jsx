import { useDispatch, useSelector } from "react-redux"
import {Button, SelectButton} from "../component/styles/Button.styled"
import { TaskHeader } from "./styles/Containers.styled"
import TaskModal from "./TaskModal"
import { useState } from "react"
import { updateFilterStatus } from "../slice/taskSlice"

function ActionNav() {
  const [modalOpen, setModalOpen] = useState(false)
  const filterStatus = useSelector(state => state.filterStatus)

  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value))
  }

  return (
      <TaskHeader>
        <Button $primary="true" type="button"
          onClick={()=>setModalOpen(true)}
          >Add Task</Button>
        <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </SelectButton>
        <TaskModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </TaskHeader>

  )
}

export default ActionNav