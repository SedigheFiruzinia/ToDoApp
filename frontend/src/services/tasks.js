import axios from "axios";

const baseUrl = "/api/tasks";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const changeState = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const exportedObject = {
  getAll,
  changeState,
};

export default exportedObject;
