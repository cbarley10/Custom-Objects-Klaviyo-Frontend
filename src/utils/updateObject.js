import axios from "axios";

const updateObject = (id, payload) => {
  let url = `/custom-objects/${id}`;
  return axios.patch(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};

export default updateObject;
