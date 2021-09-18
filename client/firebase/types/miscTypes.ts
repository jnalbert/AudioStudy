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