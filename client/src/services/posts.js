import axios from "axios";
const baseUrl = "/api/posts";

let token = null;

const setToken = (newToken) => {
  if (localStorage.getItem("profile")) {
    token = `bearer ${newToken}`;
  } else {
    console.log("token is not saved in the local storage");
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObj) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, newObject) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const removeThePost = async (id) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, removeThePost, update, setToken };
