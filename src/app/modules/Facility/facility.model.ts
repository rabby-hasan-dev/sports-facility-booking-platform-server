import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const FacilitySchema = new Schema<TFacility>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

export const Facility = model<TFacility>('Facility', FacilitySchema);
