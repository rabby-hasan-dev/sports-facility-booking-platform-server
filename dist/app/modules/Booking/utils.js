"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayableAmount = void 0;
const calculatePayableAmount = (pricePerHour, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Number(payload === null || payload === void 0 ? void 0 : payload.startTime.split(':')[0]) +
        (Number(payload === null || payload === void 0 ? void 0 : payload.startTime.split(':')[1]) * 1) / 60;
    const endTime = Number(payload === null || payload === void 0 ? void 0 : payload.endTime.split(':')[0]) +
        (Number(payload === null || payload === void 0 ? void 0 : payload.endTime.split(':')[1]) * 1) / 60;
    const bookingDuaration = endTime - startTime;
    const calculatePayableAmount = bookingDuaration * Number(pricePerHour);
    return calculatePayableAmount;
});
exports.calculatePayableAmount = calculatePayableAmount;
