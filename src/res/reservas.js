// import reservasJson from './reservas.json';
// export const reservas = reservasJson.slice(6890);
import { obtenerFirestore } from '../res/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export async function obtenerReservas() {
    const db = obtenerFirestore();
    const reservasRef = collection(db, 'reservas');
    const reservasSnap = await getDocs(reservasRef)
    const reservas = reservasSnap.docs.map( doc => doc.data());
    return reservas;
}