import styled from "@emotion/styled";

/** @jsx jsx */
import { css, keyframes, jsx } from "@emotion/core";
export const dynamicStyle = (props) =>
  css`
    ${props.color};
  `;
const fadeIn = keyframes`
  0% {
    opacity: 0
  }

  100% {
    opacity: 0.75
  }
`;
export const TimerWrapper = styled.div`
  min-width: 25vmax;
  background-color: ${dynamicStyle};
  border-radius: 6px;
  display: flex;
  flex: 0.7;
  flex-flow: column wrap;
  padding: 20px 10px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row wrap;
  text-align: center;
  justify-content: center;
`;
export const blnk182 = keyframes`
      0%{     color: ${dynamicStyle};    }
      49%{    color: ${dynamicStyle} ; }
      60%{    color: transparent; }
      99%{    color:transparent;  }
      100%{   color: ${dynamicStyle} ;    }
  `;
export const blinkText = css`
  animation: ${blnk182} 1s infinite;
`;
export const dontBlink = css`
  animation: none;
`;
export const TimeStyle = styled.div`
  animation: ${fadeIn} 0.25s ease-in;

  color: ${dynamicStyle};
  text-transform: lowercase;
  margin: 0 5px;
  padding: 2px 1px;
  font-size: ${(props) => (props.large ? "8vmax" : "2vmax")};
  font-family: ${(props) =>
    props.large ? "'Abril Fatface', cursive" : "'Playfair Display', monospace"};
  vertical-align: inherit;
  background: none;
  outline: none;
  letter-spacing: 0.2px;
  border: none;
  opacity: ${(props) => (props.large ? "1.0" : "0.7")};

  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "12vmax" : "2vmax")};
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  color: #000;
  margin-top: -6px;
  background: none;
  outline: none;
  border: none;

  cursor: pointer;
  animation: ${fadeIn} 0.25s ease-in;
  .fa-2x {
    opacity: 0.75;
    /*; */
    &:active {
    }

    &:hover,
    &:focus {
      animation: anim-glow linear 0.25s;
      animation-fill-mode: forwards;
      @keyframes anim-glow {
        0% {
          filter: drop-shadow(0 0 rgba(#61ef61, 1));
        }

        100% {
          opacity: 1;
          filter: drop-shadow(0 0 1rem #000000);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .fa-1x {
      font-size: 2vmax;
    }
  }
`;
export const ButtonWrapperHead = styled.div`
  display: flex;
  flex-direction: row wrap;
  justify-content: flex-end;
`;
