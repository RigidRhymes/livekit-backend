import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
);

at.identity = "testUser";

at.addGrant({
    roomJoin: true,
    room: "testRoom",
    canPublish: true,
    canSubscribe: true,
});

(async () => {
    const token = await at.toJwt();  // 👈 await the Promise
    console.log("Generated token:", token);
})();
