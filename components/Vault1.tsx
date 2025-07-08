import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = { onUnlockFinal: () => void };

export default function Vault1({ onUnlockFinal }: Props) {
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    if (tapCount >= 5) {
      setTapCount(0);
      onUnlockFinal();
    }
  }, [tapCount]);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <TouchableOpacity
        onPress={() => setTapCount(tapCount + 1)}
        style={{ padding: 25, backgroundColor: '#ddd', borderRadius: 10 }}
      >
        <Text style={{ fontSize: 15 }}>Tap 5 times to continue 🔐</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20, color: '#666' }}>
        Tap count: {tapCount}
      </Text>
    </View>
  );
}
