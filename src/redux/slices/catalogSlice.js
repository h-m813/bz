import { createSlice } from "@reduxjs/toolkit";

const categories = ["Groceries", "Oils", "Flour"];

const initialState = {
  products: [
    {
      id: 1,
      name: "Basmati Rice (1kg)",
      category: "Groceries",
      price: 120,
      gst: "5%",
      stock: 50,
      visible: true,
    },
    {
      id: 2,
      name: "Sunflower Oil (1L)",
      category: "Oils",
      price: 150,
      gst: "5%",
      stock: 30,
      visible: true,
    },
    {
      id: 3,
      name: "Aashirvaad Atta (5kg)",
      category: "Flour",
      price: 250,
      gst: "5%",
      stock: 0,
      visible: false,
    },
    {
      id: 4,
      name: "Tata Salt (1kg)",
      category: "Groceries",
      price: 25,
      gst: "0%",
      stock: 100,
      visible: true,
    },
  ],
  categories,
  form: {
    name: "",
    category: categories[0],
    price: "",
    gst: "0%",
    stock: "",
    visible: true,
  },
  isModalOpen: false,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    toggleVisible(state, action) {
      const id = action.payload;
      const prod = state.products.find((p) => p.id === id);
      if (prod) prod.visible = !prod.visible;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      // Reset form on close
      state.form = {
        name: "",
        category: state.categories[0],
        price: "",
        gst: "0%",
        stock: "",
        visible: true,
      };
    },
    updateForm(state, action) {
      const { name, value, type, checked } = action.payload;
      state.form[name] = type === "checkbox" ? checked : value;
    },
    addProduct(state) {
      // Validation could be done in component, but minimal here
      if (
        !state.form.name ||
        !state.form.price ||
        state.form.stock === "" ||
        state.form.stock === null
      ) {
        return;
      }
      state.products.push({
        id: state.products.length + 1,
        name: state.form.name,
        category: state.form.category,
        price: parseFloat(state.form.price),
        gst: state.form.gst,
        stock: parseInt(state.form.stock, 10),
        visible: state.form.visible,
      });
      // Reset form and close modal
      state.form = {
        name: "",
        category: state.categories[0],
        price: "",
        gst: "0%",
        stock: "",
        visible: true,
      };
      state.isModalOpen = false;
    },
  },
});

export const { toggleVisible, openModal, closeModal, updateForm, addProduct } =
  catalogSlice.actions;

export default catalogSlice.reducer;
