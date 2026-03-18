import express from "express";
import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/get-token", async (req, res) => {
    const { identity, roomName } = req.body;

    try {
        const at = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            { identity }
        );

        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        const token = await at.toJwt();

        res.json({
            token,
            serverUrl: process.env.LIVEKIT_URL, // ✅ must be wss://host:7880
        });
    } catch (err) {
        console.error("Error generating token:", err);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,  "0.0.0.0", () =>
    console.log(`Token server running on port ${PORT}`)
);
