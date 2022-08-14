import axios from "axios";

export const getPokemon = async (url) => {
    return await axios({
      method: "GET",
      url: url,
    });
  };

export const getAllPokemon = async (url) => {
    return await axios({
      method: "GET",
      url: url,
    });
  };