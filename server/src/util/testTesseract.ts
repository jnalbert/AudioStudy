//@ts-ignore
import { createWorker, PSM } from 'tesseract.js';
import { writeFileSync } from 'fs';

const worker = createWorker({
  logger: (m: any) => console.log(m)
});

const recognizeText = async (imageUrl: string) => {
  await worker.load();
  console.log("HERE1")
  await worker.loadLanguage('eng+osd');
  console.log("HERE2")
  await worker.initialize('eng+osd');
  console.log("HERE3")
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.AUTO_OSD
  })
  console.log("HERE4")
  const { data: { text } } = await worker.recognize(imageUrl);
  console.log("HERE5")
  writeFileSync('output.txt', text)
  console.log("HERE6")
  await worker.terminate();

  
};

recognizeText('./images/TestIamgeColunms.png')

console.log("done")






