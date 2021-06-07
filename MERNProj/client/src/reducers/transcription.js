import { GETCC } from "../constants/actionTypes";

export default (transcription = "", action) => {
  switch (action.type) {
    case GETCC:
      return action.payload;
    default:
      return transcription;
  }
};
