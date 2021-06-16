import axios from "axios";
const url = "https://kratua-backend.herokuapp.com/records";

export const getRecords = () => axios.get(url);
export const createRecord = (newRecord) => axios.post(url, newRecord);
export const deleteRecord = (id) => axios.delete(`${url}/${id}`);
export const getCC = (id) => axios.get(`${url}/${id}`);
