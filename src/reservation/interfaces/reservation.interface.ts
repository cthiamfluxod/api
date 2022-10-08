import { Document } from 'mongoose';

export interface Reservation extends Document {
    description: string,
    percentage: number,
    limitHabitat: number 
};