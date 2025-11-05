import {
    View,
    StyleSheet,
} from "react-native";
import Header from "../components/header"
import QuoteOfTheDay from "../components/randomQuote";
import { BlurView } from 'expo-blur';

function RandomPage() {

    return (
        <View style={stylesDark.container}>
            <Header />
            <View style={stylesDark.qoutebox}>
                <BlurView
                    intensity={90}
                    tint='dark'
                    style={StyleSheet.absoluteFill}
                />
                <QuoteOfTheDay />
            </View>
        </View >
    );
}

export default RandomPage;

// --- STYLES ---
const stylesDark = StyleSheet.create({
    container: { flex: 1, height: '100%', backgroundColor: "#171717" },
    qoutebox: {
        height: '80%',
        margin: 20,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
