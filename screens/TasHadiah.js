import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTabungan } from './TabunganContext';

const TasHadiah = () => {
  const { redeemedHadiah } = useTabungan(); // Get redeemed hadiah from context

  if (!redeemedHadiah || redeemedHadiah.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItems}>Data hadiah tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tas Hadiah</Text>
      <FlatList
        data={redeemedHadiah}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nama}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noItems: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default TasHadiah;
