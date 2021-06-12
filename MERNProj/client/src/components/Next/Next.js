import {
  Collapse,
  Grow,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../actions/records";
import lessons from "./Lessons";
import useStyles from "./styles";
const Next = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(Array(lessons.length).fill(false));
  const classes = useStyles();

  return (
    <Grow in>
      <List className={classes.list}>
        {lessons.map((lesson) => (
          <>
            <ListItem
              button
              onClick={() => {
                setExpanded(
                  expanded.map((item, exid) =>
                    exid === lesson.id ? !item : item
                  )
                );
              }}
            >
              <ListItemText primary={lesson.name} />
            </ListItem>
            <Collapse in={expanded[lesson.id]}>
              <List component="div" disablePadding>
                {lesson.items.map((item) => (
                  <ListItem
                    button
                    onClick={() => {
                      dispatch(setTitle(item));
                    }}
                  >
                    <ListItemText primary={item} inset={true} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </Grow>
  );
};
export default Next;
