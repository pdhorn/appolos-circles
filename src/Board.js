import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Board.css";
import Circle from "./Circle.js";
import beep from "./beep.js";
import useModal from "./useModal";
import "./Modal.css";
import { API, graphqlOperation } from "aws-amplify";
import {
  createGame,
  updateGame,
  createHighScore,
  deleteHighScore,
} from "./graphql/mutations";

const colors = [
  "gold",
  "blue",
  "green",
  // "yellow",
  "black",
  "grey",
  // "darkgreen",
  "pink",
  "brown",
  "slateblue",
  // "grey1",
  "orange",
];

const dist = (a, b) => {
  return Math.sqrt((a.cx - b.props.cx) ** 2 + (a.cy - b.props.cy) ** 2);
};

const not_transverse = (circle, otherCircles) => {
  const stroke_width = 2;
  if (otherCircles.length === 0) {
    return 1;
  }
  const dist_and_col = otherCircles.map((c) => {
    return [
      dist(circle, c) - circle.r - c.props.r,
      circle.color === c.props.color,
    ];
  });
  const valid_play = dist_and_col
    .map(([d, c]) => d >= 0)
    .every((x) => x === true);
  const local_score = dist_and_col
    .map(([d, c]) => {
      let val = 0;
      if (d >= 0 && d <= stroke_width) {
        val += 1;
        if (c) {
          val += 1;
        }
      }
      return val;
    })
    .reduce((a, b) => a + b, 0);
  if (valid_play) {
    return 1 + local_score;
  } else {
    return 0;
  }
};

const Board = () => {
  const [score, setScore] = useState(0);
  const [circX, setX] = useState(50);
  const [circY, setY] = useState(50);
  const [circR, setR] = useState(40);
  const [circColor, setColor] = useState("black");
  const [circleList, setCircleList] = useState([]);
  const [highScores, setHighScores] = useState([
    { name: "Peter", score: 10 },
    { name: "Sam", score: 5 },
  ]);
  const [scoresNeedUpdating, setScoresNeedUpdating] = useState(false);
  const [gameID, setGameID] = useState("");
  const [rulesIsShowing, rulesToggle] = useModal();
  const [scoreIsShowing, scoreToggle] = useModal();
  const inputRef = useRef();

  useEffect(() => {
    newGame();
    fetchHighScores();
  }, []);

  const newGame = () => {
    API.graphql(
      graphqlOperation(createGame, {
        input: { startDate: new Date().toUTCString() },
      })
    )
      .then((resp) => {
        setGameID(resp.data.createGame.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nameToGame = (i, n, s) => {
    API.graphql(
      graphqlOperation(updateGame, { input: { id: i, name: n, score: s } })
    )
      .then((resp) => {
        console.log(resp.data.updateGame.id, "game updated with name", n);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHighScores = () => {
    API.graphql(
      graphqlOperation(
        `query getShortHighScores{
          listHighScores {
            items {
              id
              name
              score
            }
          }
        }`
      )
    )
      .then((resp) => {
        setHighScores(resp.data.listHighScores.items);
      })
      .catch((err) => {
        console.log("error creating new game: ", err);
      });
  };

  const deleteScore = (id) => {
    API.graphql(graphqlOperation(deleteHighScore, { input: { id: id } }))
      .then((resp) => {
        console.log(resp.data.deleteHighScore.id, "score deleted");
      })
      .catch((err) => {
        console.log("error deleting high score:", id, err);
      });
  };

  const saveScore = (name, score) => {
    API.graphql(graphqlOperation(createHighScore, { input: { name, score } }))
      .then((resp) => {
        console.log(resp.data.createHighScore.id, "score created");
      })
      .catch((err) => {
        console.log("error saving high score:", name, score, err);
      });
  };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const rect = inputRef.current.getBoundingClientRect();
    setX(clientX - rect.x);
    setY(clientY - rect.y);
  };

  const handleClick = (e) => {
    const { clientX, clientY } = e;
    const rect = inputRef.current.getBoundingClientRect();
    setX(clientX - rect.x);
    setY(clientY - rect.y);

    const score_if_valid = not_transverse(
      { cx: circX, cy: circY, r: circR, color: circColor },
      circleList
    );
    if (score_if_valid > 0) {
      setCircleList([
        ...circleList,
        <Circle
          key={circleList.length}
          cx={clientX - rect.x}
          cy={clientY - rect.y}
          r={circR}
          color={circColor}
        />,
      ]);
      setR(Math.floor(70 * Math.random(10, 80) + 10));
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setScore(score + score_if_valid);
    } else {
      beep();
    }
  };

  const handleScore = () => {
    const currentScore = {
      name: "Enter your name",
      current: true,
      score: score,
    };
    let allScores = [...highScores, currentScore].sort(
      (a, b) => b.score - a.score
    );
    const maxLength = 10;
    if (allScores.length > maxLength) {
      const scoreToDelete = allScores[10];
      if (scoreToDelete.hasOwnProperty("id")) {
        deleteScore(scoreToDelete.id);
      }
      allScores = allScores.slice(0, Math.min(highScores.length + 1, 10));
    }
    if (allScores.map((s) => s.current).some((x) => x)) {
      setScoresNeedUpdating(true);
      setHighScores(allScores);
    }
  };

  const adjustScores = () => {
    if (scoresNeedUpdating) {
      const newScores = highScores.map((hs) => {
        if (hs.current) {
          const n = document.getElementById("nameField").value;
          const s = hs.score;
          nameToGame(gameID, n, s);
          saveScore(n, s);
          return {
            name: n,
            score: s,
          };
        } else {
          return hs;
        }
      });
      setHighScores(newScores);
    }
  };

  const reset = () => {
    setScore(0);
    setX(50);
    setY(50);
    setR(40);
    setColor("black");
    setCircleList([]);
    setScoresNeedUpdating(false);
    newGame();
  };

  return (
    <div
      onClick={() => {
        if (rulesIsShowing) {
          rulesToggle();
        }
      }}
    >
      <div className="Board" ref={inputRef}>
        <div
          style={{
            position: "absolute",
            top: "100%",
          }}
        >
          Score: {score}
        </div>
        <div>
          <button
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, 10%)",
            }}
            onClick={() => {
              handleScore();
              scoreToggle();
            }}
          >
            New game
          </button>
        </div>
        <div>
          <button
            style={{
              position: "absolute",
              top: "100%",
              left: "100%",
              transform: "translate(-100%, 10%)",
              margin: "0",
            }}
            onClick={rulesToggle}
          >
            Rules
          </button>
        </div>
        <svg
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          onMouseMove={(e) => handleMouse(e)}
          onClick={(e) => handleClick(e)}
        >
          <rect
            width="100%"
            height="100%"
            style={{ fill: "rgb(255,255,255)" }}
          />
          {circleList}
          <Circle cx={circX} cy={circY} r={circR} color={circColor} />
        </svg>
      </div>

      <RulesModal isShowing={rulesIsShowing} />
      <ScoreModal
        isShowing={scoreIsShowing}
        buttonAction={() => {
          scoreToggle();
          adjustScores();
          reset();
        }}
        highScores={highScores}
      />
    </div>
  );
};

const RulesModal = ({ isShowing }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                Plop as many circles as you can without overlapping them. <br />
                <br />
                Earn points:
                <ul>
                  <li>+1 for each circle you plop</li>
                  <li>
                    +1 for each circle that is tangent to your plopped circle
                  </li>
                  <li>
                    +1 for each circle that is tangent to and of the same color
                    as your plopped circle
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

const ScoreModal = ({ isShowing, buttonAction, highScores }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">High scores</div>
              <ol>
                {highScores.map((hs, ind) => {
                  if (!hs.hasOwnProperty("current")) {
                    return (
                      <li key={ind}>
                        {hs.name} - {hs.score}
                      </li>
                    );
                  } else if (hs.current === true) {
                    return (
                      <li key={ind}>
                        <input
                          id="nameField"
                          type="text"
                          defaultValue={hs.name}
                        ></input>{" "}
                        - {hs.score}
                      </li>
                    );
                  }
                  return true;
                })}
              </ol>
              <button onClick={buttonAction}>New game</button>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Board;
