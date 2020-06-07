import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import isNil from "lodash/fp/isNil";
import { Divya, InsetWind, Button } from "./SettingsStyles";
import { TextStyle } from "../AboutPane/AboutPaneStyles";
import { Row } from "./TimerLength/TimerLengthStyles";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }
  handleKeyUp(e) {
    const { showSettings } = this.props;
    const keys = {
      27: () => {
        showSettings();
        e.preventDefault();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }
  handleOutsideClick(e) {
    const { showSettings } = this.props;
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        showSettings();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { children, showSettings, colorPal, clearLocalStorage } = this.props;
    let { textColor, borderColor, bgColor, bgMuted } = colorPal;
    return (
      <Divya>
        <InsetWind
          color={bgMuted}
          borderColor={borderColor}
          ref={(node) => (this.modal = node)}
        >
          <TextStyle color={textColor} large>
            settings
          </TextStyle>
          {children}
        </InsetWind>
        <Row>
          <Button onClick={showSettings}>
            <FontAwesomeIcon size="1x" icon={faTimesCircle} color={textColor} />
          </Button>
        </Row>
      </Divya>
    );
  }
}

// Export the component to use it in other components.
export default Settings;
