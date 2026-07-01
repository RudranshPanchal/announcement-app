import Announcement from "../models/announcement.server";
import { connectDB } from "../mongodb.server";

export async function getAnnouncement() {
    await connectDB();

    const announcement = await Announcement.findOne({});

    return announcement?.text ?? "";
}

export async function saveAnnouncement(text: string) {
    await connectDB();

    return await Announcement.findOneAndUpdate(
        {},
        { text },
        {
            upsert: true,
            new: true,
        }
    );
}