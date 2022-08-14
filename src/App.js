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
      let result = await getAllPokemon(initialURL)
      setNextUrl(result.data.next);
      setPrevUrl(result.data.previous);
      await loadPokemon(result.data.results);
      // setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    // setLoading(true);
    let result = await getAllPokemon(nextUrl)
    await loadPokemon(result.data.results);
    setNextUrl(result.data.next);
    setPrevUrl(result.data.previous);
    // setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    // setLoading(true);
    let result = await getAllPokemon(prevUrl)
    await loadPokemon(result.data.results);
    setNextUrl(result.data.next);
    setPrevUrl(result.data.previous);
    // setLoading(false);
  };

  const loadPokemon = async (data) => {
    let pokemonData = []
     for(data of data){
        let result = await getPokemon(data.url)
        pokemonData.push(result.data);
      }
      setPokemonData(pokemonData)     
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
