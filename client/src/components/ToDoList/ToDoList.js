import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "react-compound-timer";
import {
  faPlusCircle,
  faCheckCircle,
  faTrash,
  faCircle,
  faArrowsAlt,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import {
  TimerWrapper,
  TimeStyle,
  ButtonContainer,
  Button,
  Input,
  ListView,
  ListItem,
  SubListItem,
  NoteContainer,
} from "./ToDoStyles";
import Fade from "react-reveal/Fade";
import TransitionGroup from "react-transition-group/TransitionGroup";

class ToDoList extends Component {
  componentDidMount() {
    this.groupProps = {
      appear: false,
      enter: false,
      exit: true,
    };
    this.input.addEventListener("keypress", (keyPressed) => {
      const keyEnter = 13;
      if (keyPressed.keyCode === keyEnter) {
        this.props.addTasks(this.input.value);
        this.input.value = "";
      }
    });
    this.props.performUpdates();
  }
  componentWillUnmount() {
    console.log("Syncing stopped");
    clearInterval(this.intervalID);
  }

  render() {
    const {
      addTasks,
      tasks,
      colorPal,
      removeTask,
      markTask,
      addSubTask,
      performUpdates,
    } = this.props;

    let { textColor, borderColor, bgColor, bgMuted } = colorPal;

    return (
      <div>
        <Input
          ref={(node) => {
            this.input = node;
          }}
          type="text"
          placeholder="What plans today?"
          large
          color={bgMuted}
          textColor={textColor}
        />
        <Button
          onClick={() => {
            addTasks(this.input.value);
            this.input.value = "";
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} color={textColor} />
        </Button>
        <Button onClick={performUpdates}>
          <FontAwesomeIcon icon={faSync} color={textColor} />
        </Button>
        <NoteContainer bgColor={bgColor} color={textColor}>
          <ListView>
            <TransitionGroup {...this.groupProps}>
              {tasks.map((val) => (
                <Fade key={val.id} collapse top duration={250} cascade>
                  <ButtonContainer color={textColor}>
                    <FontAwesomeIcon
                      icon={val.flag ? faCheckCircle : faCircle}
                      color={textColor}
                      size="1x"
                      transform="shrink-2 left-2 down-4"
                      onClick={() => markTask(val.id)}
                    />
                    <ListItem key={val.id} color={textColor}>
                      {val.flag ? (
                        <span
                          style={{
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                          }}
                        >
                          {val.main}
                        </span>
                      ) : (
                        val.main
                      )}
                    </ListItem>

                    <FontAwesomeIcon
                      icon={faTrash}
                      color={textColor}
                      transform="shrink-1"
                      size="1x"
                      onClick={() => removeTask(val.id)}
                    />
                  </ButtonContainer>
                </Fade>
              ))}
            </TransitionGroup>
          </ListView>
        </NoteContainer>
      </div>
    );
  }
}
export default ToDoList;
