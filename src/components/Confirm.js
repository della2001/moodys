import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import database from "../firebase";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    database
      .collection("people")
      .add({
        firstName: this.props.values.firstName,
        lastName: this.props.values.lastName,
        email: this.props.values.email,
        team: this.props.values.team,
        city: this.props.values.city,
        time: this.props.values.time,
        school: this.props.values.school,
        hobbies: this.props.values.hobbies,
        show: this.props.values.show,
      })
      .then((docRef) => {
        console.log("Document written with ID", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        firstName,
        lastName,
        email,
        team,
        city,
        time,
        school,
        hobbies,
        show,
      },
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog open fullWidth maxWidth="sm">
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
              style={{ backgroundColor: "#153084", color: "#FFFFFF" }}
              variant="contained"
              onClick={this.continue}
            >
              Submit
            </Button>

            <br />

            <Button
              style={{ backgroundColor: "#85754e", color: "#FFFFFF" }}
              variant="contained"
              onClick={this.back}
            >
              Back
            </Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
