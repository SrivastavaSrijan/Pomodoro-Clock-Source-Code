import styled from "@emotion/styled";
import { css } from "@emotion/core";
export const dynamicStyle = (props) =>
  css`
    ${props.color};
  `;
export const TimeStyle = styled.button`
  ${dynamicStyle}
  margin: 5px 5px;
  padding: 5px;
  font-size: 1.2vmax;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  @media only screen and (max-width: 768px) {
    margin: 2px 10px;
    .fa-2x {
      font-size: 4vmax;
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
  text-transform: lowercase;
  margin: -2px 2px;
  a {
    text-decoration: underline ${dynamicStyle};
    color: inherit;
    font-size: inherit;
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "4vmax" : "2vmax")};
  }
`;
export const TimerAdjust = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  flex: 0.6;
  div:nth-of-type(1) {
    border-bottom: 2px solid ${(props) => props.borderColor};
  }
  @media only screen and (max-width: 768px) {
    flex: 1;
    margin: 5px;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
