import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HiddenImages() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📁 Hidden Images Coming Soon</Text>
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
