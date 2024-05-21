import axios from "axios";

export async function getLogin(username, password) {
  try {
    const response = await axios.post(`http://localhost:8080/api/user/login`, {
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
    const response = await axios.post(`http://localhost:8080/api/user/signup`, {
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
