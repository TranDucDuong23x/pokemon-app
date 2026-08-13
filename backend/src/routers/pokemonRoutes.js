import {getAllPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon} from '../controllers/pokemonControllers.js';
import express from 'express';
const router = express.Router();

router.get('/pokemons', getAllPokemons);
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon);
router.put('/pokemons/:name', updatePokemon);
router.delete('/pokemons/:id', deletePokemon);

export default router;