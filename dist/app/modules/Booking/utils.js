"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayableAmount = void 0;
const calculatePayableAmount = (pricePerHour, payload) => {
    const startTime = Number(payload === null || payload === void 0 ? void 0 : payload.startTime.split(':')[0]) +
        (Number(payload === null || payload === void 0 ? void 0 : payload.startTime.split(':')[1]) * 1) / 60;
    const endTime = Number(payload === null || payload === void 0 ? void 0 : payload.endTime.split(':')[0]) +
        (Number(payload === null || payload === void 0 ? void 0 : payload.endTime.split(':')[1]) * 1) / 60;
    const bookingDuaration = endTime - startTime;
    const calculatePayableAmount = bookingDuaration * Number(pricePerHour);
    return calculatePayableAmount;
};
exports.calculatePayableAmount = calculatePayableAmount;
