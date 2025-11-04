import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const FAVORITES_KEY = 'favorite_quotes';

export interface QuoteData {
  quote: string;
  author: string;
  category: string;
}

const getRandomGrayColor = () => {
  const letters = '0123456789ABCDEF';
  let value = '';
  for (let i = 0; i < 2; i++) {
    value += letters[Math.floor(Math.random() * 16)];
  }
  return `#${value}${value}`;
};

const generateRandomGrayGradient = (): [string, string] => {
  return [getRandomGrayColor(), getRandomGrayColor()];
};

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [gradientColors, setGradientColors] = useState(() => generateRandomGrayGradient());

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
          method: 'GET',
          headers: {
            'X-Api-Key': API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: QuoteData[] = await response.json();
        setQuote(data[0]);

        if (data[0]) {
          checkFavoriteStatus(data[0]);
        }

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  const checkFavoriteStatus = async (currentQuote: QuoteData) => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites: QuoteData[] = jsonValue != null ? JSON.parse(jsonValue) : [];

      const isFav = favorites.some(fav => fav.quote === currentQuote.quote);
      setIsFavorited(isFav);
    } catch (e) {
      console.error("Failed to check favorites", e);
    }
  };

  const toggleFavorite = async () => {
    if (!quote) return;

    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites: QuoteData[] = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (isFavorited) {
        favorites = favorites.filter(fav => fav.quote !== quote.quote);
        setIsFavorited(false);
      } else {
        favorites.push(quote);
        setIsFavorited(true);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Loading quote...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error fetching quote: {error}</Text>
        <Text style={styles.errorText}>
          (Did you remember to add your API key?)
        </Text>
      </View>
    );
  }

  if (!quote) {
    return null;
  }
  return (
    <LinearGradient colors={gradientColors} style={styles.quoteCard}>
      <TouchableOpacity
        onPress={toggleFavorite}
        style={styles.heartButton}
      >
        <Ionicons
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorited ? 'red' : 'white'}
        />
      </TouchableOpacity>

      <Text style={styles.quoteText}>"{quote.quote}"</Text>
      <Text style={styles.authorText}>- {quote.author}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  quoteCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 30,
  },
  authorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    width: '100%',
    color: '#EEEEEE',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  }
});