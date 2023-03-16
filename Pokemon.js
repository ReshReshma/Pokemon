import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import PokemonCard from "./PokemonCard";
import { Container, Row,Button } from "react-bootstrap";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [name, setName] = useState([]);

  const getPokemons = ()=> {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        setPokemonList(response.data.results);
        var Name = [];
        for(var i=0;i<response.data.results.length;i++){ 
          Name.push({
            Name:response.data.results[i].name
          })
        }
        setName(Name)
        setNextUrl(response.data.next);
      })
      .catch(error => console.error(error));
  }
  const loadMore = () => {
    axios.get(nextUrl)
      .then(response => {
        setPokemonList([...pokemonList, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch(error => console.error(error));
  };
  
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <Container>
        <div><h3>Pokemon Cards</h3></div>
        <LazyLoad key={name} height={200} once>
          <Row>
          {
            pokemonList.map((pokemon,index) => (
              
              <PokemonCard key={index} name={pokemon}  />
            ))
          }
          </Row>
        </LazyLoad>
      </Container>
      <Button onClick={loadMore}>Load More</Button>
    </>
  );
};

export default Pokemon;
