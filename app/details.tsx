
import { Platform, StyleSheet, View, Image, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';

export default function HomeScreen() {
  const {name} = useLocalSearchParams();
  const [description,setDescription] = useState()
  const handleGetName = async () => {
      const request = await fetch(`http://localhost:5000/api/pokemons/${name}`)
      const response = await request.json()
      setDescription(response)
  }
  useEffect(() => {
    handleGetName()
  },[])
  return (
    <ScrollView >
        <ThemedText style={{fontSize:18}}>Details for: {name}</ThemedText>
        <ThemedText style={{fontSize:18}}>{description}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    
});