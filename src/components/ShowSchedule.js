import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Box,Typography } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const READ_SCHEDULES = gql`
  query myschedules{
    schedules {
      id 
      title
      date
      start_time
      end_time
    }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  card: {
    padding: theme.spacing(5), 
    margin: 'auto', 
    marginTop: '10px', 
    marginBottom: '10px', 
    maxWidth: 500,

  },
  dateGrid: {
    width:"200px",
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: '#add8e6',
    borderRadius: '50px',
    padding: '10px',
  },
  info:{
    textAlign:'center',
    
  },
  title: {
    fontSize: '25px',
    fontWeight: 500,
    margin: '10px',
  },
  dateCard: {
    color:'white',
    fontSize:'35px',
    width: '100px',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd9346'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


}));



function ShowSchedule() {

  const classes = useStyles();

  const { loading, error, data } = useQuery(READ_SCHEDULES);



  if (loading) return <p>loading....</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not FOund</p>;

  const convert = (schedule_date) => {
    let date = schedule_date.split("-");
    let months=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
    let newdate = [date[2], months[date[1]-1]].join(" ");

    return newdate;
  }

  const convertTime=(schedule_time)=>{
    let time=schedule_time.split(":");
    let meridian=time[0]<12?'AM':'PM';
    time[0]=time[0]%12||12;
    let total_time=time.join(":")+" "+meridian;
    return total_time
  }


  return (


    <div >

      {data.schedules.slice(0).reverse().map((schedule,index) =>
        <Box key={index} className={classes.card} xs="auto" container boxShadow={5}>
          <CardContent className={classes.content} >
            <Card className={classes.dateCard}>
              {convert(schedule.date)}
            </Card>

            <Grid className={classes.info} >

              <Typography className={classes.title} >
                {schedule.title}
              </Typography>
                <Grid className={classes.dateGrid} display="flex" justifyContent="flex-end" >
                  <AccessAlarmIcon />
                  &nbsp;
                    {convertTime(schedule.start_time)}-{convertTime(schedule.end_time)}

                </Grid>
            </Grid>
          </CardContent>

        </Box>


      )}
    </div>
  );

}

export default ShowSchedule;
export { READ_SCHEDULES };