import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Record from "./Record/Record";
const Records = () => {
  const records = useSelector((state) => state.records);
  return !records.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {records.map((record) => (
        <Grid item key={record._id} xs={12} sm={6} md={6}>
          <Record record={record} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Records;
