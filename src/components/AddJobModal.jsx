import React from "react";

const AddJobModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Job</h2>
        <form>
          <input type="text" placeholder="Company Name" />
          <input type="text" placeholder="Job Title" />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
