import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { createAuthCookie } from "utils/auth";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "secret";

async function apiLogin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Request missing username or password" });
      return;
    }

    const client = await clientPromise;
    const db = client.db("config-editor");
    const admin = await db.collection("admins").findOne({ login: req.body.username });

    if (!admin) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    if (await bcrypt.compare(password, admin.password)) {
      const payload = { id: admin._id.toString() };
      const accessToken = jwt.sign(payload, NEXTAUTH_SECRET);
      const tokenCookie = createAuthCookie(accessToken, req.body.remember);
      res.status(200).setHeader("set-cookie", tokenCookie).send("ok");
    } else {
      res.status(401).json({ message: "Password incorrect" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
}

export default apiLogin;
