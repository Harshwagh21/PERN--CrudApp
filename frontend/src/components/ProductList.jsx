import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = ({ productOpenAdd, productOpenEdit }) => {
  const [productData, setproductData] = useState([]);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product"); 
        setproductData(response.data); 
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchData();
  }, []);

  const handleProductDelete = async (id) => {
    if (!id) {
      console.error("Invalid product ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/product/${id}`
        );
        console.log("Server response:", response.data);

        setproductData((prevData) =>
          prevData.filter((product) => product.productid !== id)
        );
        console.log(`Product with ID ${id} deleted successfully.`);
      } catch (err) {
        console.error("Error deleting product:", err.message);
        seterror("Failed to delete the product. Please try again.");
      }
    }
  };


  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="flex justify-center m-4 ">
        <button class="btn btn-wide btn-success" onClick={productOpenAdd}>
          Add Product
        </button>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="overflow-x-auto w-full max-w-5xl p-4 shadow-md rounded-lg">
          <table className="table-auto border-collapse border border-gray-300 rounded-lg w-full">
            <thead className="bg-slate-700 text-white rounded-t-lg">
              <tr>
                <th className="px-4 py-2">Product Id</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Category Id</th>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product) => (
                <tr key={product.productid} className="hover:bg-indigo-900">
                  <td className="border px-4 py-2">{product.productid}</td>
                  <td className="border px-4 py-2">{product.productname}</td>
                  <td className="border px-4 py-2">{product.categoryid}</td>
                  <td className="border px-4 py-2">{product.categoryname}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-secondary rounded-full px-4 py-1"
                      onClick={() => productOpenEdit(product)}
                    >
                      Update
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-error rounded-full px-4 py-1"
                      onClick={() => handleProductDelete(product.productid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
