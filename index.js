const download = require('file-download');
const path = require('path');
const fs = require('fs');
const decompress = require('decompress');

require('dotenv').config();


const url = process.env.APP_URL;
const directory = path.resolve(__dirname, './');
const filename = process.env.FILE_NAME;
const foldername = process.env.FOLDER_NAME;
const file = path.resolve(__dirname, `./${filename}`);

const options = {
  directory,
  filename,
};

console.log('Cleaning up...');

if (fs.existsSync(file)) {
  console.log(`Deleting ${file}`);
  fs.unlinkSync(file);
}


console.log('Downloading latest version of the app...');

download(url, {options}, async (err) => {
  if (err) throw err


  console.log('Unziping...');
  await decompress(file, `./${foldername}`);

  console.log('Completed!');
});

