import API from "@/lib/axiosInstance";
import { Category } from "@/type/type";

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await API.get("/categories"); // here we are getting data from the API
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Add a new category
export const addCategory = async (
  category: Omit<Category, "_id">,
): Promise<Category> => {
  try {
    const { data } = await API.post("/categories", category);
    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }
};
