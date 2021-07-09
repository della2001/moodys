import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter Personal Details" />
        
            <TextField
              placeholder="Enter Your Alma Mater"
              label="School"
              onChange={handleChange('Alma Mater')}
              defaultValue={values.school}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField
              placeholder="Enter Your Hobbies"
              label="Hobbies"
              onChange={handleChange('Hobbies')}
              defaultValue={values.hobbies}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your TV Show"
              label="City"
              onChange={handleChange('Favorite Show')}
              defaultValue={values.show}
              margin="normal"
              fullWidth
            />
            <br />
           <br />
            <Button
              style={{backgroundColor:'#153084', color: '#FFFFFF'}}
              variant="contained"
              onClick={this.continue}
            >Continue</Button>

            <br />

            <Button
              style={{backgroundColor:'#85754e', color: '#FFFFFF'}}
              variant="contained"
              onClick={this.back}
            >Back</Button>

          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalDetails;
