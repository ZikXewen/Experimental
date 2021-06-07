import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { List, ListItem } from "@material-ui/core";
import useStyles from "./styles.js";
const Transcriptions = () => {
  const latestTranscription = useSelector((state) => state.transcription);
  const [transcriptions, setTranscriptions] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (latestTranscription)
      setTranscriptions([latestTranscription, ...transcriptions]);
  }, [latestTranscription]);
  return (
    <List>
      {transcriptions.map((transcription) => (
        <ListItem fullWidth className={classes.listItem} divider={true}>
          {transcription}
        </ListItem>
      ))}
    </List>
  );
};
export default Transcriptions;
