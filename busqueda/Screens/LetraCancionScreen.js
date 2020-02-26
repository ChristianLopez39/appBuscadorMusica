import { View, Text, ScrollView, ImageBackground, Button, Alert } from 'react-native'
import stylesBusqueda from '../Resources/Styles/LetraStyle'
import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { initMusica, guardaMusica, getMusicaDb, } from '../SqlLiteService/SqlLiteService'

const LetraCancionScreen = ({ route }) => {

    //VARIABLES
    const [letra, setLetra] = useState('');
    const [artista, setArtista] = useState('')
    const [titulo, setTitulo] = useState('')
    const [desahilitarBoton, setDesabilitarBoton] = useState(false)

    //FUNCION QUE SE EJECUTA AL INICIAR EL SCREEN
    useEffect(() => {

        //CREACION DE TABLA
        initMusica();

        //SE OBTIENEN DATOS DE LA PAGINA ANTERIOS
        const { resp } = route.params;
        const { artista } = route.params;
        const { titulo } = route.params;

        //SE ASIGNA LOS VALORES 
        setArtista(artista)
        setTitulo(titulo)
        setLetra(resp.lyrics);

        //VALIDAR QUE LA CANCIÓN NO SE ENCUENTRE ALAMACENADA EN MIS LETRAS
        getMusicaDb().then((resp) => {
            console.log("res::::::::: " + JSON.stringify(resp))
            console.log("res::::::::: " + JSON.stringify(resp.length))

            if (resp.length !== 0) {
                console.log("si entro ayudaaaaa ")

                for (var x = 0; x < resp.length; x++) {
                    console.log("resp[x].artista: " + resp[x].artista)
                    console.log("artista: " + artista)

                    console.log("resp[x].titlo: " + resp[x].titulo)
                    console.log("titulo: " + titulo)

                    if (resp[x].artista.trim() === artista.trim() && resp[x].titulo.trim() === titulo.trim()) {
                        setDesabilitarBoton(true);
                        break;
                    } else {
                        console.log("guardar")
                    }
                }
            } else {
                console.log("guardar::::::::::::::::::")
            }
        }
        ).catch((err) => {
            console.log("err" + err)
        })

    }, [1])


    //GUARDAR MUSICA
    const guardarMusicaLocal = () => {
        console.log("guardar::::::::::::::::::")
        guardaMusica(artista, titulo, letra).then(
            (resp) => {
                console.log("res" + resp);
                Alert.alert('La cancion fue almacenada con éxito');
                setDesabilitarBoton(true);
            }
        ).catch((err) => {
            console.log("err" + err);

        })
    }



    //VISTA DONDE SE MUESTRA LA INFORMACION OBTENIDA
    return (
        < ImageBackground source={require('../Resources/Imagenes/fondo.jpg')} style={{ width: '100%', height: '100%' }}>
            <ScrollView>
                <View style={stylesBusqueda.menuPrincipal}>
                    <View >
                        <View style={stylesBusqueda.icono}>
                            <Icon name='music' size={hp('15%')}></Icon>
                        </View>
                        <View style={stylesBusqueda.margen} />
                        <View style={stylesBusqueda.vistaTitulo} >
                            <Text style={stylesBusqueda.titulos}>Artista:  {''}  {artista} </Text>
                            <Text style={stylesBusqueda.titulos}  >Titulo:  {''} {titulo}</Text>
                        </View>
                        <View style={stylesBusqueda.margen} />
                        <View>
                            <Text style={stylesBusqueda.titulo}>
                                {letra}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginTop: hp('5%'), width: wp('100%') }}>
                <Button
                    title='Guardar'
                    onPress={guardarMusicaLocal}
                    containerStyle={{ width: wp('50%'), backgroundColor: 'blue' }}
                    disabled={desahilitarBoton}
                />
            </View>
        </ImageBackground>
    )

}


export default LetraCancionScreen;
