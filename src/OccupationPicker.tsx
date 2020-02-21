import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

interface Occupation {
  code: string;
  name: string;
};

interface ComponentState {
  occupations: Array<Occupation>;
  selected: string | null;
};

interface ComponentProps {
  ref: React.RefObject<OccupationPicker>;
};

class OccupationPicker extends Component<ComponentProps> {
  
  state: ComponentState = {
    occupations: [],
    selected: null
  };

  componentDidMount(){
    // Basis for the next bit of code: https://github.com/axios/axios/issues/1510#issuecomment-385939438
    axios.request<Array<Occupation>>({
      url: process.env.REACT_APP_BACKEND_URL + '/occupations'
    }).then((response) => {
      // `response` is of type `AxiosResponse<Array<Occupation>>`
      const { data } = response
      // `data` is of type Array<Occupation>, correctly inferred
      this.setState({
        occupations: data
      })
    })
  }

  render(){
    return (
      <Autocomplete
        id="occupation"
        options={this.state.occupations}
        getOptionLabel={option => option.name}
        onChange={(event: object, value: Occupation | null) => this.setState({selected: value?.code})}
        renderInput={
          params => <TextField
            {...params}
            variant="outlined"
            required
            fullWidth
            label="Occupation Name"
            name="occupation"
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

export default OccupationPicker;
