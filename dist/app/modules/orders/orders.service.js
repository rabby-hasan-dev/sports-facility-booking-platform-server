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
exports.orderService = void 0;
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
// create order and put in database
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield products_model_1.Product.isProductExists(order.productId);
    if (!existing) {
        throw new Error('Product does not exist!');
    }
    // Hand over inventory data to inventoryhandler
    yield innventoryhandler(existing, order);
    const result = yield orders_model_1.Order.create(order);
    return result;
});
// Handle inventory and update
const innventoryhandler = (data, order) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, inventory } = data;
    const quantity = inventory.quantity - order.quantity;
    if (quantity === 0) {
        yield products_model_1.Product.updateOne({ _id: _id }, { $set: { 'inventory.quantity': quantity, 'inventory.inStock': false } });
    }
    else if (quantity < 0) {
        throw new Error('Insufficient quantity available in inventory');
    }
    else {
        yield products_model_1.Product.updateOne({ _id: _id }, { $set: { 'inventory.quantity': quantity } });
    }
});
//  get all order from database
const getAllOrderIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query) {
        const result = yield orders_model_1.Order.find(query);
        return result;
    }
    else {
        const result = yield orders_model_1.Order.find({});
        return result;
    }
});
exports.orderService = {
    createOrderIntoDB,
    getAllOrderIntoDB,
};
