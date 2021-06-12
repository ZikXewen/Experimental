import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Grow,
  Card,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getRecords } from "../../actions/records";
import Record from "./Record/Record";
import useStyles from "./styles";
const Records = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const classes = useStyles();
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  const records = useSelector((state) => state.records);
  return !records.length ? (
    <CircularProgress />
  ) : (
    <Grow in>
      <>
        <Card className={classes.card}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Term"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          ></TextField>
        </Card>
        <Grid container alignItems="stretch" spacing={3}>
          {records
            .slice()
            .reverse()
            .filter(
              (record) =>
                record.creator.includes(term) || record.title.includes(term)
            )
            .map((record) => (
              <Grid item key={record._id} xs={12} sm={6} md={6}>
                <Record record={record} />
              </Grid>
            ))}
        </Grid>
      </>
    </Grow>
  );
};
export default Records;
