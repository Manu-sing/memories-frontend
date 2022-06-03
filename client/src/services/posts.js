import axios from "axios";
const baseUrl = "/api/posts";

let token;

const setToken = () => {
  if (localStorage.getItem("profile")) {
    token = `bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  } else {
    token = null;
  }
  return token;
};

// const setToken = (newToken) => {
//   if (localStorage.getItem("profile")) {
//     token = `bearer ${newToken}`;
//   } else {
//     console.log("token is not saved in the local storage");
//   }
// };

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: setToken() },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: setToken() },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const removeThePost = async (id) => {
  const config = {
    headers: { Authorization: setToken() },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, removeThePost, update, setToken };
