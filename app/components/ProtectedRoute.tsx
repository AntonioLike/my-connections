import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                navigation.replace("Auth"); // Redirect to login if no token
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, [navigation]);

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
