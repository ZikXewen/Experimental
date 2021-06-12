import { combineReducers } from "redux";
import records from "./records";
import transcription from "./transcription";
import label from "./label";
import title from "./title";
export const reducers = combineReducers({
  records,
  transcription,
  label,
  title,
});
