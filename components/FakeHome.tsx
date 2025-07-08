import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const subjects = ['Math', 'Physics', 'English', 'History', 'Chemistry'];

function getRandomHours() {
  return (Math.random() * 5 + 1).toFixed(1); // 1 to 6 hours random
}

function getNextTopic() {
  const topics = [
    'Practice Algebra problems',
    'Read Chapter 4 of Physics',
    'Write an essay on WWII',
    'Revise Chemical Bonds',
    'Improve vocabulary with flashcards',
  ];
  return topics[Math.floor(Math.random() * topics.length)];
}

export default function FakeHome() {
  const router = useRouter();
  const [stats, setStats] = useState<{subject: string; hours: string}[]>([]);
  const progress = useRef(new Animated.Value(0)).current;
  const pressTimer = useRef<number | null>(null);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    const newStats = subjects.map(sub => ({
      subject: sub,
      hours: getRandomHours(),
    }));
    setStats(newStats);
  }, []);

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
    <View style={styles.container}>
      <View style={styles.statsBox}>
        <Text style={styles.title}>Study Stats</Text>
        {stats.map(({ subject, hours }) => (
          <Text key={subject} style={styles.statText}>
            {subject}: {hours} hrs studied
          </Text>
        ))}
      </View>

      <View style={styles.nextBox}>
        <Text style={styles.nextTitle}>Next to Study</Text>
        <Text style={styles.nextTopic}>{getNextTopic()}</Text>
      </View>

      {/* Invisible hidden unlock area */}
      <TouchableOpacity
        onPressIn={startPress}
        onPressOut={cancelPress}
        style={styles.hiddenButton}
        activeOpacity={1}
      >
        {/* No text here, totally hidden */}
        {holding && <View style={styles.holdIndicator} />}
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
  statsBox: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#eee',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 8,
  },
  nextBox: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
  },
  nextTitle: {
    fontSize: 22,
    color: '#eee',
    marginBottom: 10,
    fontWeight: '600',
  },
  nextTopic: {
    fontSize: 18,
    color: '#aaa',
  },
  hiddenButton: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    width: Dimensions.get('window').width,
    height: 80,
    // transparent but tappable area for long press
  },
  holdIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 60,
    height: 6,
    backgroundColor: '#f44336',
    borderRadius: 3,
    transform: [{ translateX: -30 }],
  },
});
