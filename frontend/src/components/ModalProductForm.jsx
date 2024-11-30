import React, { useState, useEffect } from "react";

const ModalProductForm = ({
  productOpen,
  onClose,
  mode,
  onSubmit,
  productData,
}) => {
  const [pName, setpName] = useState("");
  const [pId, setpId] = useState("");
  const [cName, setcName] = useState("");
  const [cId, setcId] = useState("");

  useEffect(() => {
    if (mode === "editProduct" && productData) {
      setpName(productData.productname || "");
      setpId(productData.productid || "");
      setcName(productData.categoryname || "");
      setcId(productData.categoryid || "");
    } else {
      setpName("");
      setpId("");
      setcName("");
      setcId("");
    }
  }, [mode, productData]);

  const handleSubmitP = async (e) => {
    e.preventDefault();
    const productdata = {
      productname: pName,
      productid: pId,
      categoryname: cName,
      categoryid: cId,
    };
    await onSubmit(productdata);
    onClose();
  };

  if (!productOpen) return null;

  return (
    <dialog className="modal" open={productOpen}>
      <div className="modal-box">
        <h3 className="font-semibold text-xl py-4">
          {mode === "editProduct" ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={handleSubmitP}>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Product Name
            <input
              type="text"
              className="grow"
              placeholder="Enter Product Name"
              value={pName}
              onChange={(e) => setpName(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Product ID
            <input
              type="number"
              className="grow"
              placeholder="Enter Product ID"
              value={pId}
              onChange={(e) => setpId(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-3">
            Category Name
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
            Category ID
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
            {mode === "editProduct" ? "Save Changes" : "Create"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalProductForm;
