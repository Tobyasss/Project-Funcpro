import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useTabungan } from './TabunganContext'; // Import the custom hook for context

const PenukaranPoin = () => {
  const { poinUser, addRedeemedHadiah } = useTabungan(); // Get points and addRedeemedHadiah function
  const [hadiah] = useState([
    { id: '1', nama: 'Voucher Belanja', poin: 50 },
    { id: '2', nama: 'Smartphone', poin: 200 },
    { id: '3', nama: 'Tiket Liburan', poin: 500 },
  ]);

  const tukarHadiah = (hadiah) => {
    if (poinUser >= hadiah.poin) {
      // Deduct points and add to redeemedHadiah
      addRedeemedHadiah(hadiah);
      Alert.alert('Berhasil!', `Anda berhasil menukar poin untuk ${hadiah.nama}.`);
    } else {
      Alert.alert('Gagal!', 'Poin Anda tidak cukup untuk menukar hadiah ini.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Penukaran Poin</Text>
      <Text style={styles.poin}>Poin Anda: {poinUser}</Text>

      {hadiah.map((item, index) => (
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
