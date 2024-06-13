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
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'type is required'],
        trim: true,
    },
    value: {
        type: String,
        required: [true, 'value is required'],
        trim: true,
    },
});
const InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        trim: true,
    },
    inStock: {
        type: Boolean,
        required: [true, 'inStock is required'],
        trim: true,
    },
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        trim: true,
    },
    tags: {
        type: [String],
        required: [true, 'tags is required'],
    },
    variants: {
        type: [VariantSchema],
        required: [true, 'variants is required'],
    },
    inventory: {
        type: InventorySchema,
        required: [true, 'inventory is required'],
    },
});
//  create custom static method
ProductSchema.statics.isProductExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findById(id);
        return existingProduct;
    });
};
//  create Product Mongoose  model
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
