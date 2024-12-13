"use server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const RegisterAction = async (data: any) => {
  const { username, email, password } = data;
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      username,
      email,
      hashedPassword,
    },
  });

  return user;
};
