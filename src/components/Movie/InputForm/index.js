
import React from "react";
import { Formik } from "formik";
import  Form  from "./Form";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/styles'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
import colors from '../../../styles/colors'
const useStyles = makeStyles({
     paper: {
  margin:'0 auto',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding:4,
  backgroundColor:colors.onyx,
  color:colors.red,
 },
 container: {
  display:'flex',
   width: "80%",
   margin:'0 auto',
   color:colors.snow,
   flexDirection:'column',
   justifyContent:'center',
   alignItems:'center',
   textAlign:'left',
   minHeight:'100vh',
   boxSizing:'border-box',
   overflow:'auto'
 }
  });
  


const InputForm = (props) => {


 const classes = useStyles();


 return (
     <React.Fragment>
        { <div className={classes.container}>
         <Paper elevation={10} className={classes.paper}>
           <h2>Fill the form</h2>
         {props.error?<p>{props.error}</p>:null}
           <Formik
             render={props => <Form {...props}/>}
             validationSchema={validationSchema}
             initialValues={props.id?props.editInitials:props.createInitials} 
             onSubmit={(values,setSubmitting)=>{
               //genre fali i actors fali
               const {title,storyline,year,actors,duration,posterurl} = values
               const data = {
                 
               "title":title,
               "storyline":storyline,
               "year":year,
               "duration":duration,
               "posterurl":posterurl
               }
               
               props.handleEdit?props.handleEdit(props.id,data
           ,props.token):props.handleCreateMovie({...values},props.token)
             }}

             
           />
         </Paper>
   </div>}
   
     </React.Fragment>
   );
 
}

const validationSchema = Yup.object({
    title: Yup.string("Enter a movie title")
    .required("Movie title is required"),
    year:Yup.number('Please, provide a number').required('You should provide year of the movie'),
    releaseDate:Yup.date('Provide date').required('Provide releaseDate for the movie'),
    genres:Yup.string('Provide valid genre name').required('Please provide a genre of the movie'),
    actors:Yup.string('Provide valid actor name').required('Please provide an actor of the movie')
    
})    

const mapStateToProps = state => {
  return {
    createdSuccessfully:state.moviesReducer.movieCreated,
    movieExists:state.moviesReducer.error,
    token:state.authReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMovie:(movie,token) => dispatch(actions.createMovie(movie,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InputForm)
