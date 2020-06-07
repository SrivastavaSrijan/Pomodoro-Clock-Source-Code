import { css } from "@emotion/core";
import styled from "@emotion/styled";

const dynamicStyle = (props) =>
  css`
    ${props.color};
  `;
export const TextStyle = styled.p`
  color: ${dynamicStyle};
  font-family: ${(props) =>
    props.large
      ? "'Abril Fatface', cursive;"
      : "'Playfair Display', sans-serif"};
  /* margin: ${(props) => (props.large ? "-15px 0px" : "0")}; */
  letter-spacing: -0.2px;
  margin:5px auto;
  font-size: ${(props) => (props.large ? "2vmax" : "1.2vmax")};
  text-transform: ${(props) => (props.large ? "lowercase" : "none")};
  opacity: ${(props) => (props.large ? "1" : "0.8")};
  &:after {
    content: "";
    display: block;
    /* margin: 0 auto; */
    width: ${(props) => (props.large ? "54px" : "0px")};
    padding-top: 8px;
    border-bottom: 4px solid ${dynamicStyle};
    opacity: 0.6;
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "4vmax" : "2vmax")};
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
  outline: none;
  border: none;
  cursor: pointer;
  align-self: normal;
`;
export const InsetWind = styled.div`
  line-height: 1.5;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${dynamicStyle};
  border: 0.5px solid ${(props) => props.borderColor};
  margin: 5px 10px;
  max-height: 20vmax;
  min-width: 15vmax;
  border-radius: 6px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  justify-content: space-around;
  align-items: center;
  flex-basis: 100%;
  flex: 1;
  padding: 15px 20px;
  @media only screen and (max-width: 768px) {
    max-height: 70vmax;
    overflow-y: scroll;
    .fa-1x {
      font-size: 3vmax;
    }
  }
`;
export const Footer = styled.footer`
  text-align: center;
  align-self: normal;
  position: relative;
  top: 20px;
  p,
  a {
    margin: 0;
  }
  color: ${dynamicStyle};
  a {
    text-decoration: underline;
    color: inherit;
  }
`;
