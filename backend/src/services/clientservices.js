import { query } from "../db.js";

//get method
export const getClients = async () => {
  const result = await query("SELECT * FROM categories");
  return result.rows;
};

export const getProducts = async () => {
  const result = await query("SELECT * FROM products");
  return result.rows;
};

//post method
export const createClients = async (clientData) => {
  try {
    const { categoryname } = clientData;

    if (!categoryname) {
      throw new Error("categoryname is required");
    }

    const result = await query(
      `INSERT INTO categories (categoryname)
         VALUES ($1) RETURNING *`,
      [categoryname]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw error;
  }
};

export const createProducts = async (productData) => {
  const { productname, productid, categoryname, categoryid } = productData;

  const categoryCheckQuery = "SELECT * FROM categories WHERE categoryid = $1";

  try {
    const categoryResult = await query(categoryCheckQuery, [categoryid]);
    if (categoryResult.rows.length === 0) {
      const insertCategoryQuery = `
        INSERT INTO categories (categoryid, categoryname) 
        VALUES ($1, $2) RETURNING *;
      `;
      await query(insertCategoryQuery, [categoryid, categoryname]);
    }

    const insertProductQuery = `
      INSERT INTO products (productid, productname, categoryid, categoryname)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const insertProductResult = await query(insertProductQuery, [
      productid,
      productname,
      categoryid,
      categoryname,
    ]);

    return insertProductResult.rows[0];
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
};

//put method
export const updateClients = async (clientId, clientData) => {
  try {
    const { categoryname } = clientData;

    const result = await query(
      `UPDATE categories 
         SET categoryname = $1
         WHERE categoryid = $2 RETURNING *`,
      [categoryname, clientId]
    );

    if (result.rows.length === 0) {
      console.error("No category found with the given ID.");
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw error;
  }
};

export const updateProducts = async (productId, productData) => {
  try {
    const { productname, categoryid, categoryname } = productData;

    const result = await query(
      `UPDATE products 
             SET productname = $1, categoryid = $2, categoryname = $3
             WHERE productid = $4 RETURNING *`,
      [productname, categoryid, categoryname, productId]
    );

    if (result.rows.length === 0) {
      console.error("No product found with the given ID.");
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Database Error: ", error);
    throw error;
  }
};

//delete method
export const deleteClient = async (clientId) => {
  const { rowCount } = await query(
    `DELETE FROM categories WHERE categoryid = $1`,
    [clientId]
  );
  return rowCount > 0;
};

export const deleteProduct = async (productId) => {
  const { rowCount } = await query(
    `DELETE FROM products WHERE productid = $1`,
    [productId]
  );
  return rowCount > 0;
};
