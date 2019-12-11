import axios from "axios";

const updateObject = (id, payload) => {
  let url = `http://localhost:3001/custom-objects/${id}`;
  return axios.patch(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};

export default updateObject;
