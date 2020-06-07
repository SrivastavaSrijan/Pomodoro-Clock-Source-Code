import React, { Component } from "react";
import TimerLengthComp from "../Settings/TimerLength/TimerLengthComp";
import TimerComp from "../Timer/Timer";
import { Global } from "@emotion/core";
import Header from "../Header/header";
import Settings from "../Settings/Settings";
import AboutPane from "../AboutPane/AboutPane";
import QOD from "../QOD/QOD";
import UserPane from "../UserInfo/UserPane";
import Unsplash, { toJson } from "unsplash-js";
import { toast, cssTransition, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../../styles/styles.css";
import { imageBG, colorBG, Content, Wrapper } from "./AppStyles.js";
import { TextStyle } from "../Settings/TimerLength/TimerLengthStyles";
import { css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimerWrapper, ButtonWrapperHead, Button } from "../Timer/TimerStyles";
import {
  faInfoCircle,
  faTasks,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";
import ClockLoader from "react-spinners/GridLoader";
import Confetti from "react-confetti";

require("es6-promise").polyfill();
require("isomorphic-fetch");
const unsplash = new Unsplash({
  accessKey: "YVL2f8WFV8VyM_htL_6t9IadGgTufVB6WgATOiA72jE",
  secret: "Xuu050bRNlvoWprHBovv1zjWJOsY5txLMmXOD9T2y1U",
});
const init = "init";
const brk = "brk";
const work = "work";
const over = "over";
const Show = cssTransition({
  enter: "showMe",
  exit: "showNo",
  duration: 800,
});
const override = css`
  display: block;
  margin: 5px auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessLen: parseInt(localStorage.getItem("sessLen")) || 25,
      brkLen: parseInt(localStorage.getItem("brkLen")) || 5,
      currSess: init,
      color: localStorage.getItem("color")
        ? localStorage.getItem("color") === "true"
          ? true
          : false
        : true,
      showSettings: false,
      showAbout: false,
      showUserInfo: false,
      showToDo: false,
      noSess: 0,
      tasks: [],
      isLoading: true,
      urlPic: "none",
      urlAuth: "none",
      urlRaw: "none",
      errorP: false,
      qod: "none",
      author: "none",
      isLoadingQuote: true,
      qData: null,
      errorQ: false,
      isDisconnected: false,
      serverStatus: "",
      accessToken: localStorage.getItem("accessToken") || "",
    };
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.handler = this.handler.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.changeQuote = this.changeQuote.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.showToDo = this.showToDo.bind(this);
    this.addTasks = this.addTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.markTask = this.markTask.bind(this);
    this.doSignIn = this.doSignIn.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.performUpdates = this.performUpdates.bind(this);
  }
  componentDidMount() {
    this.fetchQuote();
    console.log("Mounted");
    this.fetchPictures();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
    const customId2 = "custom-id-offline";
    if (this.state.isDisconnected) {
      toast.info(
        <TextStyle>
          {" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />
          {`You've lost connectivity. t'martyr will continue to run, but without
          background images. Your preferences will be synced after you go online.`}{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 30000,
          transition: Show,
          delay: 1000,
          hideProgressBar: true,
          toastId: customId2,
        }
      );
    } else {
      this.performUpdates();
    }

    setTimeout(() => {
      this.userHistory();
    }, 3500);
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      urlPic,
      sessLen,
      brkLen,
      isDisconnected,
      noSess,
      tasks,
      serverStatus,
      accessToken,
    } = this.state;
    const customId = "custom-id-offline";
    if (!prevState.isDisconnected && isDisconnected) {
      toast.info(
        <TextStyle>
          {" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />
          {`You've lost connectivity. t'martyr will continue to run, but without
          background images.`}{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 30000,
          transition: Show,
          delay: 1000,
          hideProgressBar: true,
          toastId: customId,
        }
      );
    }
    if (prevState.isDisconnected && !isDisconnected) {
      this.performUpdates();
      const customIdOnline = "custom-id-online";
      toast.info(
        <TextStyle>
          {" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />
          {`You're back online! If you're logged in, we'll sync your data from your account.`}{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 30000,
          transition: Show,
          delay: 1000,
          hideProgressBar: true,
          toastId: customIdOnline,
        }
      );
      this.performUpdates();
    }
    if (prevState.sessLen !== sessLen || prevState.brkLen !== brkLen) {
      localStorage.setItem("sessLen", sessLen);
      localStorage.setItem("brkLen", brkLen);
      this.setState({
        currSess: init,
      });
    }
    if (prevState.accessToken !== accessToken) {
      this.performUpdates();
    }
  }
  performUpdates() {
    const { accessToken } = this.state;
    if (
      accessToken !== "" &&
      accessToken !== undefined &&
      accessToken !== null
    ) {
      console.log("Synced up from the server.");
      fetch("https://pomodoroclockbackend.herokuapp.com/authUser", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + this.state.accessToken,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((dataUser) => {
          this.setState({
            serverStatus: dataUser.hello,
            tasks: dataUser.hello.tasks,
            noSess: parseInt(dataUser.hello.nosess),
          });
        })
        .catch((err) => this.setState({ serverStatus: err.toString() }));
    }
  }
  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => this.setState({ isDisconnected: true }));
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  };
  userHistory() {
    const { serverStatus } = this.state;
    const customId = "custom-id-yes";
    if (localStorage.length <= 1 && serverStatus === "") {
      toast.info(
        <TextStyle>
          {" "}
          Welcome to t'martyr! Since you're new around here, we recommend
          clicking on the{" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />{" "}
          button to get started.{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false, //15000,
          transition: Show,
          toastId: customId,
          delay: 2000,
          hideProgressBar: false,
        }
      );
    } else if (serverStatus !== "") {
      toast.info(
        <TextStyle>
          {" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />
          {`Welcome back, ${serverStatus.name} ! Your preferences are being synced .`}{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 30000,
          transition: Show,
          toastId: customId,
          delay: 1000,
          hideProgressBar: true,
        }
      );
    } else if (localStorage.length >= 1 && serverStatus === "") {
      toast.info(
        <TextStyle>
          {" "}
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={"1x"}
            transform="shrink-6"
          />
          {`Welcome back! If you want to save your notes, please log in.`}{" "}
        </TextStyle>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 30000,
          transition: Show,
          toastId: customId,
          delay: 1000,
          hideProgressBar: true,
        }
      );
    }
  }
  updateColor(color) {
    let colorPal;
    if (!color) {
      colorPal = {
        initCol: {
          textColor: "#BB86FC",
          borderColor: "#121212",
          bgColor: "#121212",
          bgMuted: "#333333",
          bgLinear: `rgba(18,18,18,0.3)`,
        },
        workCol: {
          textColor: "#6200EE",
          borderColor: "#121212",
          bgColor: "#121212",
          bgMuted: "#333333",
          bgLinear: `rgba(18,18,18,0.3)`,
        },
        brkCol: {
          textColor: "#03DAC5",
          borderColor: "#121212",
          bgColor: "#121212",
          bgMuted: "#333333",
          bgLinear: `rgba(18,18,18,0.3)`,
        },
        overCol: {
          textColor: "#CF6679",
          borderColor: "#FF0266",
          bgColor: "#251A1C",
          bgMuted: "#333333",
          bgLinear: `rgba(37,26,28,0.3)`,
        },
      };
    } else {
      colorPal = {
        initCol: {
          textColor: "#FFF",
          borderColor: "#F05B56",
          bgColor: "#F05B56",
          bgMuted: "#F26C67",
          bgLinear: `rgba(207,102,121,0.3)`,
        },
        workCol: {
          textColor: "#FFF",
          borderColor: "#F05B56",
          bgColor: "#FF4A77",
          bgMuted: "#CF6679",
          bgLinear: `rgba(207,102,121,0.3)`,
        },
        brkCol: {
          textColor: "#333333",
          borderColor: "#3E7476",
          bgColor: "#6ED4BF",
          bgMuted: "#8CD1C3",
          bgLinear: `rgba(110,212,191,0.3)`,
        },
        overCol: {
          textColor: "#424242",
          borderColor: "#00A97F",
          bgColor: "#15D6A6",
          bgMuted: "#00D09C",
          bgLinear: `rgba(21,214,166,0.3)`,
        },
      };
    }
    let { currSess } = this.state;
    return currSess === work
      ? colorPal.workCol
      : currSess === brk
      ? colorPal.brkCol
      : currSess === over
      ? colorPal.overCol
      : colorPal.initCol;
  }
  fetchPictures() {
    // const cachedHitsPhotos = localStorage.getItem("urlRaw");
    // if (cachedHitsPhotos) {
    //   this.setState({
    //     urlRaw: JSON.parse(cachedHitsPhotos),
    //     errorP: false,
    //   });
    // } else {
    unsplash.photos
      .getRandomPhoto({
        count: 30,
        collections: [
          1301408,
          865018,
          3330448,
          1301453,
          1155333,
          791207,
          327760,
          3672442,
        ],
      })
      .then(toJson)

      .then(
        (json) => {
          this.setState({
            urlRaw: json,
            errorP: false,
          });
        },
        (error) => {
          this.setState({
            errorP: true,
          });
        }
      );
    //}
  }
  changePicture(args) {
    let { errorP, urlRaw } = this.state;
    if (errorP || urlRaw === "none") return;
    let rID = Math.floor(
      Math.random() * Math.floor(Object.keys(urlRaw).length)
    );
    let urlPicFetch = urlRaw[rID].urls.raw;
    let urlAuthFetch = [
      urlRaw[rID].user.first_name + " " + urlRaw[rID].user.last_name,
      urlRaw[rID].user.links.html,
    ];
    this.setState({
      urlPic: urlPicFetch,
      urlAuth: urlAuthFetch,
      isLoading: true,
    });
  }
  fetchQuote() {
    const cachedHits = localStorage.getItem("qData");
    if (cachedHits) {
      this.setState({
        qData: JSON.parse(cachedHits),
        errorQ: false,
      });
    } else {
      fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then(
          (result) => {
            localStorage.setItem("qData", JSON.stringify(result));
            this.setState({
              qData: result,
              errorQ: false,
            });
          },
          (error) => {
            this.setState({
              errorQ: true,
            });
          }
        );
    }
  }
  changeQuote(args) {
    if (this.state.errorQ) return;
    if (args === 1) {
      let result = this.state.qData;
      let rID = Math.floor(Math.random() * Math.floor(result.length));
      let qod = result[rID].text;
      let author = result[rID].author;
      if (author === null) {
        author = "Unknown";
      }
      this.setState({
        isLoadingQuote: false,
        qod: qod,
        author: author,
      });
    } else {
      this.setState({
        isLoadingQuote: false,
        qod: "false",
        author: "false",
      });
    }
  }
  showSettings() {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  }
  showUserInfo() {
    this.setState({
      showUserInfo: !this.state.showUserInfo,
    });
  }
  showAbout() {
    this.setState({
      showAbout: !this.state.showAbout,
    });
  }
  showToDo() {
    this.setState({
      showToDo: !this.state.showToDo,
    });
  }
  removeTask(id) {
    const { tasks, serverStatus } = this.state;
    let tasksNew = tasks.filter((val) => val.id !== id);
    this.pushTaskToServer(serverStatus, tasksNew);
    this.setState({
      tasks: tasksNew,
    });
  }
  markTask(id) {
    const { tasks, serverStatus } = this.state;
    tasks.forEach((val) => (val.id === id ? (val.flag = !val.flag) : val));
    this.pushTaskToServer(serverStatus, tasks);
    this.setState({
      tasks: tasks,
    });
  }
  addTasks(value) {
    if (value !== "") {
      let { tasks, accessToken, serverStatus } = this.state;
      const taskLength = tasks.length;
      tasks.push({
        id: taskLength,
        main: value,
        flag: false,
      });
      this.pushTaskToServer(serverStatus, tasks);
      this.setState({
        tasks: tasks,
      });
    }
  }
  pushSessStatustoServer(serverStatus) {
    const { isDisconnected } = this.state;
    if (!isDisconnected && serverStatus !== "") {
      fetch("https://pomodoroclockbackend.herokuapp.com/updateSess", {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + serverStatus.id,
        }),
        body: "",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }
  pushTaskToServer(serverStatus, tasks) {
    const { isDisconnected } = this.state;
    if (!isDisconnected && serverStatus !== "") {
      fetch("https://pomodoroclockbackend.herokuapp.com/updateNotes", {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + serverStatus.id,
        }),
        body: JSON.stringify(tasks),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }
  inc(paramToChange) {
    let offset = 1;
    let flag = false;
    if (paramToChange === "sessLen") {
      offset = 5;
      flag = true;
    }

    this.setState((state) => {
      let currVal = state[paramToChange];
      currVal = currVal === 0.5 ? (flag ? 10 : 5) : currVal;
      let valToChange = currVal + offset;
      if (valToChange > 60 && flag)
        return {
          [paramToChange]: 10,
        };
      else if (valToChange > 25 && !flag)
        return {
          [paramToChange]: 5,
        };
      else
        return {
          [paramToChange]: valToChange,
        };
    });
  }
  dec(paramToChange) {
    let offset = 1;
    let flag = false;
    if (paramToChange === "sessLen") {
      offset = 5;
      flag = true;
    }
    this.setState((state) => {
      let currVal = state[paramToChange];
      currVal = currVal === 0.5 ? (flag ? 10 : 5) : currVal;
      let valToChange = currVal - offset;
      if (valToChange < 10 && flag)
        return {
          [paramToChange]: 60,
        };
      else if (valToChange < 5 && !flag)
        return {
          [paramToChange]: 25,
        };
      else
        return {
          [paramToChange]: valToChange,
        };
    });
  }
  resetTimer(obj) {
    let { getTime, setTime, stop, pause } = obj;
    let time = getTime();
    this.pushSessStatustoServer(this.state.serverStatus);
    this.setState((state) => {
      let currTime = time / 60000;
      let { sessLen, brkLen, currSess } = state;
      setTime((brkLen + sessLen) * 60000);
      stop();
      console.log("reset called");

      return {
        noSess: state.noSess + 1,
        currSess: init,
      };
    });
  }
  handler(obj) {
    let { getTime, setTime, stop, pause } = obj;
    let time = getTime();
    if (time === 0) return;
    let currTime = time / 60000;
    let { sessLen, brkLen, currSess, noSess } = this.state;
    if (currSess === init && sessLen > currTime - brkLen) {
      this.setState({
        currSess: work,
      });
    } else if (currTime < 0.0015 && currSess === brk) {
      pause();
      const customId = "custom-id-yes";

      if ((this.state.noSess + 1) % 4 === 0) {
        toast.info(
          <TextStyle>
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} size={"1x"} /> Now that you've
            completed 4 sessions, we recommend you take longer break.{" "}
          </TextStyle>,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 30000,
            transition: Show,
            delay: 0,
            hideProgressBar: true,
            toastId: customId,
          }
        );
      } else {
        toast.info(
          <TextStyle>
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} size={"1x"} /> Good work!
            Session {noSess + 1} over.{" "}
          </TextStyle>,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 30000,
            transition: Show,
            delay: 0,
            hideProgressBar: true,
            toastId: customId,
          }
        );
      }
      this.setState({
        currSess: over,
      });
    } else if (currTime < brkLen && currSess === work) {
      pause();
      this.setState({
        currSess: brk,
      });
    }
  }
  changeTheme() {
    this.setState({
      color: !this.state.color,
    });
    localStorage.setItem("color", !this.state.color);
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  doSignIn(data) {
    fetch("https://pomodoroclockbackend.herokuapp.com/signIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.hasOwnProperty("accessToken")) {
          this.setState({ accessToken: "", serverStatus: data });
        } else {
          localStorage.setItem("accessToken", data.accessToken);
          this.setState({ accessToken: data.accessToken });
          fetch("https://pomodoroclockbackend.herokuapp.com/authUser", {
            method: "GET",
            headers: new Headers({
              Authorization: "Bearer " + data.accessToken,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((dataUser) => {
              this.setState({ serverStatus: dataUser.hello });
            });
        }
      })
      .catch((error) => this.setState({ serverStatus: error.toString() }));
  }
  doRegister(data) {
    fetch("https://pomodoroclockbackend.herokuapp.com/registerTo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ serverStatus: data });
      })
      .catch((error) => this.setState({ serverStatus: error.toString() }));
  }
  doLogout() {
    this.setState({
      accessToken: "",
      serverStatus: "",
    });
    localStorage.removeItem("accessToken");
  }

  render() {
    const {
      sessLen,
      brkLen,
      currSess,
      noSess,
      color,
      showSettings,
      showAbout,
      showUserInfo,
      showToDo,
      tasks,
      isLoading,
      urlPic,
      urlAuth,
      qod,
      author,
      isLoadingQuote,
      errorP,
      errorQ,
      serverStatus,
      isDisconnected,
    } = this.state;
    const colorPal = this.updateColor(color);
    let { textColor, borderColor, bgColor, bgMuted, bgLinear } = colorPal;
    let bgPal = {
      url: urlPic + `&auto=format&fit=crop&w=1350&q=80`,
      bgLinear: bgLinear,
    };
    colorPal.bgPal = bgPal;
    let showLoader = currSess !== init && isLoading && !isDisconnected;
    return (
      <div className="sweet-loading">
        <ToastContainer />
        <img
          style={{ display: "none" }}
          src={bgPal.url}
          onLoad={() =>
            setTimeout(() => {
              this.setState({ isLoading: false });
            }, 0)
          }
          alt="bg"
        />
        {currSess === over && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <Global styles={colorBG(colorPal)} />
        <Global styles={showLoader ? "none" : imageBG(colorPal)} />
        <Header
          changeTheme={this.changeTheme}
          color={color}
          colorPal={colorPal}
          showSettings={this.showSettings}
          showUserInfo={this.showUserInfo}
          pic={serverStatus !== "" ? serverStatus.pic : ""}
        />{" "}
        <Content>
          <TimerWrapper color={bgMuted} borderColor={borderColor}>
            <ButtonWrapperHead>
              <Button
                onClick={this.showAbout}
                color={textColor}
                data-tip="How do I use this app?"
                data-place="bottom"
                data-delay-show="250"
                data-text-color={textColor}
                data-background-color={bgMuted}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  color={textColor}
                  size={"1x"}
                />
              </Button>
              <Button
                onClick={this.showToDo}
                color={textColor}
                data-tip={showToDo ? "Show Clock" : "Show To-Do"}
                data-place="bottom"
                data-delay-show="250"
                data-text-color={textColor}
                data-background-color={bgMuted}
              >
                <FontAwesomeIcon
                  icon={showToDo ? faClock : faTasks}
                  color={textColor}
                  size={"1x"}
                />
              </Button>
            </ButtonWrapperHead>

            <TimerComp
              timeSetMins={sessLen}
              timeSetBreak={brkLen}
              currSess={currSess}
              handler={this.handler}
              colorPal={colorPal}
              key={sessLen + brkLen}
              changeQuote={this.changeQuote}
              changePicture={this.changePicture}
              resetTimer={this.resetTimer}
              showToDo={showToDo}
              addTasks={this.addTasks}
              removeTask={this.removeTask}
              markTask={this.markTask}
              addSubTask={this.addSubTask}
              tasks={tasks}
              serverStatus={serverStatus}
              performUpdates={this.performUpdates}
            />
          </TimerWrapper>
          {!isLoadingQuote && !errorQ && (
            <QOD
              qod={qod}
              author={author}
              isLoadingQuote={isLoadingQuote}
              colorPal={colorPal}
            />
          )}{" "}
          <ClockLoader
            css={override}
            size={25}
            color={textColor}
            loading={showLoader}
          />
        </Content>{" "}
        {showSettings && (
          <Settings
            colorPal={colorPal}
            showSettings={this.showSettings}
            clearLocalStorage={this.clearLocalStorage}
          >
            <TimerLengthComp
              len={brkLen}
              inc={this.inc}
              dec={this.dec}
              target="brkLen"
              label="Break"
              colorPal={colorPal}
            />
            <TimerLengthComp
              len={sessLen}
              inc={this.inc}
              dec={this.dec}
              target="sessLen"
              label="Work"
              colorPal={colorPal}
            />{" "}
          </Settings>
        )}{" "}
        {showAbout && (
          <AboutPane
            colorPal={colorPal}
            showAbout={this.showAbout}
            urlAuth={urlAuth}
          />
        )}{" "}
        {showUserInfo && (
          <UserPane
            colorPal={colorPal}
            showUserInfo={this.showUserInfo}
            doSignIn={this.doSignIn}
            doRegister={this.doRegister}
            serverStatus={serverStatus}
            doLogout={this.doLogout}
          />
        )}{" "}
      </div>
    );
  }
}

export default App;
