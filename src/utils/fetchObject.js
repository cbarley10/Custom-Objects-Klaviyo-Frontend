import axios from "axios";

const fetchObject = id => {
  let url = `http://localhost:3001/custom-objects/${id}`;
  return axios.get(url).then(res => {
    const { data } = res;
    return data;
  });
};

export default fetchObject;
