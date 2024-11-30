// AdminPage.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { useTabungan } from './TabunganContext'; // Import the custom hook for context

export default function AdminPage({ navigation }) {
  const { hadiahList, addHadiah, removeHadiah } = useTabungan(); // Get addHadiah and removeHadiah from context
  const [newHadiah, setNewHadiah] = useState({ nama: '', poin: '' }); // State for new hadiah input

  // Handle adding new hadiah
  const handleAddHadiah = () => {
    const { nama, poin } = newHadiah;
    if (nama && poin) {
      addHadiah(nama, poin); // Add new hadiah to the list
      setNewHadiah({ nama: '', poin: '' }); // Reset input fields
      Alert.alert('Sukses!', `Hadiah "${nama}" berhasil ditambahkan.`);
    } else {
      Alert.alert('Gagal!', 'Pastikan nama dan poin hadiah terisi dengan benar.');
    }
  };

  // Handle removing a hadiah
  const handleRemoveHadiah = (id) => {
    removeHadiah(id); // Remove the hadiah based on id
  };

  // Sort hadiahList by poin in ascending order (lowest to highest)
  const sortedHadiahList = hadiahList.sort((a, b) => a.poin - b.poin);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>

      {/* Button for Adding new hadiah */}
      <View style={styles.addContainer}>
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
        <Button
          title="Tambah Hadiah"
          onPress={handleAddHadiah}
          color="#28a745"
        />
      </View>

      {/* List of hadiah with Remove button */}
      <FlatList
        data={sortedHadiahList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nama} - {item.poin} Poin</Text>
            <Button
              title="Hapus"
              onPress={() => handleRemoveHadiah(item.id)} // Handle the removal of the item
              color="red"
            />
          </View>
        )}
      />

      {/* Back button */}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  addContainer: { marginBottom: 20 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  item: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
