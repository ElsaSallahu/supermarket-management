import api from "./axiosConfig";

export const getProducts = () =>
  api.get("/products");

export const addProduct = (
  product
) =>
  api.post(
    "/products",
    product
  );

export const updateProduct = (
  id,
  product
) =>
  api.put(
    `/products/${id}`,
    product
  );

export const deleteProduct = (
  id
) =>
  api.delete(
    `/products/${id}`
  );