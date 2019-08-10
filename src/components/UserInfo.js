import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux'
import * as actions from '../store/actions/index'
import colors from '../styles/colors'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: '900',
    color:colors.red
   
  },
  expansionPanelIcon:{
    color:colors.red
  },
  expansionPanel:{
    background:colors.gunmetal,
    padding:5,
    marginBottom:3,
    boxSizing:'border-box',
    opacity:0.75,
    transition:'opacity 0.4s ease-in',
    '&:hover':{
      opacity:1
    },
    color:colors.red
  },
  expansionPanelSummary:{
    //background:'red'
  },
  info:{
    display:'flex',
    flexDirection:'column'
  },
  noUserDisplayCont:{
   
    alignSelf:'center',
    boxSizing:'border-box',
    padding:10
  },
  noUserDisplayText:{
    fontStyle:'italic',
    fontWeight:'100'
  }
}));



const UserInfo = (props) => {
  const classes = useStyles();

  useEffect(()=>{
   
   if(props.token!==null){

    props.getUserData(props.token)
   }
    
   
  },[props.token])

  let display = (<div className={classes.noUserDisplayCont}>
  <Typography className={classes.noUserDisplayText}>
  No data to display!

  {/**/}
    </Typography>
    </div>)


  if(props.userData.data){
    display = (
      <React.Fragment>
      <Typography gutterBottom>
      Name: {props.userData.data.firstName} {props.userData.data.lastName}
        </Typography>
       
      </React.Fragment>
      
    )
  }





  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary className={classes.expansionPanelSummary}
          expandIcon={<ExpandMoreIcon className={classes.expansionPanelIcon}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>User Info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.info}>
       {display}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userData:state.authReducer.userData,
    token:state.authReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
      
      getUserData:(token) => dispatch(actions.userInfo(token)),
      checkAuth:() => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)