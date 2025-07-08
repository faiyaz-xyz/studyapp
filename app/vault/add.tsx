import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddMore() {
  const [name, setName] = useState('');
  const router = useRouter();

  const addApp = async () => {
    if (!name.trim()) return;

    try {
      const stored = await AsyncStorage.getItem('vaultApps');
      const apps = stored ? JSON.parse(stored) : [];
      const updated = [...apps, { name }];
      await AsyncStorage.setItem('vaultApps', JSON.stringify(updated));

      Alert.alert('✅ App Added!', `${name} has been hidden.`);
      setName('');
      router.push('/vault');
    } catch (err) {
      Alert.alert('Error', 'Failed to add app');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Secret App</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter app name"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={addApp}>
        <Text style={styles.buttonText}>Add App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    color: '#eee',
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#f44336',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
