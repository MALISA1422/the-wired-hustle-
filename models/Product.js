const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    highlights: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
