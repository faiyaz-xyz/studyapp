import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PasswordPage from '../../components/PasswordPrompt';
import Vault1 from '../../components/Vault1';

export default function Vault() {
  const [stage, setStage] = useState<'vault1' | 'password' | 'final'>('vault1');

  return (
    <View style={{ flex:1 }}>
      {stage === 'vault1' && (
        <Vault1 onUnlockFinal={() => setStage('password')} />
      )}
      {stage === 'password' && (
        <PasswordPage onCorrect={() => setStage('final')} />
      )}
      {stage === 'final' && (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ fontSize: 24, color: "white" }}>🎉 Final Vault Unlocked! Secret inside...</Text>
        </View>
      )}
    </View>
  );
}
