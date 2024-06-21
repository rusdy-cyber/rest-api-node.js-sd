import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    sebagai: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    departemen: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);
