import axios from "axios";

const createObject = payload => {
  let url = `http://localhost:3001/custom-objects/`;
  return axios.post(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};

export default createObject;
