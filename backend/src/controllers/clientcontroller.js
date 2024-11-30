import * as clientService from "../services/clientservices.js";

//get method
export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("error fetching clients", error);
    res.status(500).json("internal server error");
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await clientService.getProducts(); 
    res.status(200).json(products); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json("Internal Server Error");
  }
};

//post method
export const createClients = async (req, res) => {
  try {
    const { categoryname } = req.body;

    if (!categoryname) {
      return res.status(400).json({ error: "categoryname is required" });
    }

    const newClient = await clientService.createClients(req.body);
    res.status(200).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const createProducts = async (req, res) => {
  try {
    const product = await clientService.createProducts(req.body); 
    res.status(201).json(product); 
  } catch (error) {
    console.error("Error creating product:", error.message);

    if (error.message.includes("Category with ID")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

//put method
export const updateClients = async (req, res) => {
  try {
    const clientId = req.params.categoryid;
    const clientData = req.body;

    if (!clientId || !clientData.categoryname) {
      return res
        .status(400)
        .json({ error: "categoryid and categoryname are required" });
    }

    const updateClient = await clientService.updateClients(
      clientId,
      clientData
    );

    if (!updateClient) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updateClient);
  } catch (error) {
    console.error("Error Updating client:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (!productId || !productData.productname) {
      return res
        .status(400)
        .json({ error: "productid and productname are required" });
    }

    const updateProduct = await clientService.updateProducts(
      productId,
      productData
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error Updating Product:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

//delete method
export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await clientService.deleteClient(clientId);
    if (!deleted) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).send();
  } catch (error) {
    console.error("error Deleting Category", error);
    res.status(500).json("internal server error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await clientService.deleteProduct(productId);
    if (!deleted) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).send();
  } catch (error) {
    console.error("error Deleting product", error);
    res.status(500).json("internal server error");
  }
};
