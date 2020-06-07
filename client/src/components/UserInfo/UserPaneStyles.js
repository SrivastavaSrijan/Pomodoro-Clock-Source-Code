import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
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
export const Divya = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: "9999";
  opacity: 1;
  overflow-x: hidden;
  overflow-y: auto;
  animation: show 0.5s ease;
  @keyframes show {
    0% {
      display: none;
      opacity: 0;
    }
    1% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const Button = styled.button`
  padding: 5px;
  font-size: 1.2vmax;
  background: none;
  margin: 1vmax auto;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: normal;

  .fa-2x {
    font-size: 2vmax;
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
      font-size: ${(props) => (props.small ? "2vmax" : "3vmax")};
    }
    .fa-2x {
      font-size: 4vmax;
    }
  }
`;
export const InsetWind = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: ${dynamicStyle};
  border: 0.5px solid ${(props) => props.borderColor};
  margin: 5px 10px;
  min-height: 12.5vmax;
  max-width: 15vmax;
  border-radius: 6px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  justify-content: space-around;
  align-items: center;
  padding: 5px 20px;
  @media only screen and (max-width: 768px) {
    max-height: fit-content;
    max-width: 25vmax;
    flex: 1;
    .fa-1x {
      font-size: 3vmax;
    }
  }
`;
export const TextStyle = styled.p`
  color: ${dynamicStyle};
  font-family: ${(props) =>
    props.large
      ? "'Abril Fatface', cursive;"
      : "'Playfair Display', sans-serif"};
  vertical-align: inherit;
  letter-spacing: 0.2px;
  font-size: ${(props) => (props.large ? "1.8vmax" : "1vmax")};
  text-transform: none;
  margin: 5px 5px;
  &::after {
    content: "";
    display: block;
    /* margin: 0 auto; */
    width: ${(props) => (props.large ? "inherit" : "0px")};
    padding-top: 8px;

    border-top: 4px solid ${dynamicStyle};
    opacity: 0.6;
  }
  a {
    text-decoration: underline ${dynamicStyle};
    color: inherit;
    font-size: inherit;
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "3vmax" : "1.6vmax")};
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row wrap;
  text-align: center;
  justify-content: center;
  flex: 3;
`;
export const Input = styled.input`
  animation: ${fadeIn} 0.25s ease-in;
  background-color: ${(props) => props.color};
  font-style: normal;
  font-weight: normal;
  font-size: ${(props) => (props.large ? "2vmax" : "1.2vmax")};
  max-width: 12vmax;
  margin: 5px 0 0 5px;
  max-height: 2vmax;
  flex: 0.6;
  color: ${(props) => props.textColor};
  outline: 0;
  border: 0;
  border-bottom: solid 2px ${(props) => props.textColor};
  padding: 5px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => props.textColor};
    opacity: 0.6;
  }
  @media only screen and (max-width: 768px) {
    min-width: 22.5vmax;
    font-size: ${(props) => (props.large ? "3vmax" : "2.2vmax")};
  }
`;
export const Image = styled.img`
  border-radius: 50%;
  border: solid 2px ${(props) => props.color};
  overflow: hidden;
  animation: ${fadeIn} 0.25s ease-in;
  max-width: 15vmax;
  text-align: center;
  @media only screen and (max-width: 768px) {
    max-width: 22.5vmax;
  }
`;
