import { databases } from "./appwrite";
import { config } from "../../config/config";
import { ID, Query } from "appwrite";

const DB_ID = config.appwrite_database_id;
const PROF_COL_ID = config.appwrite_profiles_collection_id;

export const profileService = {
  // Get profile by userId
  async getProfile(userId) {
    try {
      const result = await databases.listDocuments(DB_ID, PROF_COL_ID, [
        Query.equal("userId", userId),
      ]);
      return result.documents[0] ?? null;
    } catch (error) {
      console.error("getProfile error ::", error);
      throw error;
    }
  },

  // Create a new profile account
  async createProfile(userId, data = {}) {
    try {
      return await databases.createDocument(DB_ID, PROF_COL_ID, ID.unique(), {
        userId,
        codeforcesUsername: data.codeforcesUsername ?? "",
        leetcodeUsername: data.leetcodeUsername ?? "",
        atcoderUsername: data.atcoderUsername ?? "",
      });
    } catch (error) {
      console.error("createProfile error ::", error);
      throw error;
    }
  },

  // Update an existing profile document
  async updateProfile(documentId, data) {
    try {
      return await databases.updateDocument(
        DB_ID,
        PROF_COL_ID,
        documentId,
        data
      );
    } catch (error) {
      console.error("updateProfile error ::", error);
      throw error;
    }
  },

  // Delete a profile document
  async deleteProfile(documentId) {
    try {
      return await databases.deleteDocument(DB_ID, PROF_COL_ID, documentId);
    } catch (error) {
      console.error("deleteProfile error ::", error);
      throw error;
    }
  },

  // Upsert - create if not exists, update if exists
  async saveProfile(userId, data) {
    try {
      const existingUser = await profileService.getProfile(userId);
      if (existingUser) {
        return await profileService.updateProfile(existingUser.$id, data);
      } else {
        return await profileService.createProfile(userId, data);
      }
    } catch (error) {
      console.error("saveProfile error ::", error);
      throw error;
    }
  },
};
