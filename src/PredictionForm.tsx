import React from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WorkStatePicker from './WorkStatePicker'
import OccupationPicker from './OccupationPicker';
import DatePicker from './DatePicker';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  alert: {
    marginBottom: theme.spacing(4),
    visibility: 'hidden'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Prediction{
  status: string;
  result: string;
};

interface AlertInfo{
  success: boolean
  content: string
};

const PredictionForm: React.FC = () => {
  const classes = useStyles();

  let startDateRef = React.createRef<DatePicker>();
  let endDateRef = React.createRef<DatePicker>();
  let workStateRef = React.createRef<WorkStatePicker>();
  let occupationRef = React.createRef<OccupationPicker>();

  const [alertInfo, setAlertInfo] = React.useState<AlertInfo>(
    {success: true, content: ""},
  );

  const [isFulltime, setFulltime] = React.useState<boolean>(
    false,
  );

  const getDateDiffInDays = () => {
    let startDate = startDateRef.current?.state.selectedDate;
    let endDate = endDateRef.current?.state.selectedDate;
    let dateDiffInTime;

    if(endDate && startDate){
      if(endDate < startDate){
        setAlertInfo({
          success: false, 
          content: "Employment End Date must be after Employment Start Date"
        });
        return null;
      }
      dateDiffInTime = endDate.getTime() - startDate.getTime();
    } else{
      dateDiffInTime = 0;
    }
    return Math.round(dateDiffInTime / (1000 * 3600 * 24));
  };

  const submit = () => {
    setAlertInfo({success: alertInfo.success, content: ""})
    axios.post<Prediction>(process.env.REACT_APP_BACKEND_URL + '/', {
      "occupation_code": occupationRef.current?.state.selected,
      "full_time_position": isFulltime,
      "worksite_state": workStateRef.current?.state.selected,
      "employment_duration_days": getDateDiffInDays()
    }).then((response) => {
      const { data } = response
      setAlertInfo({success: data.result.includes("Certified"), content: data.result})
    })
  }

  return (
    <Container component="main" maxWidth="sm" fixed>
      <CssBaseline />
      <div className={classes.paper}>
        <Alert 
          variant="outlined" 
          severity={alertInfo.success ? 'success' : 'error'} 
          className={classes.alert} 
          style={{visibility: alertInfo.content ? 'visible' : 'hidden'}}
        >
          {alertInfo.content}
        </Alert>
        <Typography component="h1" variant="h5">
          How likely is your H1-B Visa to be certified?
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker id="start_date" label="Employment Start Date" ref={startDateRef} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker id="end_date" label="Employment End Date" ref={endDateRef} />
            </Grid>
            <Grid item xs={12}>
              <WorkStatePicker ref={workStateRef} />
            </Grid>
            <Grid item xs={12}>
              <OccupationPicker ref={occupationRef} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    value="full_time_position" 
                    color="primary" 
                    required 
                    onChange={(event, value) => setFulltime(value)} 
                  />
                }
                label="Is your position a full-time job?"
              />
            </Grid>
          </Grid>        
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Predict
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default PredictionForm;