import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Row, TimeStyle, TimerAdjust, TextStyle } from "./TimerLengthStyles.js";
class TimerLengthComp extends Component {
  render() {
    const { len, inc, dec, target, label, colorPal } = this.props;
    let { textColor, borderColor, bgColor } = colorPal;

    return (
      <TimerAdjust color={bgColor} borderColor={textColor}>
        <TextStyle color={textColor}>{label} time</TextStyle>
        <TextStyle large color={textColor}>
          {len} mins.
        </TextStyle>

        <Row>
          <TimeStyle onClick={() => inc(target)}>
            <FontAwesomeIcon size="2x" icon={faPlusCircle} color={textColor} />
          </TimeStyle>
          <TimeStyle onClick={() => dec(target)}>
            <FontAwesomeIcon size="2x" icon={faMinusCircle} color={textColor} />
          </TimeStyle>
        </Row>
      </TimerAdjust>
    );
  }
}
export default TimerLengthComp;
