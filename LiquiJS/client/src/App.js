import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
export default () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then(({ data }) => {
        for (var map in data) {
          data[map] = data[map].map((comp) => comp.sort()).sort();
        }
        setPosts(data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <Container>
      {posts &&
        Object.entries(posts).map(([key, value]) => (
          <Container>
            <Typography
              align="center"
              variant="h5"
              style={{ margin: "20px 0" }}
            >
              {key}
            </Typography>
            <div>
              {value.map((comp) => (
                <Grid container>
                  {comp.map((agent) => (
                    <Grid item xs>
                      <Typography align="center" style={{ margin: "3px 0" }}>
                        {agent}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </div>
          </Container>
        ))}
    </Container>
  );
};
