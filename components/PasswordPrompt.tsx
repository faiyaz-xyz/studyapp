import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

type Props = { onCorrect: () => void };

export default function PasswordPage({ onCorrect }: Props) {
  const [password, setPassword] = useState('');
  const secret = 'supersecret123'; // change to your desired password

  const checkPassword = () => {
    if (password === secret) {
      onCorrect();
    } else {
      Alert.alert('Wrong password', 'Try again!');
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 15, color: "white" }}>Enter Vault Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: '80%',
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 5,
          marginBottom: 20,
          color: "white",
        }}
      />
      <Button title="Unlock" onPress={checkPassword} />
    </View>
  );
}
