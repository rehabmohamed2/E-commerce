import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { styles } from '../styles/SignupScreenStyles';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');

  const { signup } = useAuth();

  const validateName = (name) => {
    if (!name) {
      setNameError('Name is required');
      return false;
    }
    if (name.length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateAddress = (address) => {
    if (!address) {
      setAddressError('Address is required');
      return false;
    }
    setAddressError('');
    return true;
  };

  const validateCity = (city) => {
    if (!city) {
      setCityError('City is required');
      return false;
    }
    setCityError('');
    return true;
  };

  const validateCountry = (country) => {
    if (!country) {
      setCountryError('Country is required');
      return false;
    }
    setCountryError('');
    return true;
  };

  const validatePinCode = (pinCode) => {
    if (!pinCode) {
      setPinCodeError('PIN code is required');
      return false;
    }
    if (!/^\d{6}$/.test(pinCode)) {
      setPinCodeError('PIN code must be 6 digits');
      return false;
    }
    setPinCodeError('');
    return true;
  };

  const submitHandler = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isAddressValid = validateAddress(address);
    const isCityValid = validateCity(city);
    const isCountryValid = validateCountry(country);
    const isPinCodeValid = validatePinCode(pinCode);

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isAddressValid &&
      isCityValid &&
      isCountryValid &&
      isPinCodeValid
    ) {
      try {
        const userData = {
          name,
          email,
          password,
          address,
          city,
          country,
          pinCode,
        };
        await signup(userData);
      } catch (error) {
        Alert.alert('Error', error.message || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateName(text);
            }}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateConfirmPassword(text);
            }}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              validateAddress(text);
            }}
          />
          {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              validateCity(text);
            }}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your country"
            value={country}
            onChangeText={(text) => {
              setCountry(text);
              validateCountry(text);
            }}
          />
          {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PIN Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your PIN code"
            value={pinCode}
            onChangeText={(text) => {
              setPinCode(text);
              validatePinCode(text);
            }}
            keyboardType="numeric"
            maxLength={6}
          />
          {pinCodeError ? <Text style={styles.errorText}>{pinCodeError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
