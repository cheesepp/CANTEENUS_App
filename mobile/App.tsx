import MainContainer from './src/routes/MainContainer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App() {
  const Stack = createNativeStackNavigator();
  return (
    <MainContainer/>
  );
}

export default App;