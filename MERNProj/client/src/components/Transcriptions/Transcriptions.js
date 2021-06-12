import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, List, ListItem, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import { wordErrorRate } from "word-error-rate";
import { setLabel } from "../../actions/records";
const Transcriptions = () => {
  const dispatch = useDispatch();
  const latestTranscription = useSelector((state) => state.transcription);
  const [transcriptions, setTranscriptions] = useState([]);
  const classes = useStyles();
  const label = useSelector((state) => state.label);
  useEffect(() => {
    if (latestTranscription)
      setTranscriptions([
        {
          str: latestTranscription,
          lab: label,
          wer: (
            100 -
            wordErrorRate(
              latestTranscription.split("").join(" "),
              label.split("").join(" ")
            ) *
              100
          ).toFixed(2),
        },
        ...transcriptions,
      ]);
    dispatch(setLabel(""));
    console.log(latestTranscription);
    console.log(label);
  }, [latestTranscription]);
  return (
    <Container className={classes.listBlock}>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        className={classes.listTitle}
      >
        Latest Transcriptions
      </Typography>
      <List className={classes.list}>
        {transcriptions.map((transcription) => (
          <ListItem className={classes.listItem}>
            <Typography className={classes.listItemLeft}>
              {transcription.str}
            </Typography>
            <Typography className={classes.listItemRight}>
              {transcription.wer}%
            </Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default Transcriptions;
