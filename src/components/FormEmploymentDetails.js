import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

export class FormEmploymentDetails extends Component {
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
            <AppBar title="Enter Employment Details" />
        
            <TextField
              placeholder="Enter Your City"
              label="City"
              onChange={handleChange('city')}
              defaultValue={values.city}
              margin="normal"
              fullWidth
            />
            <br />
            <br />
             <Select native defaultValue='none' onChange={handleChange('team')}>
               <option value="Team">Team</option>
                <option value="MIS">MIS</option>
                <option value="MA">MA</option>
                <option value="MSS">MSS</option>
            </Select>
            <br />
            <br />
             <Select native defaultValue='none' onChange={handleChange('time')}>
               <option value="Time Spent at Moody's (yrs)">Time Spent at Moody's (yrs)</option>
                <option value="<1">Less than One</option>
                <option value="1-5">One to Five</option>
                <option value="5-10">Five to Ten</option>
                <option value="10-15">Ten to Fifteen</option>
                <option value=">15">More than Fifteen</option>
            </Select>

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

export default FormEmploymentDetails;
