import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useTabungan } from './TabunganContext'; // Import hook untuk akses context

const RemoveHadiah = () => {
  const { hadiahList, removeHadiah } = useTabungan(); // Mengakses daftar hadiah dan fungsi removeHadiah dari context

  const handleRemoveHadiah = (id) => {
    removeHadiah(id); // Menghapus hadiah berdasarkan ID
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Hadiah</Text>
      <FlatList
        data={hadiahList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nama} - {item.poin} Poin</Text>
            <Button
              title="Hapus"
              onPress={() => handleRemoveHadiah(item.id)} // Fungsi untuk menghapus hadiah
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
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

export default RemoveHadiah;
