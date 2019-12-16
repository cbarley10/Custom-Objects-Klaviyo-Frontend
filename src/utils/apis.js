import axios from "axios";

const deleteObject = id => {
  let url = `/custom-objects/${id}`;
  return axios.delete(url).then(res => {
    console.log(id);
    const { data, status } = res;
    return { data, status };
  });
};

const createObject = payload => {
  let url = `/custom-objects/`;
  return axios.post(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};

const fetchObject = id => {
  let url = `/custom-objects/${id}`;
  return axios.get(url).then(res => {
    const { data } = res;
    return data;
  });
};

const fetchObjects = () => {
  let url = "/custom-objects";
  return axios.get(url).then(res => {
    const { data } = res;
    return data;
  });
};

const updateObject = (id, payload) => {
  let url = `/custom-objects/${id}`;
  return axios.patch(url, payload).then(res => {
    const { data, status } = res;
    return { data, status };
  });
};
export { deleteObject, createObject, fetchObject, fetchObjects, updateObject };
