import React, { useState , useEffect } from "react";
import EditTodo from "./EditTodo";
import { FaCalendarCheck } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditCalendar } from "react-icons/md";

const TodoForm = () => {
  const [job, setJob] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [jobs, setJobs] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    if (!jobs) return [];
    else return jobs;
  });

  const handleSubmit = () => {
    setJobs((prev) => {
      const tasks = [...prev,  { task: job, completed: false }];
      const save = localStorage.setItem("jobs", JSON.stringify(tasks));
      return tasks;
    });

    setJob("");
  };

  const handleCloseExit = () => {
    return setEdit(false);
  };
  const handleChangeTask = (index) => {
     setEdit(true);
     setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].completed = true; // Đánh dấu công việc đã hoàn thành
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleDelete = (index) => {
    let newJobs = [...jobs];
    newJobs.splice(index, 1);

    localStorage.setItem("jobs", JSON.stringify(newJobs));
    setJobs(newJobs);
  };

  const handleUpdate = (updatedJob) => {

    let updatedJobs = [...jobs];
    updatedJobs[editIndex].task = updatedJob;

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);

    handleCloseExit();
  };

 

  return (
    <div className="TodoForm">
      {edit && <EditTodo 
      close={handleCloseExit}
      job={jobs[editIndex]} // Truyền công việc đang được chỉnh sửa vào form chỉnh sửa
      updateJob={handleUpdate} // Truyền hàm cập nhật công việc vào form chỉnh sửa
      />}
      <input
        value={job}
        onChange={(e) => {
          setJob(e.target.value);
        }}
        type="text"
        className="todo-input"
        placeholder="Nhập việc cần làm của bạn"
      />
      <button onClick={handleSubmit} className="todo-btn">
        Thêm
      </button>

      <ul className="todo-list">
        {jobs.map((job, index) => (
          <li key={index} className={job.completed ? "completed" : ""}>
            {job.task}
            <div className="btns">
            {!job.completed && (
                <div
                  className="complete-btn"
                  onClick={() => handleComplete(index)}
                >
                  <FaCalendarCheck />
                </div>
              )}
              <div className="delete-btn" onClick={() => handleDelete(index)}>
                <RiDeleteBin5Fill />
              </div>
              <div
                className="update-btn"
                onClick={() => handleChangeTask(index)}
              >
                <MdOutlineEditCalendar />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoForm;
