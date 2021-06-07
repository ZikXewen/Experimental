import { combineReducers } from "redux";
import records from "./records";
import transcription from "./transcription";
export const reducers = combineReducers({ records, transcription });
