# Shell

This project is a bootstrapper for downloading, setting up, and running a Node.js application. It automates the process of fetching the latest version of an app from a remote URL, unzipping it, installing dependencies, and starting the app.

## Features

- Automatically downloads the latest version of the app.
- Cleans up old versions before setup.
- Installs dependencies and starts the app.
- Compares the current app version with the latest version to decide whether to update.

## Setup

### Prerequisites

- Node.js and npm installed on your system.
- Ensure you have access to the URLs specified in the `.env` file.

### Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd shell
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file (see below for details).

4. Start the bootstrapper:
   ```bash
   npm start
   ```

## Configuring the `.env` File

The `.env` file contains environment variables required for the app to function. Below is an explanation of each variable:

- `APP_URL`: The URL to download the zipped Node.js app.
- `INFO_URL`: The URL to fetch the latest version information of the app.
- `FILE_NAME`: The name of the downloaded zip file.
- `FOLDER_NAME`: The name of the folder extracted from the zip file.

### Example `.env`

```env
APP_URL="https://example.com/dev/simple-nodejs-app-master.zip"
INFO_URL="https://example.com/dev/simple-nodejs-app-master-info.json"
FILE_NAME="simple-nodejs-app-master.zip"
FOLDER_NAME="simple-nodejs-app-master"
```

## Info Template

The `info-template.json` file is used to define the structure of the version information fetched from the `INFO_URL`. Below is an example:

```json
{
  "version": "2.0"
}
```

This file ensures that the app can compare the current version with the latest version available remotely.

## Troubleshooting

- If the app fails to start, ensure the `.env` file is correctly configured.
- Check your internet connection if the app cannot download the zip file.
- Ensure Node.js and npm are installed and accessible in your system's PATH.

## License

This project is licensed under the ISC License.
