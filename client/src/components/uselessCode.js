fetchPictures(sessLen, brkLen) {
    let imageReq;
    let collectionArray = {
      1301408: 79,
      865018: 39,
      3330448: 79,
      1301453: 30,
      1155333: 52,
      791207: 19,
      327760: 55,
      3672442: 72,
    };
    let c1page = Math.floor(Math.random() * (79 - 1) + 1);
    let c2page = Math.floor(Math.random() * (39 - 1) + 1)
    this.fetchPictureSet(1155333, c1page, imageReq, "url1", "urlAuth1")
    this.fetchPictureSet(1301453, c2page, imageReq, "url2", "urlAuth2")
    let cumTime = sessLen + brkLen;
    if (cumTime >= 45 && cumTime <= 60) {
      imageReq = 25;
      let c1page = Math.floor(Math.random() * (79 - 1) + 1);
      let c2page = Math.floor(Math.random() * (39 - 1) + 1); // Total = 120
      this.fetchPictureSet(1301408, c1page, imageReq, "url1", "urlAuth1"); //Nature 2
      this.fetchPictureSet(865018, c2page, imageReq, "url2", "urlAuth2"); // Sea 2
      console.log("pages as", `${c2page} ${c1page}, ${imageReq}`);
    } else if (cumTime >= 30 && cumTime < 45) {
      imageReq = 20;
      let c1page = Math.floor(Math.random() * (79 - 1) + 1);
      let c2page = Math.floor(Math.random() * (30 - 1) + 1); // Total=109
      this.fetchPictureSet(3330448, c1page, imageReq, "url1", "urlAuth1"); // Nature 3
      this.fetchPictureSet(1301453, c2page, imageReq, "url2", "urlAuth2"); // Sea 3
      console.log("pages as", `${c2page} ${c1page}, ${imageReq}`);
    } else if (cumTime < 30 && cumTime >= 15) {
      imageReq = 15;
      let c1page = Math.floor(Math.random() * (52 - 1) + 1);
      let c2page = Math.floor(Math.random() * (19 - 1) + 1); // Total = 71
      this.fetchPictureSet(1155333, c1page, imageReq, "url1", "urlAuth1"); // Nature 4
      this.fetchPictureSet(791207, c2page, imageReq, "url2", "urlAuth2"); // Sea 4
      console.log("pages as", `${c2page} ${c1page}, ${imageReq}`);
    } else {
      imageReq = 30;
      let c1page = Math.floor(Math.random() * (55 - 1) + 1);
      let c2page = Math.floor(Math.random() * (72 - 1) + 1); // Total = 120
      this.fetchPictureSet(327760, c1page, imageReq, "url1", "urlAuth1"); // Nature 1
      this.fetchPictureSet(3672442, c2page, imageReq, "url2", "urlAuth2"); // Sea 1
      console.log("pages as", `${c2page} ${c1page}, ${imageReq}`);
    }
  }
  
  fetchPictureSet(id, pageNo, imageReq, urlID, urlAuth) {
    return;
    unsplash.photos
      .getRandomPhoto({ count: 100,collections: }
      .then(toJson)
      .then(
        (json) => {
          console.log(json)
          let urlArray = {};
          let userArray = {};
          let j = 0;
          let k = 0;
          json.forEach((element) => {
            urlArray[j++] = element.urls.raw;
            userArray[k++] = {
              name: element.user.username,
              link: element.user.links.html,
            };
          });

          this.setState({
            urlRaw: json,
            [urlID]: urlArray,
            [urlAuth]: userArray,
            errorP: false,
          });
        },

        (error) => {
          this.setState({
            isLoading: false,
            errorP: true,
          });
        }
      );
  }
   let { errorP, url1, url2, urlAuth1, urlAuth2 } = this.state;
    if (
      errorP ||
      url1 === "none" ||
      url2 === "none" ||
      urlAuth1 === "none" ||
      urlAuth2 === "none"
    )
      return;
    if (args === 1) {
      let { url1, url2, urlAuth1, urlAuth2 } = this.state;
      let pID;
      let turnOf = Math.random();
      if (turnOf < 0.5) {
        pID = Math.floor(Math.random() * Math.floor(Object.keys(url1).length));
        this.setState({
          isLoading: false,
          urlPic: url1[pID],
          urlAuth: urlAuth1[pID],
          errorP: false,
        });
      } else {
        pID = Math.floor(Math.random() * Math.floor(Object.keys(url2).length));
        this.setState({
          isLoading: false,
          urlPic: url2[pID],
          urlAuth: urlAuth2[pID],
          errorP: false,
        });
      }
    } else {
      this.setState({
        urlPic: "false",
      });
    }

      if (prevState.currSess !== work && this.state.currSess === work) {
      console.log("update");
      this.fetchPictures(sessLen, brkLen);
    }












      if (
        (currTime < 0.0015 && currSess !== init && currSess !== over) ||
        (currSess === work && currTime === sessLen + brkLen)
      ) {
        setTime((brkLen + sessLen) * 60000);
        if (currSess !== brk) {
          stop();
          return {
            currSess: init,
          };
        } else {
          pause();
          const customId = "custom-id-yes";
          toast.info(
            <TextStyle>
              {" "}
              <FontAwesomeIcon icon={faInfoCircle} size={"1x"} /> Good work!
              Session {noSess + 1} over.{" "}
            </TextStyle>,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: false,
              transition: Show,
              delay: 0,
              hideProgressBar: false,
              toastId: customId,
            }
          );
          return {
            currSess: over,
            noSess: noSess + 1,
          };
        }
      } else if (
        currTime < brkLen &&
        currSess === work &&
        currSess !== brk &&
        currSess !== over
      ) {
        pause();
        setTime(brkLen * 60000);
        return {
          currSess: brk,
        };
      } else if (
        currSess === init &&
        currSess !== work &&
        sessLen > currTime - brkLen &&
        currSess !== over
      ) {
        return {
          currSess: work,
        };
      }