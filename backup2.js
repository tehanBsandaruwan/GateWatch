import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  Text,
  NativeBaseProvider,
  Box,
  extendTheme,
  Button,
  FormControl,
  Input,
  Heading,
  VStack,
  HStack,
  Link,
  Center,
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    amber: {
      400: '#d97706',
    },
    background: '#C5E4F3', // Light blue background color
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const Tab = createBottomTabNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    // Perform login authentication logic here
    setAuthenticated(true);
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {authenticated ? (
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Other" component={OtherScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
              name="Settings"
              options={{ tabBarLabel: 'Settings' }}
            >
              {() => <SettingsScreen onLogout={handleLogout} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : showSignup ? (
          <SignupView onSignup={handleSignup} />
        ) : (
          <LoginView onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const [apartmentNo, setApartmentNo] = useState('');


const HomeScreen = () => {
  return (
    <Box bg="#C5E4F3" width="100%" height="1000px" alignSelf="center">
      <Box alignItems="center" bg="#A2D4EC" width="100%" height="100px" alignSelf="center">
      <Text
            fontSize="xl"
            fontWeight="bold"
            mt="3"
            fontFamily="cursive"
            color="#000000"
          >
      Apartment No/House Address:
      </Text>
      </Box>
      
    </Box>
  );
};

const OtherScreen = () => {
  return (
    <Box>
      <Text>Other</Text>
    </Box>
  );
};

const SettingsScreen = ({ onLogout }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    onLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Center flex={1}>
      <Box>
        <Text>Welcome to the Settings Screen!</Text>
        <Button onPress={handleLogout} title="Logout" />
      </Box>
    </Center>
  );
};

const LoginView = ({ onLogin, onSignup }) => {
  return (
    <Center flex={1}>
    <Box p="2" w="90%" maxW="290">
        <Box alignItems="center">
        <Image
            source={{ uri: 'https://thumbs.dreamstime.com/z/security-company-employee-portable-radio-front-closed-security-gate-guard-safety-external-protection-concept-117843761.jpg' }}
            style={{ width: 200, height: 200 }}
          />
           <Text
            fontSize="xl"
            fontWeight="bold"
            mt="3"
            fontFamily="cursive"
            color="#CCCCCC"
          >
            <Text color="#AAAAAA">Gate</Text>
            <Text color="#AAAAAA">W</Text>
            <Text color="#AAAAAA">a</Text>
            <Text color="#AAAAAA">t</Text>
            <Text color="#AAAAAA">c</Text>
            <Text color="#AAAAAA">h</Text>
          </Text>
        </Box>
        </Box>

      <Box p="2" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={onLogin}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'blue.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={onSignup}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

const SignupView = ({ onSignup }) => {
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{ color: 'warmGray.50' }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{ color: 'warmGray.200' }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Apartment No:/House Address</FormControl.Label>
            <Input type="string" />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onSignup}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
