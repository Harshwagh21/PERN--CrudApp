import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryList = ({ catOpenAdd, catOpenEdit }) => {
  const navigate = useNavigate();

  const [categoryData, setcategoryData] = useState([]);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        setcategoryData(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchData();
  }, []);

  const navToProduct = () => {
    navigate("/products");
  };

  const handleCategoryDelete = async (id) => {
    if (!id) {
      console.error("Invalid category ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/category/${id}`
        );
        console.log("Server response:", response.data);

        setcategoryData((prevData) =>
          prevData.filter((category) => category.categoryid !== id)
        );
        console.log(`Category with ID ${id} deleted successfully.`);
      } catch (err) {
        console.error("Error deleting category:", err.message);
        seterror("Failed to delete the category. Please try again.");
      }
    }
  };

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="flex justify-center m-4">
        <button
          className="btn btn-wide btn-success"
          onClick={catOpenAdd}
        >
          Create Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-6 justify-center">
        {categoryData.map((category) => (
          <div
            key={category.categoryid}
            className="card w-80 shadow-xl mx-auto"
          >
            <button
              className="card-body btn h-32 rounded-t-xl rounded-none bg-slate-700"
              onClick={navToProduct}
            >
              <h2 className="card-title self-center mb-5">
                {category.categoryname}
              </h2>
            </button>
            <div className="card-actions justify-center my-3 space-x-4">
              <button
                className="btn px-8 rounded-full hover:bg-green-600 opacity-70"
                onClick={() => catOpenEdit(category)}
              >
                Update
              </button>

              <button
                className="btn px-8 rounded-full hover:bg-red-600 opacity-70"
                onClick={() => handleCategoryDelete(category.categoryid)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
