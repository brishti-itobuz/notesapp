import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

function verifyAccessToken(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const bearerAccessToken = authHeader.split(" ")[1];
  

  try {
    const decoded = jwt.verify(bearerAccessToken, process.env.secretKey);

    return decoded;
  } catch (err) {
    throw new Error("Invalid access token");
  }
} 

export const verifyBearerAccessToken = async (req, res) => {
  try {
    const user = verifyAccessToken(req);
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};


