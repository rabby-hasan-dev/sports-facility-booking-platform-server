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
exports.orderController = void 0;
const orders_service_1 = require("./orders.service");
const orders_zodValidation_1 = __importDefault(require("./orders.zodValidation"));
//  create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParseData = orders_zodValidation_1.default.parse(orderData);
        const data = yield orders_service_1.orderService.createOrderIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: data,
        });
    }
    catch (error) {
        if (error.message === 'Product does not exist!') {
            res.status(404).json({ success: false, error: error.message });
        }
        else if (error.message === 'Insufficient quantity available in inventory') {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res
                .status(500)
                .json({ success: false, error: 'An unexpected error occurred' });
        }
    }
});
// Retrived order
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let query = {};
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.email) {
            query = { email: (_b = req.query) === null || _b === void 0 ? void 0 : _b.email };
            const data = yield orders_service_1.orderService.getAllOrderIntoDB(query);
            res.status(200).json({
                success: true,
                message: 'Order fetchs successfully!',
                data: data,
            });
        }
        else {
            const data = yield orders_service_1.orderService.getAllOrderIntoDB(null);
            res.status(200).json({
                success: true,
                message: 'Order fetchs successfully!',
                data: data,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'order fetch  something wrong!',
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
};
