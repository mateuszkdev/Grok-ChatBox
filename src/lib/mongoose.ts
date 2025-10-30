import { connect, connection, Schema, model, models } from "mongoose";

export const conncetDB = async () => {

    if (connection.readyState >= 1) return;
    await connect(process.env.MONGODB_URI as string);

}

const userSchema = new Schema({
    _id: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    active: { type: Boolean, default: false },
})

const userAIEgoConfig = new Schema({
    userId: { type: String, required: true, unique: true },
    aiEgo: { type: String, required: true }
})

export const User = models.User || model("User", userSchema);
export const UserAiEgoConfig = models.UserAiEgoConfig || model("UserAiEgoConfig", userAIEgoConfig);