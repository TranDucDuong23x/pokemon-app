import {generatePokemonDescription} from "../service/ai.service.js";
import {prisma} from "../config/db.js";
export const getAllPokemons = async (req, res) => {
    try {
        const pokemons = await prisma.pokemon.findMany();
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pokemons", error });
    }
};

export const getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await prisma.pokemon.findUnique({
            where: { id },
        });
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }   
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pokemon", error });
    }
};

export const createPokemon = async (req, res) => {
    const { name, type } = req.body;
    try {
        const description = await generatePokemonDescription(name, type);
        const newPokemon = await prisma.pokemon.create({
            data: {
                name,
                type,
                description,
            },
        });
        return res.status(201).json({ message: "Pokemon created successfully", newPokemon });
    } catch (error) {
        return res.status(500).json({ message: "Error creating pokemon", error:{
            name: error.name,
            message: error.message,
            stack: error.stack
        } });
    }
};

export const updatePokemon = async (req, res) => {
    const { name } = req.params;
    try {
        const getTypeByName = await prisma.pokemon.findUnique({
            where: { name }
        });
        const updatedPokemon = await prisma.pokemon.update({
            where: { name },
            data: {
                 description : await generatePokemonDescription(name, getTypeByName.type),
            },
        });
        return res.status(200).json({ message: "Pokemon updated successfully", updatedPokemon });
    } catch (error) {
        res.status(500).json({ message: "Error updating pokemon", error });
    }   
};

export const deletePokemon = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.pokemon.delete({
            where: { id },
        });
        return res.status(200).json({ message: "Pokemon deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting pokemon", error });
    }
};