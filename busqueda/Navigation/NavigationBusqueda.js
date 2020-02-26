import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusquedaMusicaScreen from '../Screens/BusquedaMusicaScreen'
import LetraCancionScreen from '../Screens/LetraCancionScreen'
import MisLetrasScreen from '../Screens/MisLetrasScreen'


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BusquedaMusicaScreen" component={BusquedaMusicaScreen} options={{
                //title: 'Buscador letra de canción',
                headerShown: false,
            }} />
            <Stack.Screen name="LetraCancionScreen" component={LetraCancionScreen} options={{ title: 'Letra de canción' }} />
            <Stack.Screen name="MisLetrasScreen" component={MisLetrasScreen} options={{ title: 'Mis canciones' }} />
        </Stack.Navigator>
    );
}

export default MyStack;