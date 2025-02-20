import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, Switch, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

const projects = [
  { id: 1, name: '🚀 React Native Portfolio', description: 'A personal portfolio app built with React Native.' },
  { id: 2, name: '📱 Mobile App Development', description: 'A collection of mobile apps using React & MongoDB' },
  { id: 3, name: '🌐 Web Development', description: 'A set of responsive websites built with modern web technologies.' }
];

const HomeScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);
  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.background]}>
      <Image source={{ uri: '455048186_866652358677864_6298729169398841382_n.jpg' }} style={styles.profilePic} />
      <Text style={[styles.name, themeStyles.text]}>Yohann Nicholo Matibag</Text>
      <Text style={[styles.bio, themeStyles.text]}>Passionate developer specializing in React Native and other web development softwares.</Text>
      <Button title="View Projects" onPress={() => navigation.navigate('Projects', { darkMode })} />
      <View style={styles.switchContainer}>
        <Text style={[styles.toggleText, themeStyles.text]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
    </SafeAreaView>
  );
};

const ProjectsScreen = ({ route, navigation }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const darkMode = route.params?.darkMode || false;
  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.background]}>
      <Text style={[styles.title, themeStyles.text]}>My Projects</Text>
      {projects.map((project) => (
        <TouchableOpacity key={project.id} onPress={() => setSelectedProject(project.id)}>
          <Text style={[styles.projectItem, selectedProject === project.id && styles.selectedItem]}>{project.name}</Text>
        </TouchableOpacity>
      ))}
      {selectedProject !== null && (
        <View style={[styles.descriptionBox, themeStyles.background]}>
          <Text style={[styles.descriptionText, themeStyles.text]}>{projects.find(p => p.id === selectedProject)?.description}</Text>
        </View>
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const lightStyles = {
  background: { backgroundColor: '#f8f9fa' },
  text: { color: '#333' },
};
const darkStyles = {
  background: { backgroundColor: '#121212' },
  text: { color: '#fff' },
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold' },
  bio: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  toggleText: { fontSize: 16, marginRight: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  projectItem: { fontSize: 18, marginVertical: 5, color: '#007bff' },
  selectedItem: { fontWeight: 'bold', textDecorationLine: 'underline' },
  descriptionBox: { marginTop: 10, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', width: '90%' },
  descriptionText: { fontSize: 16, textAlign: 'center' },
});

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
