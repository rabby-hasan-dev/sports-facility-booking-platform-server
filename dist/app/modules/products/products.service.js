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
exports.productService = void 0;
const products_model_1 = require("./products.model");
//  send Product data in database
const createPrductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(product);
    return result;
});
// Retrived all product data from database
const getAllPrductIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query) {
        const queryResult = yield products_model_1.Product.find(query);
        return queryResult;
    }
    const result = yield products_model_1.Product.find({});
    return result;
});
//  find Product by database id
const getProductByIdIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(id);
    return result;
});
//  find Product by database id and update product
const getProductByIdAndUpdateIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    return result;
});
//  find Product by database id
const getProductByIdAndDeleteIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.productService = {
    createPrductIntoDB,
    getAllPrductIntoDB,
    getProductByIdIntoDB,
    getProductByIdAndDeleteIntoDB,
    getProductByIdAndUpdateIntoDB,
};
