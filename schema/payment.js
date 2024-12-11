const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    sessionId: { type: String, required: true, unique: true },
    invoiceId: { type: String, required: true },
    customerName: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);
