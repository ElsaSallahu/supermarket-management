import axios from "axios";

const API = "http://localhost:5000";

export const getProducts = () => axios.get(`${API}/produktet`);
export const addProduct = (product) => axios.post(`${API}/produktet`, product);
export const updateProduct = (id, product) => axios.put(`${API}/produktet/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API}/produktet/${id}`);
