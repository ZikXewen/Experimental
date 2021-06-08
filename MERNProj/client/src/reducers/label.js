import { LABEL } from "../constants/actionTypes";

export default (label = "", action) => {
  switch (action.type) {
    case LABEL:
      return action.payload;
    default:
      return label;
  }
};
