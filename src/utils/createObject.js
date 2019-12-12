import axios from "axios";

const createObject = payload => {
  let url = `/custom-objects/`;
  return axios.post(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};

export default createObject;
