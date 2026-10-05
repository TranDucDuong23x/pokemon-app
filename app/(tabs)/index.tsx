import {StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  interface Pokemon {
    name: string;
    image: string;
    imageBack: string;
    type: pokemonType;
  }
  interface pokemonType {
    name: string;
    url: string;
  }
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const colorByType: Record<string, string> = {
    grass: "green",
    fire: "red",
    water: "blue",
    bug: "lightgreen",
    normal: "gray",
    poison: "purple",
    electric: "yellow",
    ground: "brown",
    fairy: "pink",
    fighting: "orange",
    psychic: "violet",
    rock: "darkgray",
    ghost: "indigo",
    ice: "lightblue",
    dragon: "darkblue",
    dark: "black",
    steel: "silver",
    flying: "skyblue"
  }// Map of Pokemon types to colors
  useEffect(() => {
    fetchPokemonData();
  }, []);
  async function fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      console.log('Fetched Pokemon Data:', data);
      const pokemonData: Pokemon[] = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const req = await fetch(pokemon.url);
          const res = await req.json();
          const request = await fetch("http://localhost:5000/api/pokemons",{
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: res.name,
                type: res.types[0].type.name,
              })
          })
          const response = await request.json();
          return {
            name: res.name,
            image: res.sprites.front_default,
            imageBack: res.sprites.back_default,
            type: res.types[0].type,
          };
        })
      )
      
      setPokemonList(pokemonData);
      console.log('Processed Pokemon Data:', pokemonData);

    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  }
  return (
    <ScrollView >
      <ThemedText style={{fontSize: 20 }} >Welcome to Pokemon App</ThemedText>
      {pokemonList.flatMap((item: any, index) => (
        <Link key={item.name} href={`/details?name=${item.name}`} style={[styles.name, { backgroundColor: colorByType[item.type.name], padding: 8, borderRadius: 8, marginTop: 8 }]}>
          <ThemedText>
            {item.name}
            <Text style={styles.type}>({item.type.name}) </Text>
            <br></br>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
              <Image source={{ uri: item.image }} style={{ width: 150, height: 150 }} />
              <Image source={{ uri: item.imageBack }} style={{ width: 150, height: 150 }} />
            </View>
          </ThemedText>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    textAlign: 'center'
  }
});