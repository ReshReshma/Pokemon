import { useState ,useEffect} from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
const PokemonCard = (props) => {
  const [show, setShow] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
  getPokemon(props.name.name);
}, [props.name.name]);

const getPokemon = async (pokemonName) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  setPokemon(response.data);
  setImageUrl(response.data.sprites.other.dream_world.front_default);
}
    return ( 
        <>
        <div onClick={handleShow} className="card shadow pokeCard">
          <div className="p-b20">{pokemon.id}</div>
          <div><img style={{height: '5rem'}} src={imageUrl} alt={imageUrl}/></div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <h4>Card Details</h4>
        </Modal.Header>
        <Modal.Body >
          <div>
              <p><span className="bold">Name:</span> {pokemon.name}</p>
          </div>
          <div>
              <p><span className="bold">Weight:</span> {pokemon.weight}</p>
          </div>
          <div>
              <p><span className="bold">Height:</span> {pokemon.height}</p>
          </div>
          <div>
              <p><span className="bold">Id:</span> {pokemon.id}</p>
          </div>
          
        </Modal.Body>
      </Modal>      
           
        </>
     );
}
 
export default PokemonCard;