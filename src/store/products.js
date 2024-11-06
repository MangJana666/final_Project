import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
      cart: [],
      transactionHistory: [],
    };
  },
  mutations: {
    setProductData(state, payload) {
      state.product = payload;
    },
    setProductDetail(state, payload) {
      state.productDetail = payload;
    },
    setNewProduct(state, payload) {
      state.products.push(payload);
    },
    addToCart(state, product) {
      const itemInCart = state.cart.find((item) => item.id === product.id);
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.cart.push({ ...product, qty: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    updateQty(state, { productId, qty }) {
      const item = state.cart.find((item) => item.id === productId);
      if (item) item.qty = qty;
    },
    addTransaction(state, transaction) {
      state.transactionHistory.push(transaction);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async getProductData({ commit }) {
      try {
        const { data } = await axios.get(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/products.json`
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        commit("setProductData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewProduct({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`,
          newData
        );
        commit("setNewProduct", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct({ dispatch, rootState }, payload) {
      console.log(payload);
      try {
        const { data } = await axios.delete(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`
        );
        await dispatch("getProductData");
      } catch (err) {
        console.log(err);
      }
    },
    async getProductDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/products/${payload}.json`
        );
        commit("setProductDetail", data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct({ dispatch, rootState }, { id, updatedProduct }) {
      try {
        const { data } = await axios.put(
          `https://finalexamp-52cd8-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`,
          updatedProduct
        );
        await dispatch("getProductData");
      } catch (error) {
        console.log(error);
      }
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
    },
    updateQty({ commit }, payload) {
      commit("updateQty", payload);
    },
    checkout({ commit }, transactionData) {
      commit("addTransaction", transactionData);
    },
    checkout({ commit, state }) {
      const transaction = {
        items: [...state.cart],
        totalPrice: state.cart.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ),
        date: new Date().toLocaleString(),
      };
      commit("addTransaction", transaction);
      commit("clearCart");
    },
  },
  getters: {
    cartTotalPrice(state) {
      return state.cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
    },
    checkoutCart(state) {
      return state.cart;
    },
  },
  checkout({ commit, state }) {
    const transaction = {
      items: [...state.cart],
      totalPrice: state.cart.reduce(
        (total, item) => total + item.price + item.qty,
        0
      ),
      date: new Date().toLocaleString(),
    };
    commit("addTransaction", transaction);
    commit("clearCart");
  },
  cartItemCount(state) {
    return state.cart.reduce((total, item) => total + item.qty, 0);
  },
};
