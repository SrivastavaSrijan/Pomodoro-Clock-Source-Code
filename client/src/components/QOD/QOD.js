import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { InsetWind, TextStyle } from "./QODStyles";

const QOD = (props) => {
  const { qod, author, colorPal } = props;
  let { textColor, borderColor, bgColor, bgMuted } = colorPal;

  return (
    <InsetWind color={bgMuted} borderColor={borderColor}>
      <TextStyle color={textColor}>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          color={textColor}
          size="2x"
          transform="left-4"
          style={{ opacity: "0.8" }}
        />
        {qod}
      </TextStyle>
      <TextStyle large color={textColor}>
        {author}
      </TextStyle>
    </InsetWind>
  );
};
export default QOD;
