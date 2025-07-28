import React from "react";
import { useState, useEffect } from "react";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let randomArr = [];
    for (let i = 0; i < 10; i++) {
      randomArr = [...randomArr, Math.floor(Math.random() * 1025) + 1];
    }
    console.log(randomArr);

    const fetchApiOne = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/1/").then((res) => res.json());
    const fetchApiTwo = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/22/").then((res) => res.json());
    const fetchApiThree = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/32/").then((res) => res.json());
    const fetchApiFour = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/42/").then((res) => res.json());
    const fetchApiFive = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/52/").then((res) => res.json());
    const fetchApiSix = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/62/").then((res) => res.json());
    const fetchApiSeven = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/72/").then((res) => res.json());
    const fetchApiEight = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/80/").then((res) => res.json());
    const fetchApiNine = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/90/").then((res) => res.json());
    const fetchApiTen = () =>
      fetch("https://pokeapi.co/api/v2/pokemon/100/").then((res) => res.json());
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
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSelect = (name) => {
    setSelected((prev) => [...prev, name]);
    const duplicates = selected.filter((item) => item === name);
    if (duplicates.length > 0) {
      alert("Game Over!");
      setScore(0);
      setSelected([]);
      if (bestScore < score) {
        setBestScore(score);
      }
    } else {
      setScore(score + 1);
    }
    shuffleArray();
  };
  if (score === 10) {
    alert("You Won!");
    setScore(0);
    setSelected([]);
  }
  const shuffleArray = () => {
    const newArr = [...data];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    setData(newArr); // Update state with the new, shuffled array
  };

  return (
    <>
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <div className="score">Best Score: {bestScore}</div>
      </div>
      <div className="card-container">
        {data.map((pokemon) => {
          return (
            <div key={pokemon.id} className="card">
              <img
                className="card-image"
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.forms[0].name}
                onClick={() => handleSelect(pokemon.forms[0].name)}
              />
              <p>{pokemon.forms[0].name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
