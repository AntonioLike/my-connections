import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { getUserToken, requestLink, getConfirmedLinks, deleteLink } from '../../services/LinkService';

const LinkScreen = () => {
    const [userToken, setUserToken] = useState('');
    const [targetToken, setTargetToken] = useState('');
    const [linkedUsers, setLinkedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserToken();
        fetchLinkedUsers();
    }, []);

    const fetchUserToken = async () => {
        try {
            const token = await getUserToken();
            setUserToken(token);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch user token');
        }
    };

    const fetchLinkedUsers = async () => {
        try {
            setLoading(true);
            const links = await getConfirmedLinks();
            setLinkedUsers(links);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch linked users');
            setLoading(false);
        }
    };

    const handleRequestLink = async () => {
        try {
            const response = await requestLink(userToken, targetToken);
            Alert.alert('Success', response.message);
            fetchLinkedUsers();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleDeleteLink = async (targetUserToken) => {
        try {
            const response = await deleteLink(userToken, targetUserToken);
            Alert.alert('Success', response.message);
            fetchLinkedUsers();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Links</Text>

            {/* Display User Token */}
            <Text style={styles.userToken}>Your Token: {userToken || 'Loading...'}</Text>

            {/* Link Request Section */}
            <TextInput
                style={styles.input}
                placeholder="Enter user token to link"
                value={targetToken}
                onChangeText={setTargetToken}
                autoCapitalize="none"
            />
            <Button title="Request Link" onPress={handleRequestLink} />

            {/* Linked Users List */}
            <Text style={styles.subtitle}>Linked Users</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : linkedUsers.length > 0 ? (
                <FlatList
                    data={linkedUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.linkItem}>
                            <Text>{item.user1.userToken === userToken ? item.user2.userToken : item.user1.userToken}</Text>
                            <TouchableOpacity onPress={() => handleDeleteLink(item.user1.userToken === userToken ? item.user2.userToken : item.user1.userToken)}>
                                <Text style={styles.deleteText}>Unlink</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text>No linked users yet.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userToken: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    deleteText: {
        color: 'red',
        textDecorationLine: 'underline',
    },
});

export default LinkScreen;
