import { Document } from 'mongoose';

export interface Habitat extends Document {
    title: string,
    body: string,
    idClient: number,
    habitatNumber: String,
    idReservation: string,
    idSession: string
};