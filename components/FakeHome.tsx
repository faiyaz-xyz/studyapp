import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function FakeHome() {
  const [holding, setHolding] = useState(false);
  const pressTimer = useRef<number | null>(null); // <---- here

  const startPress = () => {
    setHolding(true);
    pressTimer.current = setTimeout(() => {
      setHolding(false);
      router.push('/vault');
    }, 5000);
  };

  const cancelPress = () => {
    setHolding(false);
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPressIn={startPress}
        onPressOut={cancelPress}
        style={{
          padding: 20,
          backgroundColor: holding ? '#faa' : '#ccc',
          borderRadius: 10,
        }}
      >
        <Text>Hold for 5 seconds to unlock</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20, color: '#666' }}>
        Don’t release early or it resets!
      </Text>
    </View>
  );
}
