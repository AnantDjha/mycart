import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    cart: {
        type: [Object],
        required: true,
    },
});

// Check if the model exists before defining it
export default mongoose.models.user || mongoose.model('user', userSchema);
