import axios from "axios";

const fetchObjects = () => {
  let url = "/custom-objects";
  return axios.get(url).then(res => {
    const { data } = res;
    return data;
  });
};

export default fetchObjects;
