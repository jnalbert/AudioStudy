import * as functions from "firebase-functions";

require("firebase-functions/lib/logger/compat");

import { v4 as uuidv4 } from 'uuid';



// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const serviceAccount = require("./cac-2021-firebase-adminsdk-1eie4-7f277e5b8a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://cac-2021.appspot.com/'
});

const storage = admin.storage().bucket();

const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const vision = require("@google-cloud/vision");
const visionClient = new vision.ImageAnnotatorClient();



const imageToTextGCP = async (fileRefs: any[], type: string, uuid: string) => {
  // const overallResult: any = [];
  console.log("started");

  let features = [{ type: "TEXT_DETECTION" }];

  if (type === "Handwritten") {
    console.log("HandWritten Notes")
    features = [{ type: "DOCUMENT_TEXT_DETECTION" }];
  }

  const allImages = [];
  for (let i = 0; i < fileRefs.length; i++) {
    // console.log(fileRefs[i], "File Refs")
    // console.log(features, "Feature")
    allImages.push({
      image: {
        source: {
          imageUri: fileRefs[i],
        }
      },
      features: features
    });
}

  const fullRequest = {
    requests: allImages,
    outputConfig: {
      gcsDestination: {
        uri: `gs://cac-2021.appspot.com/temp-transcripts/${uuid}/`
      }
    }
  };

  const [operation] = await visionClient.asyncBatchAnnotateImages(fullRequest);
  console.log("made it to operation")

  // Wait for the operation to complete
  await operation.promise();
  
  
  // output-1-to-1.json
  // console.log(filesResponse.outputConfig.gcsDestination.uri)
  const outputJsonFile = `temp-transcripts/${uuid}/output-1-to-${fileRefs.length}.json`
  // const ref = storage.ref(outputJsonFile).fullName
  // console.log(ref)
  return outputJsonFile;
 
};

const textToSpeechImport = require('@google-cloud/text-to-speech');

const clientTTS = new textToSpeechImport.TextToSpeechClient();

const mp3Duration = require('mp3-duration');

const textToSpeech = async (userUuid: string, fileUuid: string, transcript: string) => {

  // console.log(transcript, "tras")

  const maleName = "en-US-Wavenet-I";
  // const femaleName = "en-US-Wavenet-C";

  const request = {
    input: {text: transcript},
    voice: {languageCode: 'en-US', name: maleName},
    audioConfig: {audioEncoding: 'MP3'},
  };
  // console.log("HERE 2")

  const [response] = await clientTTS.synthesizeSpeech(request);


  // console.log("HERE 1")
  
  const duration = Math.ceil(await mp3Duration(response.audioContent))

  // console.log(response)
  const fileRef = `audio-files/${userUuid}/${fileUuid}.mp3`
  try {
    await storage.file(fileRef).save(response.audioContent)
  } catch (e) {
    console.log(e)
  }

  console.log("TTS Done")
  return {fileRef, duration};

}

const addDataToDB = async (userUuid: string, fileUuid: string, fileData: any, firstImageRef: string, audioFileRef: string) => {

  const allTranscript = fileData.transcript.replaceAll(/(\r\n|\n|\r)/gm, "");


  db?.collection(`users`).doc(userUuid).collection("audio-files").doc(fileUuid).set({
    thumbnailRef: firstImageRef,
    header: fileData.header,
    description: fileData.description,
    duration: fileData.duration,
    dateCreated: new Date().toISOString(),
    audioFileRef: audioFileRef,
    fileID: fileUuid,
    transcript: allTranscript
  })

  db?.collection("users").doc(userUuid).collection("profile").doc("data").update({
    totalAudioFiles: admin.firestore.FieldValue.increment(1),
    totalAudioFileLengthSeconds: admin.firestore.FieldValue.increment(fileData.duration)
  })
}

// Part 1 Front End Call
exports.createNewAudioFile = functions.https.onCall(async (data, context) => {
  // console.log("It worked HERE")
  // console.log(context, "User Id")
  // console.log(data.fileData, "File data")
  console.log("new things");
  console.log(data.overAllData)
  const jsonFileRef = await imageToTextGCP(
    data.overAllData.fileRefs,
    data.overAllData.textType,
    data.uuid
  );

  storage.file(jsonFileRef).download(async function (err: any, contents: any) {
    if (!err) {
      const jsonData = JSON.parse(contents.toString('utf8'))
      let allText = ""
      // console.log(jsonData.responses[0].fullTextAnnotation.text, "Json Data")
      // console.log(jsonData.responses.length, "LENGTH")
      for (let i = 0; i < jsonData.responses.length; i++) {
        // console.log(jsonData.responses[i].fullTextAnnotation.text, "Json Data")
        allText += jsonData.responses[i].fullTextAnnotation.text + " ";
      }
      allText.replaceAll(/[\r\n]+/gm, " ")

      // console.log("Writting to Database")
      const fileUuid = uuidv4();
      

      // console.log(allText, "All Text")
      const TTSData = await textToSpeech(data.uuid, fileUuid, allText)

      const fileData = {
        ...data.overAllData,
        transcript: allText,
        duration: TTSData.duration
      }
      const newThumbnailFileLocation = `thumbnails/${data.uuid}/${fileUuid}.jpg`

      const thumbnailUrl = await storage.file(newThumbnailFileLocation).publicUrl()
      const audioFileUrl = await storage.file(TTSData.fileRef).publicUrl()
      // console.log(thumbnailUrl, "Url")

      await storage.file(`temp-images/${data.uuid}/image-0.jpg`).move(newThumbnailFileLocation)

      await addDataToDB(data.uuid, fileUuid, fileData, thumbnailUrl, audioFileUrl)

      console.log("Cloud function out *Drops mic*")
    }
    
  });

  // console.log(fileTranscript, "Return data");
});
