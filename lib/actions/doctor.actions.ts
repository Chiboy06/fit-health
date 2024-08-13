"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  DOCTOR_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  doctors,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createDoctor = async (doctor: CreateDoctorParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newDoctor = await doctors.create(
      ID.unique(),
      doctor.email,
      doctor.phone,
      undefined,
      doctor.fullName
    );
    console.log({ newDoctor });

    return parseStringify(newDoctor);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await doctors.list([
        Query.equal("email", [doctor.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// REGISTER DOCTOR
export const registerDoctor = async ({
  profilePicture,
  identificationDocument,
  ...doctor
}: RegisterDoctorParams) => {
  console.log("pics", profilePicture);
  console.log("docs", identificationDocument);
  // console.log("doctors", { ...doctor });
  
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile

    let profilePictureId = null;
    let profilePictureUrl = null;
    let identificationDocumentId = null;
    let identificationDocumentUrl = null;

    

    if (profilePicture) {
      const inputFile = InputFile.fromBlob(
        profilePicture?.get("profileBlobFile") as Blob,
        profilePicture?.get("profileFileName") as string
      );

      const image = await storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        inputFile
      );
      profilePictureId = image.$id;
      profilePictureUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${image.$id}/view?project=${PROJECT_ID}`;
    }

    // Upload identification document
    if (identificationDocument) {
      const inputFile = InputFile.fromBlob(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );

      const file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      identificationDocumentId = file.$id;
      identificationDocumentUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    }

    console.log('profile', {profilePictureUrl, profilePictureId});
    console.log('id', {identificationDocumentUrl})

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newDoctor = await databases.createDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {
        profilePictureId,
        profilePictureUrl,
        identificationDocumentId,
        identificationDocumentUrl,
        ...doctor,
      }
    );

    return parseStringify(newDoctor);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET DOCTORS
export const getDoctors = async (doctorsId: string) => {
  try {
    const doctors = await databases.getDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      doctorsId
    );

    return parseStringify(doctors);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// Function to get the list of recent doctors ordered by creation date
export const getRecentDoctorsList = async () => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")] // Ordering by creation date in descending order
    );

    const data = {
      totalCount: doctors.total,
      documents: doctors.documents,
    }

    // Assuming parseStringify is a function to format the output as needed
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent doctors:",
      error
    );
    throw error;  // rethrow the error to handle it in the calling function if needed
  }
};


