import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation';
import { auth } from './firebase';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

