
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
  return (
    <ScrollView >
        <ThemedText style={{fontSize:18}}>Details for: {name}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    
});
