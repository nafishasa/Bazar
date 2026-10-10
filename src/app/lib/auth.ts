import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db("mistake");

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  },    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_ID as string, 
            clientSecret: process.env.GOOGLE_SECRET as string, 
        },   github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GIT_HUB_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});