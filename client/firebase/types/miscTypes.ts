export interface UserTypeDB {
  name: string;
  email: string;
  dateJoined: string;
  totalAudioFiles: number;
  totalAudioFileLengthSeconds: number;
}

export interface UserTypeClient {
  name: string;
  email: string;
  dateJoined: string;
  totalAudioFiles: number;
  totalAudioFileLengthSeconds: number;
  uuid: string;
}

export interface AudioFileType {
  userId: string;
  header: string;
  description: string;
  dateCreated: string;
  thumbnailUrl: string;
  lengthInSeconds: number;
  fileId: string;
  audioFileRef: string;
}

