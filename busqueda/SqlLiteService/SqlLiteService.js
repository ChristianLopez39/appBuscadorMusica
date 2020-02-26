
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'prueba.db' });

/**
 * Metodo que se encarga de inicializar la tabla de listaMusica
 */
 function initMusica() {
    return new Promise((resolve, reject) => {

        db.transaction((txn0) => {
            txn0.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='musica'",
                [],
                (tx1, res1) => {
                    if (res1.rows.length == 0) {
                        tx1.executeSql('DROP TABLE IF EXISTS musica', [],
                            (tx3) => {
                                tx3.executeSql(
                                    'CREATE TABLE IF NOT EXISTS musica(' +
                                    'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                                    'artista TEXT, ' +
                                    'titulo TEXT, ' +
                                    'letraCancion TEXT)',
                                    [],
                                    function () {
                                        resolve({ msg: 'Exitoso.' });
                                    },
                                    function (tx6, err6) {
                                        reject({ msg: 'error' + err6 });
                                    },
                                    function (tx4, res4) {
                                        reject({ msg: 'error.' + tx4 + res4 });
                                    }

                                );
                            }
                        )

                    } else {
                        resolve({ msg: 'La tabla ya existe.' });
                    }
                },
                function (tx2, err2) {
                    reject({ tx: tx2, err: err2, msg: 'Error 2' });
                }
            );
        });//Fin dbtransaction 0
    });
}

/**Se gurda la información  */
function guardaMusica(artista, titulo, letraCancion) {
    return new Promise((resolve, reject) => {
        console.log('guardar');

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT OR REPLACE INTO musica ' +
                '(artista, titulo, letraCancion) ' +
                'VALUES (?,?,?)',
                [artista, titulo, letraCancion ],
                (tx, results) => {
                    console.log('guardar musica', results.rows.item(1));
                    resolve(true);
                },
                (err) => {
                    console.log('error' +  JSON.stringify(err));
                    reject({
                        mensajeError: 'error'
                    });
                }
            );
        });
    });
}

 function getMusicaDb(order) {
    return new Promise((resolve, reject) => {
        console.log('entro::::::');
        if (order == null) {
            order = 'id';
        }
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM musica ORDER BY ?',
                [order],
                (tx, results) => {
                    console.log('musica:: ', results.rows.length);
                    /**Se valida si hay datos en en la base de datos */
                    if (results.rows.length !== 0) {
                        console.log('datos:::::');
                        var tempDataArray = [];
                        for (var i = 0; i < results.rows.length; i++) {
                            console.log('musica', results.rows.item(i).proyecto);
                            tempDataArray.push({
                                artista: results.rows.item(i).artista,
                                titulo: results.rows.item(i).titulo,
                                letraCancion: results.rows.item(i).letraCancion,
                                
                            });
                        }
                        resolve(tempDataArray);
                    } else {
                        console.log('Error');
                        var tempDataArray = [];
                        resolve(tempDataArray);
                    }
                },
                (tx, err) => {
                    console.log('error', err);
                    reject({
                        mensajeError: 'Ocurrió un error al recuperar datos'
                    });
                }
            );
        });
    });
}

const methods = {
    initMusica,
    guardaMusica,
    getMusicaDb,
};

module.exports = methods;

