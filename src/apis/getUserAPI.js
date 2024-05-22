import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getLogin(username, password) {
  try {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/login`, {
      email: username,
      password: password,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRegister(data) {
  console.log(data);
  try {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/signup`, {
      email: data.email,
      password: data.password,
      username: data.Username,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
