"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  addProduct,
  removeProduct,
  updateProduct,
  fetchProductById,
} from "@/services/productService";
import { toast } from "sonner"; // Import toast
import { Product } from "@/type/type";

// Main custom hook combining all functionalities
export const useProduct = () => {
  const queryClient = useQueryClient();

  // Fetch all products using useQuery
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Fetch a single product by ID using useQuery
  const getProductQuery = (_id: string | null) => {
    console.log({ _id }, "get product");
    return useQuery<Product>({
      queryKey: ["product", _id],
      queryFn: async () => {
        if (!_id) throw new Error("Product ID is required");
        return fetchProductById(_id);
      },
      enabled: !!_id,
    });
  };

  // Add product using useMutation
  const addProductMutation = useMutation({
    mutationFn: addProduct, // using the addProduct function from services folder
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // this line will refetch the updated data from server on successful post
      toast.success("Product successfully added!"); // Toast success message
    },
    onError: (error: Error) => {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again."); // Toast error message
    },
  });

  // Update product using useMutation
  const updateProductMutation = useMutation({
    // we are destructuring in the first part and we are assigning type in the second part. And then in update function we are passing id and product
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: Omit<Product, "_id">;
    }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // this line will refetch the updated products
      toast.success("Product successfully updated!"); // Toast success message
    },
    onError: () => {
      toast.error("Failed to update product."); // Toast error message
    },
  });

  // Remove product using useMutation
  const removeProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product successfully removed!"); // Toast success message
    },
    onError: () => {
      toast.error("Failed to remove product."); // Toast error message
    },
  });

  return {
    productsQuery,
    getProductQuery,
    addProductMutation,
    updateProductMutation,
    removeProductMutation,
  };
};
