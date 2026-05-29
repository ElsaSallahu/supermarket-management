import axios from "axios";

const API = "http://localhost:5000";

export const getProducts = () => axios.get(`${API}/products`);
export const addProduct = (product) => axios.post(`${API}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API}/products/${id}`);