import React, { useState } from "react";
import { Box, Button, Card, Collapse, Typography } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";
import CCIcon from "@material-ui/icons/ClosedCaption";
import moment from "moment";
import { deleteRecord, getCC, setLabel } from "../../../actions/records";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
const Record = ({ record }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    const thisAudio = document.getElementById(`audio${record._id}`);
    playing ? thisAudio.pause() : thisAudio.play();
    setPlaying(!playing);
  };
  const handleGetCC = () => {
    dispatch(getCC(record._id));
    dispatch(setLabel(record.title));
  };
  return (
    <Card
      className={classes.card}
      onMouseOver={() => {
        setExpanded(true);
      }}
      onMouseOut={() => {
        setExpanded(false);
      }}
    >
      <Box className={classes.padder} />
      <Box className={classes.overlay}>
        <Typography variant="h6">{record.creator}</Typography>
        <Typography variant="body2">
          {moment(record.createdAt).fromNow()}
        </Typography>
      </Box>
      <Box className={classes.overlay2}>
        <Button
          size="small"
          onClick={() => {
            dispatch(deleteRecord(record._id));
          }}
          color="inherit"
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </Box>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {record.title}
      </Typography>
      <Collapse in={expanded}>
        <Typography className={classes.duration} color="primary">
          Duration: {record.duration} ms
        </Typography>
        <audio
          src={record.audioFile}
          id={`audio${record._id}`}
          onEnded={() => {
            setPlaying(false);
          }}
        />
        <Button
          className={classes.actionButton}
          color="primary"
          onClick={handlePlay}
        >
          {playing ? <PauseIcon /> : <PlayIcon />} Play
        </Button>
        <Button
          className={classes.actionButton}
          color="primary"
          onClick={handleGetCC}
        >
          <CCIcon /> Subtitle
        </Button>
      </Collapse>
    </Card>
  );
};
export default Record;
