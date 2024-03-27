import axios from "axios";
export const fetchingAllProducts = async (url) => {
  return await axios.get(url);
};
export const filteredProducts = async (url, data) => {
  return await axios.get(`${url}/${data}`);
};

export const sortByPrice = async (url, data) => {
  return await axios.get(`${url}${data}`);
};

export const getSingleProduct = async (url, id) => {
  return await axios.get(`${url}/${id}`);
};
