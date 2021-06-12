import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Typography
        component={Link}
        to="/"
        variant="h2"
        align="center"
        className={classes.title}
      >
        Kratua
      </Typography>
      <Toolbar>
        <Button component={Link} to="/" className={classes.link}>
          Collections
        </Button>
        <Button component={Link} to="/next" className={classes.link}>
          Lessons
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
