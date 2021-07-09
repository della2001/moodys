import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, email, team, city, time, school, hobbies, show}
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={firstName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Team" secondary={team} />
              </ListItem>
              <ListItem>
                <ListItemText primary="City" secondary={city} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time" secondary={time} />
              </ListItem>
              <ListItem>
                <ListItemText primary="School" secondary={school} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Hobbies" secondary={hobbies} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Show" secondary={show} />
              </ListItem>
            </List>
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

export default Confirm;
