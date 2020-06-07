import React from "react";
import logo from "../../images/gatsby-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdjust,
  faSlidersH,
  faCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  HeaderStyle,
  Logo,
  HeadingStyle,
  Button,
  ToggleContainer,
  HeaderImg,
} from "./HeaderStyles";
import ReactTooltip from "react-tooltip";

const Header = (props) => {
  let { changeTheme, color, colorPal, showSettings, showUserInfo, pic } = props;
  let { textColor, borderColor, bgColor, bgMuted } = colorPal;
  return (
    <HeaderStyle color={bgMuted}>
      <Logo src={logo} color={color} />
      <HeadingStyle color={textColor}>t'martyr</HeadingStyle>
      <ToggleContainer>
        <Button theme={color} onClick={changeTheme}>
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon
              size="2x"
              icon={faCircle}
              color={bgColor}
              transform="shrink-2"
            />
            <FontAwesomeIcon
              size="2x"
              icon={faAdjust}
              color={textColor}
              transform="shrink-8"
            />
          </span>{" "}
        </Button>
        <Button
          theme={color}
          onClick={showSettings}
          data-tip="Show Settings Panel"
          effect="solid"
          data-place="left"
          data-delay-show="500"
          data-text-color={textColor}
          data-background-color={bgMuted}
        >
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon
              size="2x"
              icon={faCircle}
              color={bgColor}
              transform="shrink-2"
            />
            <FontAwesomeIcon
              size="2x"
              icon={faSlidersH}
              color={textColor}
              transform="shrink-8"
            />
          </span>{" "}
        </Button>
        <Button
          theme={color}
          onClick={showUserInfo}
          data-tip="Show Profile"
          effect="solid"
          data-place="left"
          data-delay-show="500"
          data-text-color={textColor}
          data-background-color={bgMuted}
        >
          {!pic ? (
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon
                size="2x"
                icon={faCircle}
                color={bgColor}
                transform="shrink-2"
              />

              <FontAwesomeIcon
                size="2x"
                icon={faUserCircle}
                color={textColor}
                transform="shrink-7"
              />
            </span>
          ) : (
            <HeaderImg color={bgColor} src={pic.replace(285, 50)}></HeaderImg>
          )}
        </Button>
      </ToggleContainer>
    </HeaderStyle>
  );
};
export default Header;
