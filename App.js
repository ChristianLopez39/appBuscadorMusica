import React from 'react';
import { View, Text } from 'react-native'
import BusquedaMusicaScreen from './busqueda/Screens/BusquedaMusicaScreen'
import NavigationBusqueda from './busqueda/Navigation/NavigationBusqueda'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <NavigationBusqueda></NavigationBusqueda>
        </NavigationContainer>
    )
}


export default App;