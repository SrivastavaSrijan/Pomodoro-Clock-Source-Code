import styled from "@emotion/styled";
import { css } from "@emotion/core";
export const dynamicStyle = (props) => css`
  ${props.color};
`;
export const HeaderStyle = styled.header`
  text-align: center;
  font-family: "Playfair Display", cursive;
  letter-spacing: 0.15em;
  background-color: ${dynamicStyle};
  max-height: 2vmax;
  padding: 10px 5px 5px 5px;
  color: white;
  display: flex;
  flex-flow: row nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  @media only screen and (max-width: 768px) {
    max-height: 5vmax;
    padding: 10px 10px 5px 10px;
  }
`;
export const HeadingStyle = styled.h1`
  transition: all 0.5s linear;
  text-align: center;
  text-transform: none;
  font-size: 2vmax;
  letter-spacing: -2px;
  align-self: center;
  justify-self: center;
  color: ${dynamicStyle};
  font-family: "Abril Fatface", cursive;
  opacity: 0.8;
  text-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  @media only screen and (max-width: 768px) {
    font-size: 4vmax;
  }
`;
export const Logo = styled.img`
  transition: all 0.5s linear;

  height: 2vmax;
  width: 2vmax;
  align-self: center;
  justify-content: center;
  margin: 2px 5px 2px 0px;
  filter: ${(props) => (!props.color ? "hue-rotate(70deg)" : "none")};
  @media only screen and (max-width: 768px) {
    height: 3.5vmax;
    width: 3.5vmax;
    margin: 2px 5px 6px 0px;
  }
`;
export const ToggleContainer = styled.div`
  padding: 5px;
  font-size: 1.2vmax;
  margin-left: auto;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.button`
  margin: 2px 7px;
  padding: 5px;
  opacity: 0.6;
  font-size: 1vmax;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: opacity 0.5s;
    opacity: 1;
  }
  @media only screen and (max-width: 768px) {
    margin: 2px 10px;
    .fa-2x {
      font-size: 4vmax;
    }
  }
`;
export const HeaderImg = styled.img`
  border-radius: 50%;
  overflow: hidden;
  max-width: 1.8vmax;
  padding: 0.4vmax;
  background: ${(props) => props.color};
  @media only screen and (max-width: 768px) {
    max-width: 2.2vmax;
    padding: 0.8vmax;
  }
`;
