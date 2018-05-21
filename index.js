import { AppRegistry } from 'react-native';
import App from './src/App';

const app = new App();
console.disableYellowBox = true;

AppRegistry.registerComponent('htwgCampus', () => app);
