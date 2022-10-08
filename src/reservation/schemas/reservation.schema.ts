import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: [true, 'DESCRITION_IS_BLANK'],
    },
    percentage: {
      type: Number,
      required: [true, 'PERCENTAGE_IS_BLANK'],
    }, 
    limitHabitat: {
      type: Number,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
