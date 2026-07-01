import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Announcement", AnnouncementSchema);