import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MainLayout from "./MainLayout/MainLayout";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import { withRouter, Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import CreateMovie from "./CreateMovie";
import Auth from "./Auth/Auth";
import SingleMovie from "../components/MainLayout/DisplayMovie/SingleMovie";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import colors from "../styles/colors";
import TheatersIcon from '@material-ui/icons/Theaters'
import CreateIcon from '@material-ui/icons/Create'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    background: colors.darkgunmetal
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "100vh",

    background: colors.darkgunmetal
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  avatarContainer: {
    border:'none'},
  sideDrawerContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  logout: {
    marginTop: "auto",
    marginBottom: 20
  },
  main: {
    width: "100%",
    height: "100vh",
    background:colors.gunmetal
  },
  list:{
    padding:'0px',border:'none',boxSizing:'border-box'
  },
  listItem:{
    transition:'background 0.3s ease-in',
    '&:hover':{
      background:colors.gunmetal
    },
    
    padding:'10px',
    border:`1px solid ${colors.gunmetal}`,
    boxSizing:'border-box'
  },
  listItemIcon:{
    color:colors.red
  },
  listItemText:{
    color:colors.lightwhite,
    '&:hover': {
        color: colors.red,
      },
      padding:10,
      
      '&:disabled': {
          color: colors.lightwhite,
        },
        transition:'color 0.3s ease-in',
},
listItemLogout:{
  transition:'background 0.3s ease-in,opacity 0.3s ease-in',
  opacity:0.8,
  '&:hover':{
    background:colors.gunmetal,
    opacity:1
  },
  
  padding:'5px',
  border:`1px solid ${colors.gunmetal}`,
  boxSizing:'border-box',
  textAlign:'center'
},
logoutText:{
  color:colors.red
},
disabledItem:{
  color:colors.lightwhite,
  '&:disbled':{
    color:'green'
  }
},
headline:{
  color:colors.red
},
layoutHolder:{
  background:colors.gunmetal
}
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    props.checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = (
    <div className={classes.sideDrawerContainer}>
      <div className={classes.toolbar} />
      <Divider />
      <List className={classes.list}>
        <div className={classes.avatarContainer}>
          <Avatar userData={props.userData} />
          <UserInfo token={props.token} />
        </div>

        <Divider />

        <ListItem button divider className={classes.listItem}>
        <ListItemIcon>
        <TheatersIcon className={classes.listItemIcon} />
      </ListItemIcon>
      <ListItemText
          className={classes.listItemText}
            onClick={
              () => props.history.push("/")
              //
            }
            primary={"All Movies"}
          />
          {/*
          */}
        </ListItem>

        <ListItem className={classes.listItem} divider button disabled={props.token ? false : true}>
          <ListItemIcon>
            <CreateIcon className={classes.listItemIcon}/>
          </ListItemIcon>
          <ListItemText className={classes.listItemText}
            onClick={() => props.history.push("/movie/create")}
            primary={"Create Movie"}
          />
        </ListItem>
      </List>
      <Divider />
      <div className={classes.logout}>
        <Divider />
        <List className={classes.list}>
          <ListItem button className={classes.listItemLogout}>

            <ListItemText className={`${classes.listItemText} ${classes.logoutText}`}
              onClick={
                props.token
                  ? () => props.logout() && props.history.push("/auth")
                  : () => props.history.push("/auth")
              }
              primary={props.token ? "Logout" : "Login"}
            />
          </ListItem>
        </List>
        <Divider />
      </div>
    </div>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.headline} variant="h6" component="h1" noWrap>
            Netflix
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/*
      
        Ispod je main komponenta
      ,
  '&:hover':{
    color:colors.lightwhite
  }
      
      */}
      <main className={classes.main}>
      <div className={classes.layoutHolder}>
      <Switch>
      <Route path="/movie/info/:id" component={SingleMovie} />
      <Route path="/auth" component={Auth} />
      <Route
        path="/movie/create/:id"
        component={props.token ? CreateMovie : MainLayout}
      />
      <Route
        path="/movie/create"
        component={props.token ? CreateMovie : MainLayout}
      />
      <Route path="/" exact component={MainLayout} />
      <Route component={MainLayout} />
    </Switch>
      </div>
    
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.object
};

const mapStateToProps = state => {
  return {
    userData: state.authReducer.userData,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: token => dispatch(actions.userInfo(token)),
    checkAuth: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResponsiveDrawer)
);
