import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ✅ define the app type
type VaultApp = {
  name: string;
};

type PropsVault1 = { onUnlockFinal: () => void };
function Vault1({ onUnlockFinal }: PropsVault1) {
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

type PropsPasswordPrompt = { onCorrect: () => void };
function PasswordPrompt({ onCorrect }: PropsPasswordPrompt) {
  const [input, setInput] = useState('');
  const correctPass = 'yourSecretPass'; // change this to your secret password

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding: 20, backgroundColor:'#121212' }}>
      <Text style={{ fontSize: 20, color:'#eee', marginBottom: 20 }}>Log in to your account</Text>
      <input
        type="password"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Password"
        style={{ fontSize: 18, padding: 10, borderRadius: 6, marginBottom: 15, width: '80%' }}
      />
      <TouchableOpacity
        onPress={() => {
          if(input === correctPass) onCorrect();
          else alert('Wrong password!');
        }}
        style={{ backgroundColor: '#f44336', padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Vault() {
  const [stage, setStage] = useState<'lock' | 'password' | 'vault'>('lock');
  const [apps, setApps] = useState<VaultApp[]>([]);
  const router = useRouter();

  // Load apps after vault unlocked
  useEffect(() => {
    if(stage === 'vault'){
      (async () => {
        const stored = await AsyncStorage.getItem('vaultApps');
        if (stored) setApps(JSON.parse(stored));
      })();
    }
  }, [stage]);

  if(stage === 'lock'){
    return <Vault1 onUnlockFinal={() => setStage('password')} />;
  }

  if(stage === 'password'){
    return <PasswordPrompt onCorrect={() => setStage('vault')} />;
  }

  // stage === 'vault', your original VaultLauncher code below
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Hidden Apps 👀</Text>

      {/* Built-in system vault apps */}
      <TouchableOpacity style={styles.appIcon} onPress={() => router.push('/vault/images')}>
        <Text style={styles.iconText}>🖼️ Hidden Images</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appIcon} onPress={() => router.push('/vault/notes')}>
        <Text style={styles.iconText}>📝 Secret Notes</Text>
      </TouchableOpacity>

      {/* Dynamically rendered custom apps */}
      {apps.map((app, index) => (
        <TouchableOpacity
          key={index}
          style={styles.appIcon}
          onPress={() => router.push({ pathname: '/vault/fakeapp', params: { name: app.name } })}
        >
          <Text style={styles.iconText}>📦 {app.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Add New App */}
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
