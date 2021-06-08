import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecords } from "./actions/records.js";
import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import Form from "./components/Form/Form";
import Records from "./components/Records/Records";
import Transcriptions from "./components/Transcriptions/Transcriptions";
import useStyles from "./styles";
const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h2" align="center">
          Recording
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            align-items="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Records />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
              <br />
              <Transcriptions />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
