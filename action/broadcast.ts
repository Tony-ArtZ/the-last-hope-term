"use server";
import { db } from "@/lib/db";

export const BroadcastAction = async (data: any) => {
  const { message } = data;

  if (!message) {
    throw new Error("Message is required");
  }

  console.log("BroadcastAction -> message", message);
  const broadcast = await db.message.create({
    data: {
      content: message,
    },
  });

  return broadcast;
};
