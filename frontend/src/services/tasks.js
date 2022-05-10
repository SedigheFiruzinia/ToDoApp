import axios from "axios";


const baseUrl = "/api/tasks";

const getAll = async () => {
  try{const response = await axios.get(baseUrl);
    return response.data;}
  catch(error) {
    console.log(error);
  }
};

const updateState = async (id) => {
  try{const response = await axios.put(`${baseUrl}/${id}`);
    return response.data;}
  catch(error){
    console.log(error)
  }
};

const exportedObject = {
  getAll,
  updateState,
};

export default exportedObject;
