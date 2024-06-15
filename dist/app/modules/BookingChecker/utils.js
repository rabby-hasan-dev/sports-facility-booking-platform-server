"use strict";
// HELPER FUNCTION TO CONVERT TIME STRING TO INTEGER (MINUTES SINCE MIDNIGHT)
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAvailableTime = void 0;
const convertTimeToInt = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
};
// HELPER FUNCTION TO CONVERT INTEGER BACK TO TIME STRING (HH:MM)
const convertIntToTime = (timeInt) => {
    const hours = Math.floor(timeInt / 60)
        .toString()
        .padStart(2, '0');
    const minutes = (timeInt % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
// FUNCTION TO FIND AVAILABLE TIME RANGES CONSIDERING ENTIRE DAY
const findAvailableTime = (bookings) => {
    const availableSlots = [];
    const startTime = '00:00'; // ASSUMING WORKING DAY STARTS AT MIDNIGHT
    const endTime = '23:59'; // ASSUMING WORKING DAY ENDS AT 11:59 PM
    let currentStart = convertTimeToInt(startTime);
    bookings.sort((a, b) => {
        return convertTimeToInt(a.startTime) - convertTimeToInt(b.startTime);
    });
    for (const booking of bookings) {
        const bookingStart = convertTimeToInt(booking.startTime);
        const bookingEnd = convertTimeToInt(booking.endTime);
        if (bookingStart > currentStart) {
            availableSlots.push({
                startTime: convertIntToTime(currentStart),
                endTime: convertIntToTime(bookingStart),
            });
        }
        currentStart = Math.max(currentStart, bookingEnd);
    }
    if (currentStart < convertTimeToInt(endTime)) {
        availableSlots.push({ startTime: convertIntToTime(currentStart), endTime });
    }
    return availableSlots;
};
exports.findAvailableTime = findAvailableTime;
