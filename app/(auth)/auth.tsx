import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Text,
  useTheme
} from 'react-native-paper';
import { login, register, resetPassword } from '../services/AuthenticationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isRegister = mode === 'register';
  const isReset = mode === 'reset';
  const theme = useTheme();

  const handleSubmit = async () => {
    try {
      if (mode === 'login') {
        const user = await login(email, password);
        await AsyncStorage.setItem('authToken', user.token); // Save token
        Alert.alert('Login Success', `Logged in as ${user.user.email}`);
      } else if (mode === 'register') {
        const newUser = await register(name, email, password, confirmPassword);
        Alert.alert('Registration Success', `Registered as ${newUser.email}`);
      } else if (mode === 'reset') {
        const result = await resetPassword(email);
        Alert.alert('Password Reset', result.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {isRegister ? 'Register' : isReset ? 'Reset Password' : 'Login'}
      </Title>

      {isRegister && (
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          mode="outlined"
          style={styles.input}
        />
      )}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />

      {!isReset && (
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
      )}

      {isRegister && (
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 12 }}
      >
        {isRegister ? 'Register' : isReset ? 'Reset Password' : 'Login'}
      </Button>

      <View style={styles.switchContainer}>
        {isRegister || isReset ? (
          <Button onPress={() => setMode('login')} compact>
            Back to Login
          </Button>
        ) : (
          <View style={styles.linkContainer}>
            <Button onPress={() => setMode('register')} compact>
              Don't have an account?
            </Button>
            <Button onPress={() => setMode('reset')} compact>
              Forgot Password?
            </Button>
          </View>
        )}
      </View>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
