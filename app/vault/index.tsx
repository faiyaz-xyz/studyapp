import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PasswordPrompt from '../../components/PasswordPrompt'; // your fake login
import Vault1 from '../../components/Vault1';

export default function VaultMain() {
  const [stage, setStage] = useState<'vault1' | 'password' | 'final'>('vault1');
  const router = useRouter();

  if (stage === 'vault1') {
    return <Vault1 onUnlockFinal={() => setStage('password')} />;
  }

  if (stage === 'password') {
    return <PasswordPrompt onCorrect={() => setStage('final')} />;
  }

  // THIS IS the launcher that should only show in stage === 'final'
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Hidden Apps 👀</Text>

      <TouchableOpacity style={styles.appIcon} onPress={() => router.push('/vault/images')}>
        <Text style={styles.iconText}>🖼️ Hidden Images</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appIcon} onPress={() => router.push('/vault/notes')}>
        <Text style={styles.iconText}>📝 Secret Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appIcon} onPress={() => router.push('/vault/add')}>
        <Text style={styles.iconText}>➕ Add More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#eee',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  appIcon: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  iconText: {
    color: '#eee',
    fontSize: 18,
  },
});
