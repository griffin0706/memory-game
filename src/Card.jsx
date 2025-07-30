import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import audioFlip from "./assets/audio/flipcard.mp3";
import audioSelect from "./assets/audio/gamestart.mp3";
import audioHover from "./assets/audio/hover.mp3";
import Modal from "./Modal";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selected, setSelected] = useState([]);
  const [flipped, setFlipped] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [winScore, setWinScore] = useState(0);
  const [count, setCount] = useState(1);
  const [modalToggle, setModalToggle] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    let randomArr = [];

    const randomizer = () => {
      for (let i = 0; i < 10; i++) {
        randomArr = [...randomArr, Math.floor(Math.random() * 1025) + 1];
      }
      const duplicateId = randomArr.filter(
        (item, index) => randomArr.indexOf(item) !== index
      );
      if (duplicateId.length > 0) {
        randomArr = [];
        randomizer();
      }
    };
    randomizer();

    const fetchApiOne = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[0]}/`).then((res) =>
        res.json()
      );
    const fetchApiTwo = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[1]}/`).then((res) =>
        res.json()
      );
    const fetchApiThree = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[2]}/`).then((res) =>
        res.json()
      );
    const fetchApiFour = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[3]}/`).then((res) =>
        res.json()
      );
    const fetchApiFive = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[4]}/`).then((res) =>
        res.json()
      );
    const fetchApiSix = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[5]}/`).then((res) =>
        res.json()
      );
    const fetchApiSeven = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[6]}/`).then((res) =>
        res.json()
      );
    const fetchApiEight = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[7]}/`).then((res) =>
        res.json()
      );
    const fetchApiNine = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[8]}/`).then((res) =>
        res.json()
      );
    const fetchApiTen = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArr[9]}/`).then((res) =>
        res.json()
      );

    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          dataOne,
          dataTwo,
          dataThree,
          dataFour,
          dataFive,
          dataSix,
          dataSeven,
          dataEight,
          dataNine,
          dataTen,
        ] = await Promise.all([
          fetchApiOne(),
          fetchApiTwo(),
          fetchApiThree(),
          fetchApiFour(),
          fetchApiFive(),
          fetchApiSix(),
          fetchApiSeven(),
          fetchApiEight(),
          fetchApiNine(),
          fetchApiTen(),
        ]);
        setData([
          dataOne,
          dataTwo,
          dataThree,
          dataFour,
          dataFive,
          dataSix,
          dataSeven,
          dataEight,
          dataNine,
          dataTen,
        ]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setTimeout(() => {
      setFlipped(false);
    }, 1500);
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (error) return <div>Error: {error.message}</div>;

  // Select Difficulty
  const handleDifficulty = (e) => {
    selectSound();
    setDifficulty(e.target.value);
    setCount(1);
    if (e.target.value == "3") {
      setWinScore(4);
    } else if (e.target.value == "4") {
      setWinScore(6);
    } else if (e.target.value == "5") {
      setWinScore(9);
    }
    setToggle(true);
  };

  // Flip the cards and check if the player win or lose
  const handleSelect = (pokemon) => {
    setSelected((prev) => [...prev, pokemon]);
    const duplicates = selected.filter((item) => item === pokemon);

    // Game Lose
    if (duplicates.length > 0) {
      setModalText("Game Over!");

      setTimeout(() => {
        setModalToggle(true);
        setScore(0);
        setSelected([]);
        setCount(0);
      }, 500);
      // Update Best Score
      if (bestScore < score) {
        setBestScore(score);
      }
    } else {
      // Game Won
      if (score > winScore - 1) {
        setModalText("You Won!");
        setTimeout(() => {
          setModalToggle(true);
          setBestScore(score + 1);
          setScore(0);
          setSelected([]);
          setCount(0);
        }, 500);
      }
      // Continue Flipping Cards
      else {
        shuffleArray(pokemon);
        flippedSound();
        setFlipped(!flipped);

        setCount(count + 1);
        setTimeout(() => {
          setFlipped(false);
          setScore(score + 1);
        }, 1300);
      }
    }
  };

  // Shuffle Cards
  const shuffleArray = () => {
    const newArr = [...data];
    const shuffle = () => {
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
    };
    shuffle();

    const checkShuffle = newArr
      .slice(0, 5)
      .filter((item) => selected.includes(item));

    if (checkShuffle.length >= difficulty) {
      shuffle();
    } else {
      setData(newArr);
    }
  };

  // Back to Home
  const home = () => {
    hoverSound();
    setToggle(false);
    setScore(0);
    setBestScore(0);
    setModalToggle(false);
    loader();
  };

  // Play again
  const setModal = (pokemon) => {
    hoverSound();
    setModalToggle(false);
    loader();
    shuffleArray(pokemon);
  };

  // Loading Spinner
  const loader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  // Audio
  const flippedSound = () => {
    const audio = new Audio(audioFlip);
    audio.play();
  };

  const selectSound = () => {
    const audio = new Audio(audioSelect);
    audio.play();
  };

  const hoverSound = () => {
    const audio = new Audio(audioHover);
    audio.play();
  };

  return (
    <>
      {!toggle && (
        <div className="menu">
          <div className="home-text">
            <h1>Memory Game</h1>
          </div>
          <div className="difficulty-btn">
            <button
              value="3"
              onClick={handleDifficulty}
              onMouseEnter={hoverSound}
            >
              Easy
            </button>
            <button
              value="4"
              onClick={handleDifficulty}
              onMouseEnter={hoverSound}
            >
              Medium
            </button>
            <button
              value="5"
              onClick={handleDifficulty}
              onMouseEnter={hoverSound}
            >
              Hard
            </button>
          </div>
        </div>
      )}

      {toggle && (
        <div className="game">
          <div className="header">
            <div>
              <h2 onClick={home} className="logo">
                Pokemon
              </h2>
            </div>
            <div className="score-container">
              <div className="score">Score: {score}</div>
              <div className="score">Best Score: {bestScore}</div>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="app"
            >
              <Modal
                modalText={modalText}
                home={home}
                modalToggle={modalToggle}
                setModal={setModal}
              />

              <div className="card-container">
                {data.slice(0, difficulty).map((pokemon) => {
                  return (
                    <div className={flipped ? "card flipped" : "card"}>
                      {!flipped ? (
                        <div className="card-item">
                          <img
                            className="card-image"
                            src={
                              pokemon.sprites.other["official-artwork"]
                                .front_default
                            }
                            alt={pokemon.forms[0].name}
                            onClick={() => handleSelect(pokemon)}
                          />
                          <p>{pokemon.forms[0].name}</p>
                        </div>
                      ) : (
                        <div className="card-back back-image card-item"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              <h2>
                {score + 1} / {winScore + 1}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Card;
