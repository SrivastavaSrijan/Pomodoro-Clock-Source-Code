import { css } from "@emotion/core";
import styled from "@emotion/styled";
export const dynamicStyle = (props) =>
  css`
    ${props.color};
  `;

export const InsetWind = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: ${dynamicStyle};
  border: 0px solid ${(props) => props.borderColor};
  margin: 5px 10px;
  max-height: 25vmax;
  max-width: 50vmax;
  border-radius: 6px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
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
  @media only screen and (max-width: 768px) {
    max-height: fit-content;
    max-width: 90%;
    padding: 10px;
    .fa-2x {
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
  font-size: ${(props) => (props.large ? "2vmax" : "1.2vmax")};
  text-transform: ${(props) => (props.large ? "lowercase" : "none")};
  margin: ${(props) => (props.large ? "-15px 45px" : "0px")};
  opacity: ${(props) => (props.large ? "0.7" : "1")};
  transition: all 0.5 s;
  }

  &::after {
    content: "";
    display: block;
    /* margin: 0 auto; */
    width: ${(props) => (props.large ? "54px" : "0px")};
    padding-top: 8px;
    border-top: 4px solid ${dynamicStyle};
    opacity: 0.6;
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "3.2vmax" : "2.7vmax")};
    margin: ${(props) => (props.large ? "-15px 25px" : "0px")};
  }
`;
