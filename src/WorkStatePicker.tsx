import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

interface WorkState {
  name: string;
};

interface ComponentState {
  work_states: Array<string>;
  selected: string | null
};

interface ComponentProps {
  ref: React.RefObject<WorkStatePicker>;
};

class WorkStatePicker extends Component<ComponentProps> {
  
  state: ComponentState = {
    work_states: [],
    selected: null
  };

  componentDidMount(){
    // Basis for the next bit of code: https://github.com/axios/axios/issues/1510#issuecomment-385939438
    axios.get<Array<WorkState>>(
      'https://h1b-prediction-backend.herokuapp.com/states'
    ).then((response) => {
      // `response` is of type `AxiosResponse<Array<WorkState>>`
      const { data } = response
      // `data` is of type Array<WorkState>, correctly inferred
      this.setState({
        work_states: data.map(val => val.name)
      })
    })
  }

  render(){
    return (
      <Autocomplete
        id="worksite_state"
        options={this.state.work_states}
        onChange={(event: object, value: string | null) => this.setState({selected: value})}
        renderInput={
          params => <TextField
            {...params}
            variant="outlined"
            required
            fullWidth
            label="Worksite State"
            name="worksite_state"
            inputProps={{ // https://material-ui.com/components/autocomplete/#autocomplete-autofill
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        }
      />
    );
  }
}

export default WorkStatePicker;
