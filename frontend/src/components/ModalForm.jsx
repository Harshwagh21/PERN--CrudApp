import React, { useState, useEffect } from "react";

const ModalForm = ({ catOpen, onClose, mode, onSubmit, clientData }) => {
  const [cName, setcName] = useState("");
  const [cId, setcId] = useState("");

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setcName(clientData.categoryname || "");
      setcId(clientData.categoryid || "");
    } else {
      setcName("");
      setcId("");
    }
  }, [mode, clientData]);

  const handleSubmitC = async (e) => {
    e.preventDefault();
    const clientdata = {
      categoryname: cName,
      categoryid: cId,
    };
    await onSubmit(clientdata);
    onClose();
  };

  if (!catOpen) return null;

  return (
    <dialog className="modal" open={catOpen}>
      <div className="modal-box">
        <h3 className="font-semibold text-xl py-4">
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h3>
        <form onSubmit={handleSubmitC}>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Name
            <input
              type="text"
              className="grow"
              placeholder="Enter Category Name"
              value={cName}
              onChange={(e) => setcName(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-3">
            ID
            <input
              type="number"
              className="grow"
              placeholder="Enter Category ID"
              value={cId}
              onChange={(e) => setcId(e.target.value)}
              required
            />
          </label>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          <button type="submit" className="btn btn-success mt-2">
            {mode === "edit" ? "Save Changes" : "Create"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;
