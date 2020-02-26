
import { ipServicioMusica } from '../Utils/conexion'


const obtenerLetra = (artista, titulo) =>
    new Promise((resolve, reject) => {
        console.log('url', ipServicioMusica +  artista + '/'+ titulo );
        fetch(ipServicioMusica +  artista + '/'+ titulo, {
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {

                console.log('response:: ', response);

                if (response.status == 404) {
                    reject({
                        mensajeError: 'No se encontro la letra de la canción'
                    });

                }else {
                    return  response.json()
                }

            })
            .then(responseJson => {
                console.log('responseJson: ', responseJson);
                resolve(responseJson)

            })
            .catch(function (error) {
                console.log('Request failed', error);
                reject({
                    mensajeError: 'error'
                });
            });
    });


const methods = {
    obtenerLetra,
};

module.exports = methods;