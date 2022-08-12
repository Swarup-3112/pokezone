import React from "react";
import typeColors from "../helpers/typeColors";
import styled from "styled-components";

const MainCard = styled.div`
  border-radius: 10px;
  padding-bottom: 20px;
  background-color: #ffffff ;
`;

const PokeImg = styled.div`
  text-align: center;
`

const PokeName = styled.h1`
  text-align: center;
  text-transform: capitalize;
  font-weight: 800;
  font-size: 22px;
`;

const PokeTypeDiv = styled.div`
    display: flex;
    justify-content: center;   
`

const PokeType = styled.div`
    padding: 5px 10px;
    margin: 10px 10px 10px 0;
    border-radius: 5px;
    color: #fff;
`

const PokeTitles = styled.p`
   font-weight: 700;
   font-size: 18px;

`

const PokeDiv = styled.p`
  margin: 10px 0 0 10px;
`

function Card({ pokemon }) {
  return (
    <MainCard>
      <PokeImg>
        <img src={pokemon.sprites.front_default} alt="" />
      </PokeImg>
      <PokeName>{pokemon.name}</PokeName>
      <PokeTypeDiv>
        {pokemon.types.map((type) => {
          return (
            <PokeType
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </PokeType>
          );
        })}
      </PokeTypeDiv>
      <div>
        <PokeDiv>
          <PokeTitles>Weight</PokeTitles>
          <p>{pokemon.weight}</p>
        </PokeDiv>
        <PokeDiv>
          <PokeTitles>Height</PokeTitles>
          <p>{pokemon.height}</p>
        </PokeDiv>
        <PokeDiv>
          <PokeTitles>Ability</PokeTitles>
          <p>{pokemon.abilities[0].ability.name}</p>
        </PokeDiv>
      </div>
    </MainCard>
  );
}

export default Card;
