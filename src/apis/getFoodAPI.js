import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getSearchFood(searchCategory, searchKeyword) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/food/search?category=${searchCategory}&keyword=${searchKeyword}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
