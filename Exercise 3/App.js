import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function App() {
    const [shakeType, setShakeType] = useState(""); // State to determine shake type
    const [sound, setSound] = useState(null);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100); // Update every 100ms

        const subscription = Accelerometer.addListener(({ x, y }) => {
            const threshold = 1.2; // Adjust sensitivity

            if (Math.abs(x) > threshold) {
                setShakeType("WATER SHAKE");
                playSound('water');
            } else if (Math.abs(y) > threshold) {
                setShakeType("BOOM SHAKE");
                playSound('boom');
            } else {
                setShakeType("");
            }
        });

        return () => subscription.remove();
    }, []);

    async function playSound(type) {

            if (sound) {
                await sound.unloadAsync(); // Unload previous sound
            }

            let soundFile;
            if (type === 'water') {
                soundFile = require('./h2o.wav');
            } else if (type === 'boom') {
                soundFile = require('./boom.mp3');
            }

            const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
            setSound(newSound);
            await newSound.playAsync();

    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.headerText}>Shake your phone!</Text>
            <Text style={styles.text}>{shakeType}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 50,
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
    },
});
