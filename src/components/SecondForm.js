import React from 'react'
import TextField from  '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent ,Box, Typography} from '@material-ui/core';

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


export default function SecondForm(props) {
    
    const {handleChange}=props;
    const classes = useStyles();
    return (
        <React.Fragment>
           <Box  boxShadow={3} xs justifyContent="center" className={classes.root} >
            <Typography variant='h4' color="primary"> 
                Step 2
            </Typography>
            <CardContent >            
                        <TextField
                            required
                            type='time'
                            label="Start_time"
                            className={classes.textField}
                            onChange={handleChange('startTime')}
                        />
            <br/> 
                        <TextField 
                            required
                            type='time'
                            label="End Time" 
                            placeholder="End Time" 
                            className={classes.textField}
                            onChange={handleChange('endTime')} 
                        />
            </CardContent>
        </Box>
        </React.Fragment>
    )
}
