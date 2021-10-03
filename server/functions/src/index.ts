import * as functions from "firebase-functions";

require("firebase-functions/lib/logger/compat");

// import { v4 as uuidv4 } from 'uuid';



// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const serviceAccount = require("/Users/justinalbert/Code_Projects/ReactNativeApps/AudioStudy/server/functions/cac-2021-firebase-adminsdk-1eie4-7f277e5b8a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://cac-2021.appspot.com/'
});

const storage = admin.storage().bucket();

// const db = admin.firestore()


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
    console.log("HandWritten NOtes")
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

  storage.file(jsonFileRef).download(function (err: any, contents: any) {
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
      // const fileUuid = uuidv4();
      // db?.collection(`users`).doc(uuid).collection("audio-files").doc(fileUuid).set({
      //   transcript: allText,
      // })

      console.log(allText, "All Text")
      
    }
    
  });

  // console.log(fileTranscript, "Return data");
});
