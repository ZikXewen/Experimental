import { TITLE } from "../constants/actionTypes";

export default (title = "", action) => {
  switch (action.type) {
    case TITLE:
      return action.payload;
    default:
      return title;
  }
};
