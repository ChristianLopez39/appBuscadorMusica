import { View, Text, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import stylesBusqueda from '../Resources/Styles/LetraStyle'
import React, { useState, useEffect } from 'react';
import { getMusicaDb, } from '../SqlLiteService/SqlLiteService'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';



const MisLetrasScreen = ({ navigation }) => {

    const [listMusica, setListaMusica] = useState([])

    //FUNCION QUE SE EJECUTA AL INICIAR EL SCREEN
    useEffect(() => {
        getMusicaDb().then((resp) => {
            console.log("res" + resp)
            setListaMusica(resp)
        }
        ).catch((err) => {
            console.log("err" + err)
        }
        )
    }, [1])


    //FUNCION PARA BUSCAR LA MUSICA
    const buscarMusica = (titulo, artista, letraCancion) => {
        console.log("buscarMusica")
        console.log("artista::::: }}} " + artista)
        console.log("titulo:::: --- " + titulo)

        //SE NAVEGA A LA SIGUIENTE PANTALA
        navigation.navigate('LetraCancionScreen', {
            resp: { lyrics: letraCancion },
            artista: artista,
            titulo: titulo
        });
    }


    function Item({ item }) {
        return (
            <TouchableOpacity style={stylesBusqueda.lista} onPress={() => buscarMusica(item.titulo, item.artista, item.letraCancion)}>
                <Text style={stylesBusqueda.tituloLista}>Titulo: {''} {item.titulo}</Text>
                <Text style={stylesBusqueda.tituloLista}>Artista: {''}  {item.artista}</Text>
            </TouchableOpacity>
        );
    }

    if (listMusica.length == 0) {

        return (
            < ImageBackground source={require('../Resources/Imagenes/fondo.jpg')} style={stylesBusqueda.menuPrincipal}>
                <View style={stylesBusqueda.menuPrincipal}>
                    <View style={stylesBusqueda.icono}>
                        <Icon name='music' size={hp('15%')}></Icon>
                    </View>
                    <Text style={stylesBusqueda.titulo} >No hay letras de canciones guardadas</Text>
                </View>
            </ImageBackground>
        )
    } else {
        //VISTA DONDE SE MUESTRA LA INFORMACION OBTENIDA
        return (
            < ImageBackground source={require('../Resources/Imagenes/fondo.jpg')} style={{ width: '100%', height: '100%' }}>
                <ScrollView>
                    <View style={stylesBusqueda.menuPrincipal}>
                        <View >
                            <View>
                                <FlatList
                                    data={listMusica}
                                    renderItem={({ item }) => (
                                        <Item
                                            id={item.id}
                                            item={item}

                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>
        )
    }


}


export default MisLetrasScreen;