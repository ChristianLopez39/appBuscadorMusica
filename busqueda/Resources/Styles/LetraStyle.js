
import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    fon
} from 'react-native-responsive-screen';

export default {
    menuPrincipal: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'transparent',
        alignItem: 'center',
        alignContent: 'center'
    },
    menuPrincipaloader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    mainContenido: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'transparent'
    },
    icono: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: hp('4%')
    },
    margen: {
        marginBottom: hp('4%')
    },
    vistaTitulo: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    titulos: {
        fontSize: hp('3%'),
        color: '#0A9DBA'
    },
    titulo: {
        fontSize: hp('2%'),
        fontWeight: '600',
        color: "#F7F3F3",
        textAlign: 'center',
    },
    lista: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    tituloLista: {
        fontSize: hp('2%'),
        fontWeight: '600',
       
    },


}