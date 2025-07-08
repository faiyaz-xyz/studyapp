import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = { onCorrect: () => void };

export default function PasswordPrompt({ onCorrect }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const realSecret = 'supersecret123'; // 🔒 Change this to your actual secret

  const handleLogin = () => {
    if (password === realSecret) {
      onCorrect();
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to Study Grind App</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={handleLogin} color="#f44336" />
      </View>
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
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#eee',
    backgroundColor: '#1e1e1e',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
