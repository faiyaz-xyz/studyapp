import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Invisible tap zone at the top */}
      <TouchableOpacity
        onPress={() => setTapCount(tapCount + 1)}
        activeOpacity={1}
        style={{
          position: 'absolute',
          top: 0,
          height: 80,
          width: Dimensions.get('window').width,
          // completely invisible, no background color
        }}
      />

      {/* Fake Vault screen, nothing suspicious */}
      <View style={{ padding: 25, backgroundColor: '#ddd', borderRadius: 10 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Welcome to Vault 🧠</Text>
      </View>
    </View>
  );
}
