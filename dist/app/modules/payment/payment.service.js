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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const path_1 = require("path");
const payment_utils_1 = require("./payment.utils");
const booking_model_1 = require("../Booking/booking.model");
const ejs_1 = __importDefault(require("ejs"));
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let paymentData;
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        yield booking_model_1.Booking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid',
        });
        paymentData = {
            consumerName: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_name,
            email: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_email,
            phone: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_phone,
            transactionId: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.mer_txnid,
            amount: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.amount,
            currency: 'BDT',
            payment_type: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.payment_type,
            payTime: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.date,
            paymentStatus: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.pay_status,
        };
    }
    if (paymentData && status === 'success') {
        // const filePathSuccess = join( __dirname, '../../../../views/paymentSuccess.ejs',);
        const filePathSuccess = (0, path_1.join)(process.cwd(), 'views', 'paymentSuccess.ejs');
        const template = yield ejs_1.default.renderFile(filePathSuccess, paymentData);
        return template;
    }
    else {
        // const filePathFaild = join(__dirname, '../../../../views/paymentFaild.ejs');
        const filePathFaild = (0, path_1.join)(process.cwd(), 'views', 'paymentFaild.ejs');
        const template = yield ejs_1.default.renderFile(filePathFaild, {});
        return template;
    }
});
exports.paymentServices = {
    confirmationService,
};
