import axios from "axios";

const baseUrl = "/api/tasks";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const updateState = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const exportedObject = {
  getAll,
  updateState,
};

export default exportedObject;
