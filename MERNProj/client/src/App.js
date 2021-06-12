import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Grid, Grow } from "@material-ui/core";
import Next from "./components/Next/Next";
import Form from "./components/Form/Form";
import Records from "./components/Records/Records";
import Transcriptions from "./components/Transcriptions/Transcriptions";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              align-items="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route path="/" exact component={Records} />
                  <Route path="/next" exact component={Next} />
                </Switch>
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
    </BrowserRouter>
  );
};
export default App;
