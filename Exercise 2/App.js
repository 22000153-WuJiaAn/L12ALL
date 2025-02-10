import React, { useState, useEffect } from 'react';
import { StatusBar, Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';

const styles = StyleSheet.create({
    container: {},
});

export default function App() {
    const [mysound, setMysound] = useState();

    async function playSound() {
        const soundfile = require('./short1.wav');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setMysound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return mysound
            ? () => {
                console.log('Unloading Sound');
                mysound.unloadAsync();
            }
            : undefined;
    }, [mysound]);

    return (
        <View>
            <StatusBar />
            <Button title="Play Sound" onPress={() => playSound()} />
        </View>
    );
}
