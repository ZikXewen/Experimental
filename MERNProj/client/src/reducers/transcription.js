import { GETCC, RESETCC } from "../constants/actionTypes";

export default (transcription = "", action) => {
  switch (action.type) {
    case GETCC:
      return action.payload;
    case RESETCC:
      return "";
    default:
      return transcription;
  }
};
