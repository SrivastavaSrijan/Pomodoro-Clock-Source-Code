import React, { Component } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faBookDead,
  faClock,
  faCrosshairs,
  faDizzy,
  faComment,
  faHeart,
  faAdjust,
  faInfoCircle,
  faSlidersH,
  faUser,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import isNil from "lodash/fp/isNil";
import {
  TextStyle,
  Divya,
  Button,
  InsetWind,
  Footer,
} from "./AboutPaneStyles.js";

class AboutPane extends Component {
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
    const { showAbout } = this.props;
    const keys = {
      27: () => {
        showAbout();
        e.preventDefault();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }
  handleOutsideClick(e) {
    const { showAbout } = this.props;
    if (!isNil(this.about)) {
      if (!this.about.contains(e.target)) {
        showAbout();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { colorPal, showAbout, urlAuth } = this.props;
    let { textColor, borderColor, bgColor, bgMuted } = colorPal;

    return (
      <Divya>
        <InsetWind
          color={bgMuted}
          borderColor={borderColor}
          ref={(node) => (this.about = node)}
        >
          <TextStyle color={textColor} large>
            Being productive is hard. We make it easy.
          </TextStyle>
          <TextStyle color={textColor}>
            <FontAwesomeIcon
              size="1x"
              icon={faClock}
              color={textColor}
              transform="shrink-6 left-3"
            />
            Choose an achievable goal, set the clock to the time you'd be done
            with it.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faCrosshairs}
              color={textColor}
              transform="shrink-6 left-3"
            />
            Add a task to your to-do list. Work on it till the Pomodoro rings.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faComment}
              color={textColor}
              transform="shrink-6 left-3"
            />
            Strike the task off. Take a break &mdash; be sure to take
            calculated, relaxing breaks.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faDizzy}
              color={textColor}
              transform="shrink-6 left-3"
            />
            Every 4 "Pomodoros", take a longer break &mdash; go crazy!
            <hr />
            <FontAwesomeIcon
              size="1x"
              icon={faInfoCircle}
              color={textColor}
              transform="shrink-6 left-3"
            />
            To adjust the session length, click on the{" "}
            <FontAwesomeIcon
              size="1x"
              icon={faSlidersH}
              color={textColor}
              transform="shrink-6 
              bottom-1"
            />{" "}
            button on the header.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faInfoCircle}
              color={textColor}
              transform="shrink-6 left-3"
            />{" "}
            Rough day? For Dark Mode, click on the
            <FontAwesomeIcon
              size="1x"
              icon={faAdjust}
              color={textColor}
              transform="shrink-6"
            />{" "}
            button on the header.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faInfoCircle}
              color={textColor}
              transform="shrink-6 left-3"
            />{" "}
            Add your tasks by clicking the{" "}
            <FontAwesomeIcon
              size="1x"
              icon={faTasks}
              color={textColor}
              transform="shrink-6"
            />{" "}
            icon top-right of the timer.
            <br />
            <FontAwesomeIcon
              size="1x"
              icon={faInfoCircle}
              color={textColor}
              transform="shrink-6 left-3"
            />{" "}
            To sync up your tasks, login via the{" "}
            <FontAwesomeIcon
              size="1x"
              icon={faUser}
              color={textColor}
              transform="shrink-6"
            />{" "}
            button on the header.
            <br />
          </TextStyle>
        </InsetWind>
        <Button onClick={showAbout}>
          <FontAwesomeIcon size="2x" icon={faTimesCircle} color={"#FFF"} />
        </Button>
        <Footer color={"#FFF"}>
          <p>
            For a tutorial, visit the landing page{" "}
            <a
              href="https://srijansrivastava.tech/pomodoro-clock-hello"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
            <br />
            Made with <FontAwesomeIcon icon={faHeart} size="1x" /> by{" "}
            <a
              href="https://srijansrivastava.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Srijan
            </a>
            .{" "}
          </p>
          {urlAuth !== "none" && (
            <p>
              Photo by{" "}
              <a href={urlAuth[1]} target="_blank" rel="noopener noreferrer">
                {" "}
                {urlAuth[0]}{" "}
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/?utm_source=pomodoroclock&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash.
              </a>
            </p>
          )}
        </Footer>
      </Divya>
    );
  }
}

export default AboutPane;
