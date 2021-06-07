import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
  "& canvas": {
    width: "100%",
  },
  paper: {
    transition: "all 0.2s ease-out",
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    marginBottom: 10,
  },
  recordButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
  },
}));
