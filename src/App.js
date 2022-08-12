import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/NavBar";
import Card from "./components/Card";
import { getPokemon, getAllPokemon } from "./service/pokemon";

const Container = styled.div`
  width: 70%;
  display: grid;
  margin: 0 auto 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Button = styled.button`
  border-style: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  background: #30a7d7;
  color: #fff;
  font-size: 1em;
`;

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  // const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      console.log(response, "hello");
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      // setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    // setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    // setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    // setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    // setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    console.log(_pokemonData, "bye");
    setPokemonData(_pokemonData);
  };

  return (
    <>
      <Navbar />
      <div>
        {/* {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : ( */}
        <>
          <ButtonDiv>
            <Button onClick={prev}>Prev</Button>
            <Button onClick={next}>Next</Button>
          </ButtonDiv>
          <Container>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </Container>
        </>
        {/* )} */}
      </div>
    </>
  );
}

export default App;
