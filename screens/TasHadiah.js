import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTabungan } from './TabunganContext';

const TasHadiah = () => {
  const { redeemedHadiah } = useTabungan();

  // Pastikan 'redeemedHadiah' tersedia
  if (!redeemedHadiah) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItems}>Data hadiah tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tas Hadiah</Text>
      {redeemedHadiah.length > 0 ? (
        <FlatList
          data={redeemedHadiah}
          keyExtractor={(item, index) => item.id ? item.id : `item-${index}`} // Fix template string
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nama}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItems}>Belum ada hadiah yang ditukar.</Text>
      )}
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
