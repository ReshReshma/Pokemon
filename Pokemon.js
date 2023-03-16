import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import PokemonCard from "./PokemonCard";
import { Container, Row } from "react-bootstrap";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemons = ()=> {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => console.error(error));
  }
  
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <Container>
        <div><h3>Pokemon Cards</h3></div>
        <LazyLoad>
          <Row>
          {
            pokemonList.map((pokemon,index) => (
              <PokemonCard key={index} name={pokemon}  />
            ))
          }
          </Row>
        </LazyLoad>
      </Container>
    </>
  );
};

export default Pokemon;