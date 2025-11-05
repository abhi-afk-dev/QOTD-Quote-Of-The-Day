import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { QuoteData } from '../components/quoteapi';
import Header from '../components/header';
const FAVORITES_KEY = 'favorite_quotes';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<QuoteData[]>([]);
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        const savedFavorites: QuoteData[] = jsonValue != null ? JSON.parse(jsonValue) : [];
        setFavorites(savedFavorites);
      };

      loadFavorites();
    }, [])
  );

  const renderItem = ({ item }: { item: QuoteData }) => (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteText}>"{item.quote}"</Text>
      <Text style={styles.authorText}>- {item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You have no favorite quotes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.quote}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  list: {
    padding: 20,
  },
  quoteContainer: {
    backgroundColor: '#2b2b2b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  quoteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'italic',
  },
  authorText: {
    color: '#BBBBBB',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});