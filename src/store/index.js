import { createStore } from "vuex";
import products from "./products";
import auth from "./auth";
// import products from "@/products";

export const store = createStore({
  modules: {
    products,
    auth,
  },
});
