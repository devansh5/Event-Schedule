import React,{useState} from 'react'
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ShowSchedule from './ShowSchedule';
import Confirm from './Confirm';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    background :{
        background:'',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign:'left'
    },
  }));

export default function Main() {
    
    
    
    const classes = useStyles();
    const steps=['show','first','second','confirm']
    const [activeStep,setactiveStep]=useState(0);
    const initialState={
        title:'',
        date:'',
        startTime:'',
        endTime:''
    }
    const [eventDetail,seteventDetail]=useState(initialState);
    
    const next=()=>{
        setactiveStep(activeStep+1)
        if(activeStep===steps.length-1){
            setactiveStep(0);
            seteventDetail(initialState)
        };
    }
    const back=()=>{
        setactiveStep(activeStep-1)
        if(activeStep===steps.length){
            setactiveStep(0);
            seteventDetail(initialState)
        };
    }
    const handleChange=(input)=>e=>{
        seteventDetail({...eventDetail,[input]:e.target.value})
    }
    const values={...eventDetail}
    function getStepContent(step){
        switch(step){
            case 0:
                return <ShowSchedule/>
            case 1:
                return <FirstForm values={values} handleChange={handleChange} />
            
            case 2:
                return <SecondForm values={values} handleChange={handleChange} />
            case 3: 
                return <Confirm values={values} next={next}/>
            default:
                throw new Error('Unknown Step')
        }
    }
    let button;
    if(activeStep===0){
        button='Create Schedule';
    }
    else {
        button='Next';
    }
    let backbutton;
    if(activeStep>0){
        backbutton='back';
    }
    else{
        backbutton=null
    }
    return (
        <div>
        <div className={classes.root}>
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                <Typography variant="h4" className={classes.title}>
                    Schedules
                </Typography>
                {
                    activeStep===0?null
                    :(
                        <Button color="secondary" variant="contained" onClick={back}>{backbutton}</Button>
                    )
                }
                &nbsp;
                {
                    activeStep===steps.length-1? null
                    :(
                        <Button color="secondary" variant="contained" onClick={next}>{activeStep===steps.length-1 ? null :button}</Button>
                    )
                    
                    
                }
                </Toolbar>
            </AppBar>
        </div>
            <React.Fragment>
                {getStepContent(activeStep)}
            </React.Fragment>
        </div>
    )
}
