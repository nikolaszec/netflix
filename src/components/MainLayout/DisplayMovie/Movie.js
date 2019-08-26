import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withRouter, Link } from "react-router-dom";
import colors from "../../../styles/colors";

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    minWidth: 300,
    boxSizing: "border-box",
    height: "100%",
    backgroundColor: colors.darkgunmetal,
    transition: "background-color 0.3s ease-in",
    "&:hover": {
      backgroundColor: colors.onyx
    }
  },
  linkWrapper: {
    border: "1px solid red"
  },
  linkContainer: {
    height: "100%",
    boxShadow: `0px 1px 14px -1px ${colors.snow}`,
    borderRadius: "1px",
    transition: "box-shadow 0.3s ease-in",
    "&:hover": {
      boxShadow: `0px 1px 20px -1px ${colors.red}`
    }
  },
  link: {
    textDecoration: "none",
    outlineStyle: "none"
  }
});

function Movie(props) {
  const classes = useStyles();

  const rating = Number.parseFloat(
    props.ratings.reduce((previous, current) => {
      return previous + current;
    }, 0) / props.ratings.length
  ).toFixed(1);

  return (
    <div className={classes.linkContainer}>
      <Link to={`/movie/info/${props.id}`} className={classes.link}>
        <Card className={classes.card}>
          <CardActionArea>
            <div
              style={{
                width: "auto",
                height: "240px",
                backgroundSize: "100% 100%",
                backgroundImage: `url(${
                  props.posterUrl
                    ? props.posterUrl
                    : "https://energywater.gr/wp-content/uploads/2017/12/noimage.png"
                }`
              }}
            />
            <CardContent>
              <Typography
                style={{ color: colors.snow }}
                gutterBottom
                variant="h6"
                component="h4"
              >
                {props.title}
              </Typography>
              <Typography
                style={{ color: colors.red }}
                gutterBottom
                variant="subtitle2"
                component="p"
              >
                {isNaN(rating) ? "No rating yet." : rating}
              </Typography>
              <Typography
                style={{ color: colors.lightwhite }}
                variant="subtitle2"
                component="p"
              >
                Genres: {props.genres.join(",") || "No genres yet"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}

export default withRouter(Movie);
