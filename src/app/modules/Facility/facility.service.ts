import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";



const getFacilityIntoDB = async () => {

    const result = await Facility.find({})

    return result;


}
const createdFacilityIntoDB = async (payload: TFacility) => {

    const result = await Facility.create(payload);

    return result;


}

const updatedFacilityIntoDB = async (payload: Partial<TFacility>, id: string) => {

    const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
    return result;


}

const deleteFacilityIntoDB = async (id: string) => {

    const result = await Facility.findByIdAndDelete(id);
    return result;


}



export const facilityServices = {
    getFacilityIntoDB,
    createdFacilityIntoDB,
    updatedFacilityIntoDB,
    deleteFacilityIntoDB
}