import * as FileSystem from "expo-file-system";
import firebase from "firebase";
import { Platform } from "react-native";
import { db, functions, storage } from "../config/firebase";
import { FinalImageDataType } from "../src/screens/main/CreateAudioFileScreen";
import { AudioFileType, UserTypeClient, UserTypeDB } from "./types/miscTypes";

export const addNewAccountToDB = async ({
  uuid,
  name,
  dateJoined,
  totalAudioFileLengthSeconds,
  totalAudioFiles,
  email,
}: UserTypeClient) => {
  db?.collection("users").doc(uuid).collection("profile").doc("data").set({
    name: name,
    email: email,
    dateJoined: dateJoined,
    totalAudioFileLengthSeconds: totalAudioFileLengthSeconds,
    totalAudioFiles: totalAudioFiles,
  });
};

export const getUserData = async (uuid: string) => {
  const response = await db?.collection("users").doc(uuid).collection("profile").doc("data").get();
  const data = response?.data();
  // console.log(data)
  return data as unknown as UserTypeDB;
};

export const getAllAudioFiles = async (uuid: string) => {
  const response = await db?.collection("users").doc(uuid).collection("audio-files").get()
  return response?.docs.map((doc: any) => doc.data());
}

export const deleteAudioFile = async (userUuid: string, fileUuid: string, fileLength: number) => {

  // console.log(userUuid, "user Id")
  // console.log(fileUuid, "file Id")
  console.log(fileLength, "file Length")
  await db?.collection("users").doc(userUuid).collection("profile").doc("data").update({
    totalAudioFileLengthSeconds: firebase.firestore.FieldValue.increment(-fileLength),
    totalAudioFiles: firebase.firestore.FieldValue.increment(-1)
  })
  await db?.collection("users").doc(userUuid).collection("audio-files").doc(fileUuid).delete()
  // console.log("Document deleted")
  await storage?.ref(`/thumbnails/${userUuid}/${fileUuid}.jpg`).delete()
  // console.log("Thumbnail deleted")
  await storage?.ref(`/audio-files/${userUuid}/${fileUuid}.wav`).delete()
  // console.log("Audio File deleted")

}


const handleUploadFiles = async (files: FinalImageDataType, uuid: string) => {
  if (!storage) return;

  const promises: any = [];
 
  files.images.map(async (file, index) => {
    // console.log(file.base64)
    // console.log("NEW CHANGES")
    const base64Uri = `data:image/jpg;base64,${file.base64}`;
    const response = await fetch(base64Uri);
    const blobData = await response.blob();

    console.log(uuid, "Uuid used")
    const fileRef = storage?.ref(`/temp-images/${uuid}/image-${index}.jpg`);
    const uploadTask = fileRef?.put(blobData);

    promises.push(uploadTask);
    // console.log(fileRef?.fullPath);
    uploadTask?.on("state_changed", (error: any) => {
      console.log(error);
    });
  });

  try {
    await Promise.all(promises);
    const fileRefs = []
    for (let i = 0; i < files.images.length; i++) {
      fileRefs.push(`gs://cac-2021.appspot.com/temp-images/${uuid}/image-${i}.jpg`)
    }
    return fileRefs;
  } catch (e: any) {
    console.log(e);
  }
};

export const createNewAudioFile = async (
  uuid: string,
  fileData: FinalImageDataType
) => {
    handleUploadFiles(fileData, uuid).then((fileRefs) => {
      console.log("file upload done");
      console.log(fileRefs);
      if (functions) {
        const createNewAudioFileCF = functions.httpsCallable("createNewAudioFile");
        // const createNewAudioFileCF = functions.useEmulator("localhost", 5001);
        
    
        const SendingData = {
          description: fileData.description,
          header: fileData.header,
          textType: fileData.textType,
          fileRefs: fileRefs,
        }
        createNewAudioFileCF({ overAllData: SendingData, uuid: uuid }).then(() => {
          console.log("called Functions")
        }).catch((error) => {
          console.log("I failed")
          console.log(error)
    
        })
       
      }
      
    });

  
};
