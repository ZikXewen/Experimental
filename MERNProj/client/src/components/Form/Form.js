import React, { useState, useEffect } from "react";
import { Button, Typography, Card, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { createRecord } from "../../actions/records";
import { setTitle } from "../../actions/records";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";

import useStyles from "./styles";

const Form = () => {
  const [paperScale, setPaperScale] = useState(1);
  const [timeCount, setTimeCount] = useState(new Date());
  const [recordState, setRecordState] = useState(null);
  const [recordData, setRecordData] = useState({
    title: "",
    creator: "",
    audioFile: "",
    duration: 0,
  });
  const [disableTitle, setDisableTitle] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const curTitle = useSelector((state) => state.title);
  useEffect(() => {
    if (curTitle) {
      setRecordData({ ...recordData, title: curTitle });
      setDisableTitle(true);
    } else setDisableTitle(false);
  }, [curTitle]);
  const handleStop = (audioData) => {
    var reader = new FileReader();
    reader.readAsDataURL(audioData.blob);
    reader.onloadend = () => {
      setRecordData({ ...recordData, audioFile: reader.result });
    };
  };
  const handleRecordClick = () => {
    if (recordState === RecordState.START) {
      setRecordState(RecordState.STOP);
      setRecordData({ ...recordData, duration: Date.now() - timeCount });
    } else {
      setRecordState(RecordState.START);
      setTimeCount(Date.now());
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      recordData.title === "" ||
      recordData.creator === "" ||
      recordData.duration === 0
    )
      return;
    console.log(recordData);
    dispatch(createRecord(recordData));
    handleClear();
  };
  const handleClear = () => {
    console.log(recordData);
    console.log(curTitle);
    setRecordData({ title: "", creator: "", audioFile: "", duration: 0 });
    dispatch(setTitle(""));
  };
  return (
    <Card
      className={classes.paper}
      onMouseOver={() => {
        setPaperScale(1.03);
      }}
      onMouseOut={() => {
        setPaperScale(1);
      }}
      style={{ transform: `scale(${paperScale}, ${paperScale})` }}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Typography variant="h5">New Recording</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          className={classes.textField}
          value={recordData.title}
          InputProps={{ readOnly: disableTitle }}
          onChange={(e) => {
            setRecordData({ ...recordData, title: e.target.value });
          }}
        />
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          className={classes.textField}
          value={recordData.creator}
          onChange={(e) => {
            setRecordData({ ...recordData, creator: e.target.value });
          }}
        />
        <AudioReactRecorder
          state={recordState}
          onStop={handleStop}
          canvasWidth={0}
          canvasHeight={0}
        />
        <Button
          variant="outlined"
          size="medium"
          className={classes.recordButton}
          onClick={handleRecordClick}
        >
          {recordState === RecordState.START ? (
            <>
              Stop Record
              <StopIcon />
            </>
          ) : (
            <>
              Start Record
              <MicIcon />
            </>
          )}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={recordState === RecordState.START}
          fullWidth
          className={classes.submitButton}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClear}
          disabled={recordState === RecordState.START}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Card>
  );
};
export default Form;
