import styled from "@emotion/styled";

/** @jsx jsx */
import { css, keyframes, jsx } from "@emotion/core";
export const dynamicStyle = (props) =>
  css`
    ${props.color};
  `;
export const dynamicTextColor = (props) =>
  css`
    ${props.textColor};
  `;
export const TimerWrapper = styled.div`
  min-width: 25vmax;
  max-height: 40vmax;
  background-color: ${dynamicStyle};
  border-radius: 6px;
  flex: 0.7;
  display: flex;
  flex-flow: column wrap;
  padding: 20px 0px 10px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  align-self: flex-start;
  justify-self: flex-end;
  @media only screen and (max-width: 768px) {
    min-height: 25vmax;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row wrap;
  text-align: left;
  justify-content: flex-start;
  line-height: 3vmax;
  .svg-inline--fa {
    line-height: inherit;
    height: initial;
    opacity: 0.6;
    margin-right: 15px;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  @media only screen and (max-width: 768px) {
    line-height: 5vmax;
    .svg-inline--fa {
      margin-right: 5px;
      font-size: 2vmax;
    }
  }
`;
export const blnk182 = keyframes`
      0%{     color: ${dynamicStyle};    }
      49%{    color: ${dynamicStyle} ; }
      60%{    color: transparent; }
      99%{    color:transparent;  }
      100%{   color: ${dynamicStyle} ;    }
  `;

export const TimeStyle = styled.div`
  color: ${dynamicStyle};
  margin: 0 5px;
  padding: 2px 1px;
  font-size: ${(props) => (props.large ? "8vmax" : "2vmax")};
  font-family: ${(props) =>
    props.large ? "'Abril Fatface', cursive" : "'Playfair Display', monospace"};
  background: none;
  outline: none;
  letter-spacing: 0.2px;
  border: none;
  opacity: ${(props) => (props.large ? "0.7" : "1")};

  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "8vmax" : "2vmax")};
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0
  }

  100% {
    opacity: 0.75
  }
`;
export const Button = styled.button`
  align-self: flex-end;
  line-height: inherit;
  margin-top: -6px;
  background: none;
  outline: none;
  border: none;
  flex: 0.2;
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
export const Input = styled.input`
  animation: ${fadeIn} 0.25s ease-in;
  background-color: ${(props) => props.color};
  font-style: normal;
  font-weight: normal;
  font-size: ${(props) => (props.large ? "2vmax" : "1.2vmax")};
  max-width: 21vmax;
  margin: 5px 0 2vmax 5px;
  color: ${(props) => props.textColor};
  outline: 0;
  border: 0;
  border-bottom: solid 2px ${(props) => props.textColor};
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => props.textColor};
    opacity: 0.6;
  }
  @media only screen and (max-width: 768px) {
    max-width: inherit;
  }
`;
export const ListView = styled.ul`
  padding: 0;
  margin: 0;
`;
export const NoteContainer = styled.div`
  color: ${dynamicStyle};
  max-height: 20vmax;
  margin: 0 5px;
  padding: 2px 1px;
  font-size: ${(props) => (props.large ? "8vmax" : "2vmax")};
  font-family: ${(props) =>
    props.large ? "'Abril Fatface', cursive" : "'Playfair Display', monospace"};
  background: none;
  outline: none;
  letter-spacing: 0.2px;
  border: none;
  opacity: ${(props) => (props.large ? "0.7" : "1")};

  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.large ? "8vmax" : "2vmax")};
    max-height: 40vmax;
  }
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px ${(props) => props.bgColor};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;
export const ListItem = styled.li`
  color: ${dynamicStyle};
  opacity: 1;
  animation: ${fadeIn} 0.25s ease-in;
  max-width: inherit;
  position: relative;

  overflow-wrap: break-word;
  flex: 1.2;
  /* border-bottom: solid 0.2px ${(props) => props.textColor}; */
  text-transform: none;
  word-wrap: break-word;
  list-style: none;
  padding: 10px;
  margin: 0;
  text-align: left;
  font-size: 2.2vmax;
  @media only screen and (max-width: 768px) {
    font-size: 3.1vmax;
  }
  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
export const SubListItem = styled.li`
  color: ${dynamicStyle};
  opacity: 0.8;
  animation: ${fadeIn} 0.25s ease-in;
  max-width: inherit;
  position: relative;
  overflow-wrap: break-word;
  flex: 0.7;
  text-transform: none;
  word-wrap: break-word;
  font-size: 1.8vmax;
  list-style: none;
  padding: 0;
  margin-left: 5px;
  text-align: left;
  line-height: initial;
    font-style: italic;

}
  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
