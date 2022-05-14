import axios from "axios";

const baseUrl = "http://localhost:5000/api/posts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

export default { getAll, create };
