import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
  listBlock: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "100%",
    justifyContent: "center",
    paddingTop: "15px",
  },
  listItem: {
    display: "flex",
    padding: "10px",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 5px 7px -1px rgba(51, 51, 51, 0.23)",
  },
  listItemLeft: {
    textAlign: "center",
    width: "70%",
  },
  listItemRight: {
    color: "green",
    textAlign: "center",
    width: "30%",
  },
  list: {
    backgroundColor: "white",
    borderRadius: "0 0 12px 12px",
    padding: "15px 15px 20px",
    display: "grid",
    rowGap: "8px",
  },
  listTitle: {
    top: "50%",
  },
}));
