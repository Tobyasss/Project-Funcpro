import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function AdminPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleAccess = () => {
    if (password === '123') {
      navigation.navigate('AdminPage');
    } else {
      Alert.alert('Error', 'Password salah!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Masukkan password admin"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Submit" onPress={handleAccess} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
