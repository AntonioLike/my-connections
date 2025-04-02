import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Card, Text, Avatar } from "react-native-paper";
import { Plus, Users, Settings, Heart } from "lucide-react-native";
import { RootStackParamList } from "../navigation/types"; // Adjust path to match your project structure

const MainScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Apply the type fix

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Avatar.Image size={48} source={{ uri: "https://via.placeholder.com/50" }} />
                <Text style={styles.headerText}>Welcome, User!</Text>
            </View>

            {/* Navigation Cards */}
            <View style={styles.cardsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Connections")}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Users size={24} />
                            <Text style={styles.cardText}>My Connections</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Boundaries")}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Heart size={24} />
                            <Text style={styles.cardText}>Boundaries</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Matches")}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Heart size={24} />
                            <Text style={styles.cardText}>Matches</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Settings size={24} />
                            <Text style={styles.cardText}>Settings</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("NewConnection")}>
                <Plus size={24} color="white" />
            </TouchableOpacity>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 16,
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        fontSize: 18,
        marginLeft: 12,
    },
    floatingButton: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "#3b82f6",
        padding: 16,
        borderRadius: 50,
        elevation: 4,
    },
});

export default MainScreen;
