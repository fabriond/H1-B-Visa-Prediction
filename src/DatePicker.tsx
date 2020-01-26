import 'date-fns';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface ComponentState {
  selectedDate: Date | null;
};

interface ComponentProps {
  id: string;
  label: string;
  ref: React.RefObject<DatePicker>;
};

class DatePicker extends Component<ComponentProps> {

  state: ComponentState = {
    selectedDate: new Date()
  };

  constructor(props: ComponentProps) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(newDate: Date | null){
    this.setState({
      selectedDate: newDate
    });
  }

  render(){
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            id={this.props.id}
            label={this.props.label}
            margin="normal"
            format="MM/dd/yyyy"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export default DatePicker;