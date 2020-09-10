import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: String,
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ordered_at: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    }
});

export default new mongoose.model('orders', orderSchema)