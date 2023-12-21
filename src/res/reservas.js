// import reservasJson from './reservas.json';
// export const reservas = reservasJson.slice(6890);
import { obtenerFirestore } from '../res/firebase.js';
import { getDoc, doc } from 'firebase/firestore';

export async function obtenerReservas() {
    const db = obtenerFirestore();
    const reservasRef = doc(db, 'indicadores', "reservas");
    const reservasSnap = await getDoc(reservasRef);

    let reservas = reservasSnap.data();
    reservas.serie.sort( (a,b) => {
        let aDate = new Date(a.d);
        let bDate = new Date(b.d);
        return aDate - bDate;
    });

    return reservas.serie;
}

export async function obtenerMillerstones() {
    const db = obtenerFirestore();
    const millerstonesRef = doc(db, 'indicadores', "millerstones");
    const millerstonesSnap = await getDoc(millerstonesRef);

    let millerstones = millerstonesSnap.data();
    millerstones.serie.sort( (a,b) => {
        let aDate = new Date(a.d);
        let bDate = new Date(b.d);
        return aDate - bDate;
    });

    return millerstones.serie;
}