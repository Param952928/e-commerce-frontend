import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null,
    products: null,
    categories: null,
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setProductData(state, productData) {
      state.products = productData;
    },
    setCategoryData(state, categoryData) {
      state.categories = categoryData;
    },
  },
  actions: {},
  getters: {
    getUserData(state) {
      return state.userData;
    },
    getProductData(state) {
      return state.products;
    },
    getProductData(state) {
      return state.categories;
    },
  },
});
