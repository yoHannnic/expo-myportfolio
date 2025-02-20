import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, Switch, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Define Stack Navigator
const Stack = createStackNavigator();

// Project Data
const projects = [
  { 
    id: 1, 
    name: '🚀 React Native Portfolio', 
    description: 'A personal portfolio app built with React Native, featuring navigation, dark mode, and project listings.'
  },
  { 
    id: 2, 
    name: '📱 Mobile App Development', 
    description: 'A collection of mobile apps developed using React Native and Flutter for different use cases.'
  },
  { 
    id: 3, 
    name: '🌐 Web Development', 
    description: 'A set of responsive websites and web applications built using React, Next.js, and modern web technologies.'
  }
];

// Home Screen
const HomeScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  // Dynamic Styles
  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.background]}>
      <Image source={{ uri: 'https://your-profile-pic-url.com' }} style={styles.profilePic} />
      <Text style={[styles.name, themeStyles.text]}>Yohann Nicholo Matibag</Text>
      <Text style={[styles.bio, themeStyles.text]}>
        Passionate student developer specializing in React, React Native, and Web Development.
      </Text>
      
      <Text style={[styles.sectionTitle, themeStyles.text]}>Skills</Text>
      <View style={styles.skillList}>
        <Text style={[styles.skillItem, themeStyles.text]}>⚛️ React & React Native</Text>
        <Text style={[styles.skillItem, themeStyles.text]}>🌐 Web Development</Text>
        <Text style={[styles.skillItem, themeStyles.text]}>📱 Mobile App Development</Text>
        <Text style={[styles.skillItem, themeStyles.text]}>🛠️ UI/UX Design</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Projects')}>
        <Text style={styles.buttonText}>View Projects</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, themeStyles.text]}>Contact</Text>
      <Text style={[styles.contactInfo, themeStyles.text]} onPress={() => Linking.openURL('Email: yohann_nicholo_matibag@dlsl.edu.ph')}>
        📧 yohann_nicholo_matibag@dlsl.edu.ph
      </Text>
      <Text style={[styles.contactInfo, themeStyles.text]} onPress={() => Linking.openURL('https://github.com/yoHannic')}>
        🔗 GitHub: github.com/yoHannic
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.toggleText, themeStyles.text]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
    </SafeAreaView>
  );
};

// Projects Screen
const ProjectsScreen = ({ navigation }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Projects</Text>
      
      {/* Styled Project List */}
      <View style={styles.projectList}>
        {projects.map((project) => (
          <TouchableOpacity 
            key={project.id} 
            style={styles.projectCard} 
            onPress={() => setSelectedProject(project.id)}
          >
            <Text style={styles.projectTitle}>{project.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Project Description */}
      {selectedProject !== null && (
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{projects.find(p => p.id === selectedProject)?.description}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Light and Dark Theme Styles
const lightStyles = {
  background: { backgroundColor: '#f8f9fa' },
  text: { color: '#333' },
};
const darkStyles = {
  background: { backgroundColor: '#121212' },
  text: { color: '#fff' },
};

// General Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  skillList: {
    alignItems: 'center',
    marginBottom: 20,
  },
  skillItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  contactInfo: {
    fontSize: 16,
    marginVertical: 3,
    textDecorationLine: 'underline',
    color: '#007bff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
  },
  projectList: {
    width: '100%',
    marginTop: 10,
  },
  projectCard: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  projectTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007bff' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
