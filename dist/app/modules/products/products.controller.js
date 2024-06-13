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
exports.productController = void 0;
const products_service_1 = require("./products.service");
const products_zodValidation_1 = __importDefault(require("./products.zodValidation"));
//  Create Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseData = products_zodValidation_1.default.parse(productData);
        const data = yield products_service_1.productService.createPrductIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Product creation something wrong!',
            error: error,
        });
    }
});
//  Retrieve a List of All Products
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let query = {};
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            query = { name: (_b = req.query) === null || _b === void 0 ? void 0 : _b.searchTerm };
            const data = yield products_service_1.productService.getAllPrductIntoDB(query);
            res.status(200).json({
                success: true,
                message: "Products matching search term 'iphone' fetched successfully!",
                data: data,
            });
        }
        else {
            const data = yield products_service_1.productService.getAllPrductIntoDB(null);
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: data,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Retrieve faild of all products! ',
            error: error,
        });
    }
});
// Retrieve a Specific Product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = yield products_service_1.productService.getProductByIdIntoDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Retrieve faild of  a Specific Product! ',
            error: error,
        });
    }
});
// Update Product Information
const getProductByIdAndUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedata = req.body;
        const zodParseData = products_zodValidation_1.default.parse(updatedata);
        const data = yield products_service_1.productService.getProductByIdAndUpdateIntoDB(productId, zodParseData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Retrieve faild of  a Specific Product! ',
            error: error,
        });
    }
});
// Retrieve a Specific Product by ID and  Delete a Product
const getProductByIdAndDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = yield products_service_1.productService.getProductByIdAndDeleteIntoDB(productId);
        if (data) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong! ',
            error: error,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getProductById,
    getProductByIdAndDelete,
    getProductByIdAndUpdate,
};
