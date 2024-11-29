import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
