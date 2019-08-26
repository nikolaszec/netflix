import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import colors from "../styles/colors";
import AvatarFace from "@material-ui/icons/Face";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    background: colors.onyx,
    color: colors.darkgunmetal,
    transition: "color 0.4s ease-in",
    "&:hover": {
      color: colors.red
    }
  },
  avatarFace: {
    fontSize: "30px"
  }
});

export default function LetterAvatars(props) {
  const classes = useStyles();
  let initials = "";
  if (props.userData.data) {
    initials =
      props.userData.data.firstName[0] + props.userData.data.lastName[0];
  }
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={classes.avatar}>
        {initials ? initials : <AvatarFace className={classes.avatarFace} />}
      </Avatar>
    </Grid>
  );
}
