import axios from "axios";

const deleteObject = id => {
  let url = `http://localhost:3001/custom-objects/${id}`;
  return axios.delete(url).then(res => {
    console.log(id);
    const { data, status } = res;
    return { data, status };
  });
};

export default deleteObject;
