import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";
export default (records = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...records, action.payload];
    case DELETE:
      return records.filter((record) => record._id !== action.payload);
    default:
      return records;
  }
};
