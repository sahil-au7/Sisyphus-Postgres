import {
    Schema,
    model
} from 'mongoose'

const product = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required : true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        required: true
    }
})

export default new model('Product', product)