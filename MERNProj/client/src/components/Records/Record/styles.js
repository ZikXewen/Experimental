import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    position: "relative",
    // height: "100%",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  padder: {
    height: 0,
    paddingTop: "50%",
    background:
      "linear-gradient(rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 85%)",
  },
  title: {
    padding: "0 16px",
    marginBottom: "20px",
  },
  duration: {
    textAlign: "center",
  },
  actionButton: {
    margin: 0,
    padding: "16px",
    width: "50%",
  },
}));
