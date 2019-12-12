import axios from "axios";

const fetchObject = id => {
  let url = `/custom-objects/${id}`;
  return axios.get(url).then(res => {
    const { data } = res;
    return data;
  });
};

export default fetchObject;
