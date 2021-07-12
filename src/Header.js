import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";
import image from "./image.png";
function Header({ backButton }) {
  const history = useHistory();
  return (
    <div className="header">
      {/* {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon className="header__icon" fontSize="large" />
        </IconButton>
      ) : (
        <Link to="/form">
          <IconButton>
            <PersonIcon className="header__icon" fontSize="large" />
          </IconButton>
        </Link>
      )} */}
      <Link to="/form">
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>
      <Link to="/">
        <img className="header__logo" src={image} alt="moodys logo" />
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}

export default Header;
