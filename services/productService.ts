import API from "@/lib/axiosInstance";
import { Product } from "@/type/type";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await API.get("/products");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

// Fetch a single product by ID
export const fetchProductById = async (_id: string): Promise<Product> => {
  try {
    const { data } = await API.get(`/products/${_id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${_id}:`, error);
    throw new Error("Failed to fetch product");
  }
};

// Add a new product
export const addProduct = async (
  product: Omit<Product, "_id">,
): Promise<Product> => {
  try {
    const { data } = await API.post("/products", product);
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Update an existing product by ID
export const updateProduct = async (
  _id: string,
  product: Partial<Product>,
): Promise<Product> => {
  try {
    const { data } = await API.put(`/products/${_id}`, product);
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${_id}:`, error);
    throw new Error("Failed to update product");
  }
};

// Remove a product by ID
export const removeProduct = async (_id: string): Promise<void> => {
  try {
    await API.delete(`/products/${_id}`);
  } catch (error) {
    console.error(`Error removing product with ID ${_id}:`, error);
    throw new Error("Failed to remove product");
  }
};
