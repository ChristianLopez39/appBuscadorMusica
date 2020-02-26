import { View, Text, Alert, ImageBackground } from 'react-native'
import stylesBusqueda from '../Resources/Styles/BusquedaStyle'
import { SearchBar, Input, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { obtenerLetra } from '../Services/BusquedaService'
import { MusicBarLoader, TextLoader } from 'react-native-indicator';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


import { initMusica, guardaMusica, getMusicaDb, } from '../SqlLiteService/SqlLiteService'

const BusquedaMusicaScreen = ({ navigation }) => {


    //VARIABLES
    const [search, setSearh] = useState('');
    const [artista, setArtista] = useState('')
    const [titulo, setTitulo] = useState('')
    const [loader, setLoader] = useState(false)



    const updateSearch = search => {
        console.log("Busqueda" + search)
        setSearh(search)
    }

    const obtenerMisLetras = () => {
        console.log('obtenerMisLetras');
        setLoader(false);
        //SE NAVEGA A LA SIGUIENTE PANTALA
        navigation.navigate('MisLetrasScreen');
    }


    //FUNCION PARA BUSCAR LA MUSICA
    const buscarMusica = () => {
        setLoader(true);
        console.log("buscarMusica")
        console.log("artista" + artista)
        console.log("titulo" + titulo)

        //SE OBTIENE LA CACION
        obtenerLetra(artista, titulo).then(
            (resp) => {
                setLoader(false);
                //SE NAVEGA A LA SIGUIENTE PANTALA
                navigation.navigate('LetraCancionScreen', {
                    resp: resp,
                    artista: artista,
                    titulo: titulo
                });

                //SE LIMPIAN LOS DATOS
                setArtista('')
                setTitulo('')
            }
        ).catch(
            (err) => {
                console.log("err::: " + err)
                setLoader(false);
                Alert.alert(err.mensajeError)
            }

        )
    }

    const onChangeText = (text) => {
        console.log("text" + text)
        setArtista(text);
    }

    const onChangeTextTitulo = (text) => {
        console.log("text" + text)
        setTitulo(text);
    }

    if (loader) {
        return (
            <View style={stylesBusqueda.menuPrincipaloader}>
                <MusicBarLoader />
                <TextLoader text="cargando" />
            </View>
        )
    } else {
        return (
            < ImageBackground source={require('../Resources/Imagenes/fondo.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={stylesBusqueda.menuPrincipal}>
                    <View style={stylesBusqueda.menuPrincipal} >
                        <View style={{ marginBottom: hp('5%') }}>
                            <Text style={stylesBusqueda.titulo}>
                                Buscar Letra de canción
                    </Text>
                        </View>
                        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginTop: hp('1.5%') }}>
                                <Input
                                    placeholder='Ingresa el nombre del artista'
                                    onChangeText={text => onChangeText(text)}
                                    value={artista}
                                    containerStyle={{ width: wp('90%') }}
                                />
                            </View>
                            <View style={{ marginTop: hp('1.5%') }}>
                                <Input
                                    placeholder='Ingresa el titulo de la canción'
                                    onChangeText={text => onChangeTextTitulo(text)}
                                    value={titulo}
                                    containerStyle={{ width: wp('90%') }}
                                />

                            </View>

                            <View style={{ marginTop: hp('5%') }}>
                                <Button
                                    title='Buscar'
                                    onPress={buscarMusica}
                                    disabled={artista === '' || titulo === ''}
                                    containerStyle={{ width: wp('80%'), backgroundColor: 'blue' }}
                                />
                            </View>
                            <View style={{ marginTop: hp('5%') }}>
                                <Button
                                    title='Mis letras'
                                    onPress={obtenerMisLetras}
                                    containerStyle={{ width: wp('80%'), backgroundColor: 'blue' }}
                                />
                            </View>

                        </View>

                        {/* <SearchBar
                        placeholder="Buscar.."
                        onChangeText={updateSearch}
                        value={search}
                    /> */}

                    </View>

                </View>
            </ImageBackground>
        )
    }



}


export default BusquedaMusicaScreen;