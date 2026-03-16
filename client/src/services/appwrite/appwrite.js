import { Client, Account, Databases, Storage } from "appwrite";
import { config } from "../../config/config";

const client = new Client()
  .setEndpoint(config.appwrite_endpoint)
  .setProject(config.appwrite_project_id);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
