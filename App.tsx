import React, { useState, createContext, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Switch, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Create Theme Context
const ThemeContext = createContext();

// Define Stack Navigator
const Stack = createStackNavigator();

// Project Data
const projects = [
  { id: 1, name: '🚀 React Native Portfolio', description: 'A personal portfolio app built with React Native, featuring navigation, dark mode, and project listings.' },
  { id: 2, name: '📱 Mobile App Development', description: 'A collection of mobile apps developed using React Native.' },
  { id: 3, name: '🌐 Web Development', description: 'A set of responsive websites and web applications built using React, and modern web technologies.' }
];

// Theme Provider (Manages Dark Mode Globally)
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to Use Dark Mode State
const useTheme = () => useContext(ThemeContext);

// Home Screen
const HomeScreen = ({ navigation }) => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, darkMode ? darkStyles.background : lightStyles.background]}>
      <Image source={require('./assets/478164164_8728803643890386_444915441217213441_n.jpg')} style={styles.profilePic} />
      <Text style={[styles.name, darkMode ? darkStyles.text : lightStyles.text]}>Yohann Nicholo Matibag</Text>
      <Text style={[styles.bio, darkMode ? darkStyles.text : lightStyles.text]}>Passionate student developer specializing in React, React Native, and Web Development.</Text>
      
      <Text style={[styles.sectionTitle, darkMode ? darkStyles.text : lightStyles.text]}>Skills</Text>
      <View style={styles.skillList}>
        <Text style={[styles.skillItem, darkMode ? darkStyles.text : lightStyles.text]}>⚛️ React & React Native</Text>
        <Text style={[styles.skillItem, darkMode ? darkStyles.text : lightStyles.text]}>🌐 Web Development</Text>
        <Text style={[styles.skillItem, darkMode ? darkStyles.text : lightStyles.text]}>📱 Mobile App Development</Text>
        <Text style={[styles.skillItem, darkMode ? darkStyles.text : lightStyles.text]}>🛠️ UI/UX Design</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Projects')}>
        <Text style={styles.buttonText}>View Projects</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, darkMode ? darkStyles.text : lightStyles.text]}>Contact</Text>
      <Text style={[styles.contactInfo, darkMode ? darkStyles.text : lightStyles.text]} onPress={() => Linking.openURL('mailto:yohann_nicholo_matibag@dlsl.edu.ph')}>
        📧 yohann_nicholo_matibag@dlsl.edu.ph
      </Text>
      <Text style={[styles.contactInfo, darkMode ? darkStyles.text : lightStyles.text]} onPress={() => Linking.openURL('https://github.com/yoHannic')}>
        🔗 GitHub: github.com/yoHannic
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.toggleText, darkMode ? darkStyles.text : lightStyles.text]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>
    </SafeAreaView>
  );
};

// Projects Screen (Now Uses Global Dark Mode)
const ProjectsScreen = ({ navigation }) => {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SafeAreaView style={[styles.container, darkMode ? darkStyles.background : lightStyles.background]}>
      <Text style={[styles.title, darkMode ? darkStyles.text : lightStyles.text]}>My Projects</Text>
      
      {/* Styled Project List */}
      <View style={styles.projectList}>
        {projects.map((project) => (
          <TouchableOpacity 
            key={project.id} 
            style={[styles.projectCard, darkMode ? darkStyles.card : lightStyles.card]}
            onPress={() => setSelectedProject(project.id)}
          >
            <Text style={[styles.projectTitle, darkMode ? darkStyles.text : lightStyles.text]}>{project.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Project Description */}
      {selectedProject !== null && (
        <View style={styles.descriptionBox}>
          <Text style={[styles.descriptionText, darkMode ? darkStyles.text : lightStyles.text]}>{projects.find(p => p.id === selectedProject)?.description}</Text>
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
  card: { backgroundColor: '#fff' },
};
const darkStyles = {
  background: { backgroundColor: '#121212' },
  text: { color: '#fff' },
  card: { backgroundColor: '#1E1E1E' },
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
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Projects" component={ProjectsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
