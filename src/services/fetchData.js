import axios from "axios";

//this fetchDatas function for All Products
export const fetchDatas = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  } catch (error) {
    console.error(error);
  }
};

//this fetchData function for Single Product
export const fetchData = async (id) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
