import { combineReducers } from "redux";
import records from "./records";
import transcription from "./transcription";
import label from "./label";
export const reducers = combineReducers({ records, transcription, label });
