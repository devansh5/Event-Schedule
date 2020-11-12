import React from 'react'
import { CardContent ,Box, Typography,Button,TextField,makeStyles} from '@material-ui/core';
import {useMutation,gql} from '@apollo/client';
import {READ_SCHEDULES} from './ShowSchedule';

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(2),     margin:'auto',     marginTop: '10px',     marginBottom:'10px',     maxWidth: 500,
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        marginTop:'50px',
        fontSize:'60px',
        marginBottom:'60px',
      },
  }));

const CREATE_SCHEDULES=gql`
  mutation ($title:String!,$date: String! ,$start_time:String!,$end_time:String!){
    insert_schedules(objects:{title: $title,date: $date,start_time:$start_time,end_time:$end_time}){
      affected_rows
      returning{
          title
          date
          start_time
          end_time
      }

    }
  }
`
export default function Confirm(props) {
    const updateCache=(cache,{data})=>{


        const exsitingSchedules=cache.readQuery({
            query:READ_SCHEDULES
        });

        const newSchedules=data.insert_schedules.returning[0];
        cache.writeQuery({
            query:READ_SCHEDULES,
            data:{schedules:[newSchedules,...exsitingSchedules.schedules]}
        })

    }

    const [addSchedule]=useMutation(CREATE_SCHEDULES,{update:updateCache});
    const {values,next}=props;
    const submit=e=>{
        e.preventDefault();
        addSchedule({variables:{title:values.title,date:values.date,start_time:values.startTime,end_time:values.endTime}})
        next();
    }
    const classes = useStyles();    
    return (
        <React.Fragment>
            <Box  boxShadow={3} xs justifyContent="center" className={classes.root} >
            <Typography variant='h4' color="secondary"> 
                Confirm
            </Typography>
            <CardContent >      
            <form onSubmit={submit}>
            <TextField
                            required
                            variant="outlined"
                            label="Title"
                            className={classes.textField}
                            defaultValue={values.title}
                        />
            
                        <TextField 
                            required
                            label="date" 
                            variant="outlined" 
                            className={classes.textField} 
                            defaultValue={values.date} 
                        />
            
                        <TextField
                            label="start time"
                            required
                            defaultValue={values.startTime}
                            className={classes.textField}
                            
                        />
            
                        <TextField 
                            label="end time"
                            required 
                            defaultValue={values.endTime}
                            className={classes.textField}
    
                        />
            

                   <Button variant="contained" color="primary" type="submit">Submit</Button>
           </form>      
                       
            </CardContent>
        </Box>

            

        </React.Fragment>
    )
}
