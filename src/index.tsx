import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PredictionForm from './PredictionForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(<ThemeProvider theme={darkTheme}><PredictionForm /></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
