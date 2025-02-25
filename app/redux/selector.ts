import { BagProduct } from "@/type/type";

// Define your Redux state interface
interface RootState {
  bag: {
    bagProducts: BagProduct[];
  };
  productsStore: {
    products: BagProduct[];
  };
}

// Now use the RootState type in your selectors
// selector for bag products
export const selectBagProducts = (state: RootState) => state.bag.bagProducts;

// selector for ptoducts
export const selectProducts = (state: RootState) =>
  state.productsStore.products;
