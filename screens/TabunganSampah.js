import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTabungan } from './TabunganContext';  // Use the context hook

export default function TabunganSampahScreen() {
  const [berat, setBerat] = useState('');
  const { tambahTabungan } = useTabungan();  // Destructure tambahTabungan from context

  const handleSubmit = () => {
    if (!berat || isNaN(berat)) {
      alert('Masukkan berat sampah yang valid!');
      return;
    }

    // Convert trash weight to points (1 kg = 10 points)
    tambahTabungan({ jenis: 'Organik', berat: parseFloat(berat) });

    alert(`Berhasil menambahkan ${berat} kg sampah organik, dan Anda mendapatkan ${parseFloat(berat) * 10} poin.`);
    setBerat(''); // Clear the input after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Masukkan berat sampah (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={berat}
        onChangeText={setBerat}
      />
      <Button title="Tambah Tabungan Sampah" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});
