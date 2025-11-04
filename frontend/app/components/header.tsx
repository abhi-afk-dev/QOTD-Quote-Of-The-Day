import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Plaster_400Regular } from '@expo-google-fonts/plaster';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

function Header() {

    const [fontsLoaded] = useFonts({
        Plaster_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView>
            <View style={[styles.header]}>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.logo]}>QOTD</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    logo: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Plaster_400Regular',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#1d1d1d',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    overlayBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    settingsOverlay: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    overlayOption: {
        paddingVertical: 10,
        justifyContent: "center",
    },
    overlayText: {
        fontSize: 24,
        justifyContent: "center",
    },
    overlaySeparator: {
        height: 1,
        marginVertical: 5,
    },
});