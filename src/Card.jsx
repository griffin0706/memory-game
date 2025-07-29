import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Card = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
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

  useEffect(() => {
    let randomArr = [];
    for (let i = 0; i < 10; i++) {
      randomArr = [...randomArr, Math.floor(Math.random() * 1025) + 1];
    }
    const duplicateId = randomArr.filter(
      (item, index) => randomArr.indexOf(item) !== index
    );
    if (duplicateId.length > 0) {
      randomArr = [];
      for (let i = 0; i < 10; i++) {
        randomArr = [...randomArr, Math.floor(Math.random() * 1025) + 1];
      }
    }

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
  }, []); // Empty dependency array to run only once on mount
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSelect = (pokemon) => {
    flippedSound();
    setFlipped(!flipped);
    setSelected((prev) => [...prev, pokemon]);
    const duplicates = selected.filter((item) => item === pokemon);
    if (duplicates.length > 0) {
      setScore(0);
      setSelected([]);
      setCount(0);
      alert("Game Over!");
      if (bestScore < score) {
        setBestScore(score);
      }
    } else {
      setScore(score + 1);
    }
    shuffleArray(pokemon);
    setCount(count + 1);

    setTimeout(() => {
      setFlipped(false);
    }, 1300);
  };

  if (score > winScore) {
    setBestScore(score);
    setScore(0);
    setSelected([]);
    setCount(0);
    alert("You Won!");
    setTimeout(() => {
      setFlipped(false);
    }, 1200);
  }

  const shuffleArray = (pokemon) => {
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

  const flippedSound = () => {
    const audio = new Audio("./src/assets/flipcard.mp3");
    audio.play();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
    setToggle(true);
    setCount(1);
    if (e.target.value == "3") {
      setWinScore(4);
    } else if (e.target.value == "4") {
      setWinScore(6);
    } else if (e.target.value == "5") {
      setWinScore(9);
    }
  };

  const home = () => {
    setToggle(false);
    setScore(0);
  };

  return (
    <>
      {!toggle && (
        <div className="menu">
          <div className="home-text">
            <h1>Memory Game</h1>
          </div>
          <div className="difficulty-btn">
            <button value="3" onClick={handleDifficulty}>
              Easy
            </button>
            <button value="4" onClick={handleDifficulty}>
              Medium
            </button>
            <button value="5" onClick={handleDifficulty}>
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="app"
          >
            <div className="card-container">
              {data.slice(0, difficulty).map((pokemon) => {
                return (
                  <div
                    key={pokemon.id}
                    className={flipped ? "card flipped" : "card"}
                  >
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
        </div>
      )}
    </>
  );
};

export default Card;
