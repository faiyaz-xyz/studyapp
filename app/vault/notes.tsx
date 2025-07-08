import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SecretNotes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Secret Notes Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ccc',
    fontSize: 18,
  },
});
