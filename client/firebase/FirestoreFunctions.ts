import { db } from "../config/firebase"
import { UserTypeClient, UserTypeDB } from "./types/miscTypes"


export const addNewAccountToDB = async ({ uuid, name, dateJoined, totalAudioFileLengthSeconds, totalAudioFiles, email }: UserTypeClient) => {
  db?.collection('users').doc(uuid).set({
    name: name,
    email: email,
    dateJoined: dateJoined,
    totalAudioFileLengthSeconds: totalAudioFileLengthSeconds,
    totalAudioFiles: totalAudioFiles,
  })
}

export const getUserData = async (uuid: string) => {
  const response = await db?.collection('users').doc(uuid).get()
  const data = response?.data()
  // console.log(data)
  return data as unknown as UserTypeDB
}