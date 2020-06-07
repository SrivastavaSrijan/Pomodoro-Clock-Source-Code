import styled from "@emotion/styled";
import { css } from "@emotion/core";
export const dynamicStyle = (props) =>
  css`
    ${props.color};
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
  .fa-1x {
    font-size: 1.5vmax;
  }
  @media only screen and (max-width: 768px) {
    .fa-1x {
      font-size: 3vmax;
    }
  }
`;
export const InsetWind = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: ${dynamicStyle};
  border: 0.5px solid ${(props) => props.borderColor};
  margin: 5px 10px;
  max-height: 30vmax;
  min-width: 10vmax;
  border-radius: 6px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  justify-content: space-around;
  align-items: center;
  flex-basis: 50%;
  flex: 0.5;
  padding: 2px 10px;
  @media only screen and (max-width: 768px) {
    max-height: fit-content;

    flex: 1;
    .fa-1x {
      font-size: 3vmax;
    }
  }
`;
