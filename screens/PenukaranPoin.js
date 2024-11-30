import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTabungan } from './TabunganContext'; // Import the custom hook for context

const PenukaranPoin = () => {
  const { poinUser, addRedeemedHadiah, hadiahList, tambahTabungan } = useTabungan(); // Get points and addRedeemedHadiah function
  const [hadiah] = useState(hadiahList); // Use hadiahList from context

  const tukarHadiah = (hadiah) => {
    if (poinUser >= hadiah.poin) {
      // Deduct points and add to redeemedHadiah
      addRedeemedHadiah(hadiah);
      tambahTabungan(-hadiah.poin);  // Deduct points when redeeming
      Alert.alert('Berhasil!', `Anda berhasil menukar poin untuk ${hadiah.nama}.`);
    } else {
      Alert.alert('Gagal!', 'Poin Anda tidak cukup untuk menukar hadiah ini.');
    }
  };

  // Sort hadiahList by poin in ascending order (lowest to highest)
  const sortedHadiahList = hadiah.sort((a, b) => a.poin - b.poin);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Penukaran Poin</Text>
      <Text style={styles.poin}>Poin Anda: {poinUser}</Text>

      <ScrollView>
        {sortedHadiahList.map((item, index) => (
          <View key={item.id || index} style={styles.item}>
            <Text style={styles.hadiahText}>
              {item.nama} - {item.poin} Poin
            </Text>
            <Button
              title={`Tukar ${item.nama}`}
              onPress={() => tukarHadiah(item)}
              color="#007BFF"
            />
          </View>
        ))}
      </ScrollView>
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
  poin: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3,
  },
  hadiahText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PenukaranPoin;
