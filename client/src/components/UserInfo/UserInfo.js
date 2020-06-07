import {
  Row,
  TimeStyle,
  TimerAdjust,
  TextStyle,
} from "../Settings/TimerLength/TimerLengthStyles.js";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
class UserInfo extends Component {
  render() {
    const { noSess, colorPal } = this.props;
    let { textColor, borderColor, bgColor } = colorPal;

    return (
      <TimerAdjust color={bgColor} borderColor={textColor}>
        <FontAwesomeIcon size="2x" icon={faUser} color={textColor} />
        <TextStyle color={textColor}>Your progress</TextStyle>
        <TextStyle large color={textColor}>
          {noSess} poms.
        </TextStyle>
        <TimeStyle></TimeStyle>
      </TimerAdjust>
    );
  }
}
export default UserInfo;
