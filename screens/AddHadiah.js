import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTabungan } from './TabunganContext'; // Import hook untuk akses context

const AddHadiah = () => {
  const { addHadiah } = useTabungan(); // Mengakses fungsi addHadiah dari context
  const [newHadiah, setNewHadiah] = useState({ nama: '', poin: '' }); // State untuk input hadiah baru

  // Menambah hadiah baru
  const handleAddHadiah = () => {
    const { nama, poin } = newHadiah;
    if (nama && poin) {
      addHadiah(nama, parseInt(poin));  // Menambah hadiah ke daftar
      setNewHadiah({ nama: '', poin: '' });  // Reset form setelah penambahan
      Alert.alert('Sukses!', `Hadiah "${nama}" berhasil ditambahkan.`);
    } else {
      Alert.alert('Gagal!', 'Pastikan nama dan poin hadiah terisi dengan benar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Hadiah</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Hadiah"
        value={newHadiah.nama}
        onChangeText={(text) => setNewHadiah({ ...newHadiah, nama: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga Poin"
        value={newHadiah.poin}
        onChangeText={(text) => setNewHadiah({ ...newHadiah, poin: text })}
        keyboardType="numeric"
      />
      <Button title="Tambah Hadiah" onPress={handleAddHadiah} color="#28a745" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AddHadiah;
