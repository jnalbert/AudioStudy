const vision = require('@google-cloud/vision').v1;


// Creates a client
const visionClient = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName = './images/BetterTextImage.png';
// const fileName = './images/Handwriting.JPG';
// const fileName = './images/Magazine.JPG';

// const recognizeText = async (imageUrl: string, type: "handwriting" | "computerText") => {
  
//   let result;
//   if (type === "handwriting") {
//     [result] = await client.documentTextDetection(imageUrl);
//   } else {
//     [result] = await client.textDetection(imageUrl);
//   }

//   const fullTextAnnotation = result.fullTextAnnotation;
//   console.log(`Full text: ${fullTextAnnotation.text}`);
//   console.timeEnd()
  

// }
// console.time()
// recognizeText(fileName, "computerText")


// const imageToTextGCP = async (fileRefs: any[], type: string, uuid: string) => {
//   // const overallResult: any = [];
//   console.log("started");
  
//   // for (let i = 0; i < imagesData.length; i++) {
//   console.log("number start");
//   // let result;
//   // console.log(imagesData[0].base64.toString('base64'))
//   let features = [{ type: 'TEXT_DETECTION' }];

//   if (type === "handwriting") {
//     features = [{ type: "DOCUMENT_TEXT_DETECTION" }];
//   }

  

//   // Build the image request object for that one image. Note: for additional images you have to create
//   // additional image request objects and store them in a list to be used below.

//   const allImages = [];
//   for (let i = 0; i < fileRefs.length; i++) {
//     console.log(fileRefs[i], "File Refs")
//     console.log(features, "Feature")
//     allImages.push({
//       image: {
//         source: {
//           imageUri: fileRefs[i],
//         }
//       },
//       features: features,
//     });
//   }
//   console.log(allImages)

//   const fullRequest = {
//     requests: allImages,
//     outputConfig: {
//       gcsDestination: {
//         uri: `gs://cac-2021.appspot.com/temp-transcripts/${uuid}/`
//       }
//     }
//   };

//   const [operation] = await visionClient.asyncBatchAnnotateImages(fullRequest);
//   console.log("made it to operation")

//   // Wait for the operation to complete
//   const [filesResponse] = await operation.promise();
//   console.log(filesResponse)


  // console.log(request)
  // if (type === "handwriting") {
  //   [result] = await visionClient.documentTextDetection(fullRequest);
  // } else {
  //   [result] = await visionClient.textDetection(fullRequest);
  // }
  // const fullTextAnnotation = result.fullTextAnnotation;
  // overallResult.push(fullTextAnnotation);
  // console.log("number end");
  // // }

  // console.log(`Full text: ${fullTextAnnotation.text}`);
  // return overallResult;
// };

// const refs = ["gs://cac-2021.appspot.com/temp-images/elbu8EoXeMWfJR2nts9fhBLPR9w1/image-0.jpg"]
// const uuid = "elbu8EoXeMWfJR2nts9fhBLPR9w1";
// const type = "handwritten"

// imageToTextGCP(refs, type, uuid);


const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'Text to synthesize';
const outputFile = 'output.wav';

const maleName = "en-US-Wavenet-I";
const femaleName = "en-US-Wavenet-C";

const textToSpeechFunc = async () => {
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', name: maleName},
    audioConfig: {audioEncoding: 'LINEAR16'},
  };
  const [response] = await client.synthesizeSpeech(request);

  console.log(response.audioContent)
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile(outputFile, response.audioContent, 'binary');
  // console.log(`Audio content written to file: ${outputFile}`);
  
}

console.log("Start")
textToSpeechFunc();
console.log("End")



// // Imports the Google Cloud client library
// const speech = require('@google-cloud/speech');
// const fs = require('fs');

// // Creates a client
// const client = new speech.SpeechClient();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const filename = './output.wav';
// const encoding = 'LINEAR16';
// const sampleRateHertz = 24000;
// const languageCode = 'en-US';

// const config = {
//   enableWordTimeOffsets: true,
//   encoding: encoding,
//   sampleRateHertz: sampleRateHertz,
//   languageCode: languageCode,
// };

// const audio = {
//   content: fs.readFileSync(filename).toString('base64'),
// };

// const request = {
//   config: config,
//   audio: audio,
// };

// // Detects speech in the audio file. This creates a recognition job that you
// // can wait for now, or get its result later.
// const speechRecognize = async () => {

//   const [response] = await client.recognize(request);

//   // Get a Promise representation of the final result of the job

//   response.results.forEach((result: any) => {
//     console.log(`Transcription: ${result.alternatives[0].transcript}`);
//     result.alternatives[0].words.forEach((wordInfo: any) => {
//       // NOTE: If you have a time offset exceeding 2^32 seconds, use the
//       // wordInfo.{x}Time.seconds.high to calculate seconds.
//       const startSecs =
//         `${wordInfo.startTime.seconds}` +
//         '.' +
//         wordInfo.startTime.nanos / 100000000;
//       const endSecs =
//         `${wordInfo.endTime.seconds}` +
//         '.' +
//         wordInfo.endTime.nanos / 100000000;
//       console.log(`Word: ${wordInfo.word}`);
//       console.log(`\t ${startSecs} secs - ${endSecs} secs`);
//     });
//   });

// }

// console.log("start")
// speechRecognize();
// console.log("end")