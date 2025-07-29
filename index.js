const download = require('file-download');
const path = require('path');
const fs = require('fs');
const decompress = require('decompress');
const shell = require('shelljs');
const axios = require('axios');

require('dotenv').config();

const apiUrl = process.env.API_URL;
const sensorCode = process.env.SENSOR_CODE;
const shellId = process.env.SHELL_ID;

(async () => {
  const result = await axios.post(`${apiUrl}/api/sensor/shell/config/${shellId}`, { code: sensorCode });

  const url = result.data.appUrl;
  const infoUrl = result.data.infoUrl;
  const envVariables = result.data.envVariables;
  const directory = path.resolve(__dirname, './apps');

  const filename = url.split('/').pop();
  const foldername = filename.split('.').slice(0, -1).join('.');
  const filePath = path.resolve(directory, `./${filename}`);
  const packagePath = path.resolve(directory, `./${foldername}`);
  const envVariablePath = path.resolve(packagePath, `./.env`);
  const packageJsonPath = path.resolve(packagePath, `./package.json`);
  const nodeModulesPath = path.resolve(packagePath, `./node_modules`);

  async function bootstrap() {
    if (!fs.existsSync(packageJsonPath)) {
      console.log('First start...');
      await setupApp();
      await setupEnvVariables();
      await startApp();
      return;
    }

    try {
      const { version: currentVersion } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const { data: { version: latestVersion } } = await axios.get(infoUrl);

      console.log({ currentVersion, latestVersion });

      if (currentVersion === latestVersion) {
        console.log('Already on the latest version');
        await setupEnvVariables();
        await setupEnvVariables();
        await startApp();
        return;
      }
    } catch (error) {
      console.log('Error reading package.json:');
    }

    await setupApp();
    await setupEnvVariables();
    await startApp();
  }

  async function setupApp() {
    if (fs.existsSync(directory)) {
      console.log(`Cleaning up.... ${directory}`);
      shell.rm('-rf', directory);
    } else {
      console.log('Creating directory...');
      shell.mkdir(directory);
    }

    console.log('Downloading latest version of the app...', {url, directory, filename});

    try {
      await new Promise((resolve, reject) => {
        download(url, { directory, filename }, (err) => {
          if (err) {
            console.log('Error downloading the file');
            console.log(JSON.stringify(err, null, 2));
            return reject(err);
          }
          resolve();
        });
      });

      console.log('Unzipping...');
      await decompress(filePath, `./apps`);

      // envVariables

      console.log('Successfully downloaded and unzipped the file.');
      install();
    } catch (error) {
      console.log('An error occurred during the setup process:');
    }
  }


  async function setupEnvVariables() {
    console.log('.Env setup...', envVariablePath, envVariables);
    fs.writeFileSync(envVariablePath, envVariables, { encoding: 'utf-8' });
  }

  async function install() {
    console.log('Installing dependencies...');

    // Navigate to the directory
    if (shell.cd(packagePath).code !== 0) {
      console.log('Error: Could not navigate to the package directory.');
      process.exit(1);
    }

    // Run 'npm install'
    if (shell.exec('npm install').code !== 0) {
      console.log('Error: npm install failed.');
      process.exit(1);
    }
  }

  async function startApp() {
    console.log('Starting the app...');

    if (!fs.existsSync(nodeModulesPath)) {
      console.log('Node modules not found. Installing...');
      await install();
    }

    // Navigate to the directory
    if (shell.cd(packagePath).code !== 0) {
      console.log('Error: Could not navigate to the package directory.');
      process.exit(1);
    }

    // Run 'npm start'
    if (shell.exec('npm start').code !== 0) {
      console.log('Error: npm start failed.');
      process.exit(1);
    }
  }

  bootstrap();
})()
