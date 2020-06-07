import React, { Component } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faChild,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import isNil from "lodash/fp/isNil";
import {
  TextStyle,
  Divya,
  Button,
  InsetWind,
  Input,
  ButtonContainer,
  Image,
} from "./UserPaneStyles.js";
import ClockLoader from "react-spinners/GridLoader";
import Tada from "react-reveal/Tada";
import { toast, cssTransition, ToastContainer } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import UserInfo from "../UserInfo/UserInfo";
import ReactTooltip from "react-tooltip";

const Show = cssTransition({
  enter: "showMe",
  exit: "showNo",
  duration: 800,
});
const override = css`
  display: block;
  margin: 5px auto;
`;
class UserPane extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = {
      showRegister: false,
      showUser:
        typeof this.props.serverStatus === "object" &&
        typeof this.props.serverStatus !== undefined
          ? true
          : false,
    };
    this.toggleSign = this.toggleSign.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }
  componentDidUpdate(prevProps, prevState) {
    let { serverStatus } = this.props;
    if (prevProps.serverStatus !== serverStatus) {
      if (typeof serverStatus === "object" && serverStatus !== undefined) {
        this.setState({ showUser: true });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }
  handleKeyUp(e) {
    const { showUserInfo } = this.props;
    const keys = {
      27: () => {
        showUserInfo();
        e.preventDefault();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  toggleSign() {
    this.setState({ showRegister: !this.state.showRegister });
  }

  render() {
    const {
      colorPal,
      showUserInfo,
      doSignIn,
      doRegister,
      serverStatus,
      doLogout,
    } = this.props;

    let { textColor, borderColor, bgColor, bgMuted } = colorPal;
    let { showRegister, showUser } = this.state;
    return (
      <Divya>
        <InsetWind
          color={bgMuted}
          borderColor={borderColor}
          ref={(node) => (this.userinfo = node)}
        >
          {!showUser ? (
            showRegister ? (
              <div>
                <TextStyle color={textColor} large>
                  Register on t'martyr
                </TextStyle>
                <TextStyle color={textColor}>
                  If you already have an account, click the sign in button
                  below.
                </TextStyle>
              </div>
            ) : (
              <div>
                <TextStyle color={textColor} large>
                  Sign in to an existing account
                </TextStyle>
                <TextStyle color={textColor}>
                  Welcome back, log in below. <br />
                  If you don't have an account, click the new user button to
                  register below.
                </TextStyle>
              </div>
            )
          ) : (
            <div>
              <Button
                type="button"
                small
                onClick={() => {
                  this.setState({ showUser: false });
                  doLogout();
                }}
                data-tip={"Logout of tmarty'r"}
                data-place="left"
                data-delay-show="250"
                data-text-color={textColor}
                data-background-color={bgColor}
                color={textColor}
                effect="solid"
              >
                <ReactTooltip />
                <FontAwesomeIcon
                  size="1x"
                  icon={faSignOutAlt}
                  color={textColor}
                />
              </Button>
              <Tada duration={1000}>
                <Image
                  color={textColor}
                  src={serverStatus.pic}
                  alt="your-pic"
                ></Image>
                <TextStyle
                  large
                  color={textColor}
                >{` Hello, ${serverStatus.name}!`}</TextStyle>
              </Tada>
              <TextStyle color={textColor}>
                Your preferences have been loaded. Thank you for joining us on{" "}
                {serverStatus.joined}
              </TextStyle>
              {serverStatus.nosess > 0 && (
                <UserInfo noSess={serverStatus.nosess} colorPal={colorPal} />
              )}
            </div>
          )}

          {!showUser && (
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address!";
                }
                const passwordRegex = /(?=.*[0-9])/;
                if (!values.password) {
                  errors.password = "Required field!";
                } else if (values.password.length < 4) {
                  errors.password = "Come on, make it 4 characters long.";
                } else if (!passwordRegex.test(values.password)) {
                  errors.password = "Try adding a number atleast, will you?";
                }
                if (showRegister && !values.name) {
                  errors.name = "Required";
                }
                if (
                  showRegister &&
                  values.password !== values.confirmPassword
                ) {
                  errors.confirmPassword = "Passwords must match ya fool.";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                showRegister
                  ? doRegister(JSON.stringify(values, null, 3))
                  : doSignIn(JSON.stringify(values, null, 2));
                setTimeout(() => {
                  setSubmitting(false);
                }, 2000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  // onClick=
                >
                  {showRegister ? (
                    <Input
                      type="text"
                      placeholder="Name"
                      color={bgMuted}
                      textColor={textColor}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      name="name"
                    />
                  ) : (
                    <div />
                  )}
                  {errors.name && touched.name && (
                    <TextStyle color={textColor}>{errors.name}</TextStyle>
                  )}
                  <Input
                    color={bgMuted}
                    textColor={textColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    className={errors.email && touched.email && "error"}
                  />
                  {errors.email && touched.email && (
                    <TextStyle color={textColor}>{errors.email}</TextStyle>
                  )}
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    color={bgMuted}
                    textColor={textColor}
                    required
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <TextStyle color={textColor}>{errors.password}</TextStyle>
                  )}{" "}
                  {showRegister ? (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      color={bgMuted}
                      textColor={textColor}
                      required
                      className={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        "error"
                      }
                    />
                  ) : (
                    <div />
                  )}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <TextStyle color={textColor}>
                      {errors.confirmPassword}
                    </TextStyle>
                  )}{" "}
                  <ButtonContainer>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-tip={"Submit"}
                      data-place="left"
                      data-delay-show="250"
                      data-text-color={textColor}
                      data-background-color={bgColor}
                      color={textColor}
                      effect="solid"
                    >
                      <ReactTooltip />
                      <FontAwesomeIcon
                        size="2x"
                        icon={showRegister ? faCheckCircle : faSignInAlt}
                        color={textColor}
                      />
                    </Button>
                    <Button
                      type="button"
                      onClick={this.toggleSign}
                      data-tip={
                        !showRegister
                          ? "Register on t'martyr"
                          : "Sign in to an existing account"
                      }
                      data-place="left"
                      data-delay-show="250"
                      data-text-color={textColor}
                      data-background-color={bgColor}
                      color={textColor}
                      effect="solid"
                    >
                      <ReactTooltip />
                      <FontAwesomeIcon
                        size="2x"
                        icon={showRegister ? faSignInAlt : faUserPlus}
                        color={textColor}
                      />
                    </Button>
                  </ButtonContainer>
                  <ClockLoader
                    css={override}
                    size={5}
                    color={textColor}
                    loading={isSubmitting && !showUser}
                  />
                  <TextStyle color={textColor}>
                    {serverStatus !== undefined ? `${serverStatus}` : ""}
                  </TextStyle>
                </form>
              )}
            </Formik>
          )}
        </InsetWind>
        <Button onClick={showUserInfo}>
          <FontAwesomeIcon size="2x" icon={faTimesCircle} color={textColor} />
        </Button>
      </Divya>
    );
  }
}

export default UserPane;
