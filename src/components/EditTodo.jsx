import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
const EditTodo = ({ close, job, updateJob }) => { 
  const [edit, setEdit] = useState(job);

  const handleUpdate = () => {
    updateJob(edit); // Gọi hàm cập nhật công việc với giá trị mới
  };
  return (
    <div className="editform">
      <div className="edit-task">
        <h2>Edit Task</h2>
        <input
          value={edit.job}
          onChange={(e) => {
            setEdit(e.target.value);
          }}
          type="text"
          placeholder="Nhập công việc mới"
          className="edit-input"
        />
        <button className="edit-btn" onClick={handleUpdate}>Sửa</button>
        <div className="closePopup">
          <div className="close-btn" onClick={close}>
            <IoCloseSharp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
