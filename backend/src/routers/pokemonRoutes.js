import {getAllPokemons, createPokemon, deletePokemon, getPokemonByName} from '../controllers/pokemonControllers.js';
import express from 'express';
const router = express.Router();

router.get('/pokemons', getAllPokemons);
router.get('/pokemons/:name', getPokemonByName);
router.post('/pokemons', createPokemon);
router.delete('/pokemons/:name', deletePokemon);

export default router;
