import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import BicycleList from './components/BicycleList';
import AddBicycle from './components/AddBicycle';
import BicycleDetail from './components/BicycleDetails'

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BicycleList">
        <Stack.Screen name="BicycleList" component={BicycleList} />
        <Stack.Screen name="AddBicycle" component={AddBicycle} />
        <Stack.Screen name="BicycleDetail" component={BicycleDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
