import React from 'react'
import TextField from  '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent ,Box, Typography} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(2),     margin:'auto',     marginTop: '10px',     marginBottom:'10px',     maxWidth: 500,
      },
    text:{
        marginTop:'50px',
        fontSize:'60px',
        marginBottom:'60px',
    },
  }));



export default function FirstForm(props) {
    const {values,handleChange}=props;
    const classes = useStyles();
    return (
        <Box  boxShadow={3} xs justifyContent="center" className={classes.root} >
            <Typography variant='h4' color="primary"> 
                Step 1
            </Typography>
            <CardContent >            
                        <TextField
                   required
                            id="outlined-required"
                            label="Schedule Title"
                            className={classes.text}
                            variant="outlined"
                            defaultValue={values.title}
                            onChange={handleChange('title')}
                        />
            <br/> 
                        <TextField 
                            required
                            type="date" 
                            placeholder="enter the event date"
                            defaultValue={values.date} 
                            onChange={handleChange('date')} 
                        />
            </CardContent>
        </Box>
    )
}
