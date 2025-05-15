import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import NavbarComp from "./components/NavbarComp";
import ProductList from "./components/ProductList";
import ModalForm from "./components/ModalForm";
import ModalProductForm from "./components/ModalProductForm";
import axios from "axios";

function App() {
  const [catOpen, setcatOpen] = useState(false);
  const [catAdd, setcatAdd] = useState("add");
  const [productOpen, setproductOpen] = useState(false);
  const [productAdd, setproductAdd] = useState("addProduct");
  const [clientData, setclientData] = useState(null);
  const [productData, setproductData] = useState(null);

  const handleCatOpen = (mode, data = null) => {
    setcatAdd(mode);
    setclientData(data);
    setcatOpen(true);
  };

  const handleProductOpen = (mode, product = null) => {
    setproductAdd(mode);
    setproductData(product); // Set the product data
    setproductOpen(true);
  };

  const handleCatSubmit = async (newClientData) => {
    try {
      if (catAdd === "add") {
        const response = await axios.post(
          "/api/category",
          newClientData
        );
        console.log("Category added:", response.data);

        // After adding, refetch the category data
        const updatedResponse = await axios.get(
          "/api/category"
        );
        setcategoryData(updatedResponse.data); // Update state with the new data
      } else {
        const response = await axios.put(
          `/api/category/${newClientData.categoryid}`,
          newClientData
        );
        console.log("Category edited:", response.data);
      }
      setcatOpen(false);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleProductSubmit = async (newProductData) => {
    try {
      if (productAdd === "addProduct") {
        const response = await axios.post(
          "http://localhost:3000/api/product",
          newProductData
        );
        console.log("Product added:", response.data);

        // After adding, refetch the product data
        const updatedResponse = await axios.get(
          "http://localhost:3000/api/product"
        );
        setproductData(updatedResponse.data); // Update state with the new data
      } else {
        const response = await axios.put(
          `/api/product/${newProductData.productid}`,
          newProductData
        );
        console.log("Product edited:", response.data);
      }
      setproductOpen(false);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Router>
      <NavbarComp />
      <ModalForm
        catOpen={catOpen}
        onClose={() => setcatOpen(false)}
        mode={catAdd}
        onSubmit={handleCatSubmit}
        clientData={clientData}
      />
      <ModalProductForm
        productOpen={productOpen}
        onClose={() => setproductOpen(false)}
        mode={productAdd}
        onSubmit={handleProductSubmit}
        productData={productData}
      />
      <Routes>
        <Route
          path="/"
          element={
            <CategoryList
              catOpenAdd={() => handleCatOpen("add")}
              catOpenEdit={(data) => handleCatOpen("edit", data)}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductList
              productOpenAdd={() => handleProductOpen("addProduct")}
              productOpenEdit={(data) => handleProductOpen("editProduct", data)} // Pass product data
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
