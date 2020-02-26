
import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
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
    },
    titulo: {
        fontSize:  hp('3%'),
        fontWeight: '600',
        color: Colors.dark,
        textAlign: 'center',
    },


}