import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { login, register, resetPassword } from '../../services/AuthenticationService'; // Import the services

const AuthScreen = () => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'reset'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isRegister = mode === 'register';
  const isReset = mode === 'reset';

  const handleSubmit = async () => {
    try {
      if (mode === 'login') {
        const user = await login(email, password);
        Alert.alert('Login Success', `Logged in as ${user.email}`);
      } else if (mode === 'register') {
        const newUser = await register(name, email, password, confirmPassword);
        Alert.alert('Registration Success', `Registered as ${newUser.email}`);
      } else if (mode === 'reset') {
        const result = await resetPassword(email);
        Alert.alert('Password Reset', result.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegister ? 'Register' : isReset ? 'Reset Password' : 'Login'}
      </Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          autoCapitalize="none"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {!isReset && (
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      )}

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      )}

      <Button title={isRegister ? 'Register' : isReset ? 'Reset Password' : 'Login'} onPress={handleSubmit} />

      <View style={styles.switchContainer}>
        {isRegister || isReset ? (
          <TouchableOpacity onPress={() => setMode('login')}>
            <Text style={styles.switchText}>Back to Login</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => setMode('register')}>
              <Text style={styles.switchText}>Don't have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('reset')}>
              <Text style={styles.switchText}>Forgot Password?</Text>
            </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  linkContainer: {
    marginTop: 15,
  },
});

export default AuthScreen;
