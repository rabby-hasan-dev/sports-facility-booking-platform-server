import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";



const getFacilityIntoDB = async () => {

    const result = await Facility.find({ isDeleted: { $eq: false } })
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

//   soft delete of facility

const deleteFacilityIntoDB = async (id: string) => {

    const result = await Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;


}



export const facilityServices = {
    getFacilityIntoDB,
    createdFacilityIntoDB,
    updatedFacilityIntoDB,
    deleteFacilityIntoDB
}