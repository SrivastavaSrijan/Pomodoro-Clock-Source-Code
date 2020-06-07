import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import Fade from "react-reveal/Fade";

export const slideIn = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-12.5px)
	}
	to {
		opacity: 1;
		transform: translateY(0)
	}
`;
export const Content = styled.div`
  margin: 5vmin auto;
  text-align: center;
  text-transform: lowercase;
  animation: ${slideIn} 1s cubic-bezier(0.8, -0.4, 0, 1) forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const imageBG = (props) => css`
  body,
  html {
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: linear-gradient(
        120deg,
        ${props.bgPal.bgLinear},
        ${props.bgPal.bgLinear}
      ),
      url(${props.bgPal.url});
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
`;
export const colorBG = (props) => css`
  #root {
    .Toastify__toast--info {
      background: ${props.bgMuted};
    }
    .Toastify__progress-bar {
      background-color: ${props.textColor};
      filter: drop-shadow(2px 4px 6px ${props.bgColor});
    }
    .Toastify__toast-body > p {
      color: ${props.textColor};
      .fa-1x {
        color: ${props.textColor};
      }
    }
    .Toastify__close-button {
      color: ${props.textColor};
    }
  }
  body,
  html {
    background-color: ${props.bgColor};
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
