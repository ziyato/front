import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getSearchFood(user_id, searchCategory, searchKeyword) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}?category=${searchCategory}&keyword=${searchKeyword}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFoodDataAll(user_id) {
  try {
    const response = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/icebox/${user_id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
