import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define a set of common LaTeX symbols (can expand as needed)
const latexSymbols = [
  { id: '0', symbol: '\\alpha' },
  { id: '1', symbol: '\\beta' },
  { id: '2', symbol: '\\gamma' },
  { id: '3', symbol: '\\delta' },
  { id: '4', symbol: '\\epsilon' },
  { id: '5', symbol: '\\theta' },
  { id: '6', symbol: '\\lambda' },
  { id: '7', symbol: '\\mu' },
  { id: '8', symbol: '\\pi' },
  { id: '9', symbol: '\\sigma' },
  { id: '10', symbol: '\\phi' },
  { id: '11', symbol: '\\omega' },
  { id: '12', symbol: '\\int' },
  { id: '13', symbol: '\\sum' },
  { id: '14', symbol: '\\infty' },
  { id: '15', symbol: '\\sqrt{}' },
  { id: '16', symbol: '\\frac{}{}' },
  { id: '17', symbol: '+' },
  { id: '18', symbol: '-' },
  { id: '19', symbol: '\\times' },
  { id: '20', symbol: '\\div' },
  { id: '21', symbol: '=' },
  { id: '22', symbol: '<' },
  { id: '23', symbol: '>' },
  { id: '24', symbol: '(' },
  { id: '25', symbol: ')' },
  { id: '26', symbol: '[' },
  { id: '27', symbol: ']' },
  { id: '28', symbol: '{' },
  { id: '29', symbol: '}' },
];

const numColumns = 6;
const cellSize = Dimensions.get('window').width / numColumns;

export default function LatexKeyboard({ onSelect }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.key}
      onPress={() => onSelect(item.symbol)}
    >
      <Text style={styles.symbol}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.keyboardContainer}>
      <FlatList
        data={latexSymbols}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        scrollEnabled={false}
      />

      {/* Controls row */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.controlKey, { flex: 1 }]}
          onPress={() => onSelect('\n')}
        >
          <Text style={styles.controlText}>↵</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlKey, { flex: 2 }]}
          onPress={() => onSelect(' ')}
        >
          <Text style={styles.controlText}>Space</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlKey, { flex: 1 }]}
          onPress={() => onSelect('backspace')}
        >
          <Ionicons name="backspace-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderColor: '#333',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    width: cellSize - 10,
    height: cellSize - 10,
    margin: 3,
    backgroundColor: '#333',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 20,
    color: '#fff',
  },
  controlsRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  controlKey: {
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 26,
  },
});
