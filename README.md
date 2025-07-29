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

### Example `.env`

```env
API_URL=https://app.begrabby.com
SHELL_ID=abc-123-def-456
SENSOR_CODE=123 # password for the shell
```

## PM2 setting up
- Install PM2:
```
npm install pm2@latest -g
```
- Run the app with the name
```
pm2 start app.js --name MY_APP_NAME
```
- Set the startup process: https://pm2.keymetrics.io/docs/usage/startup/
```
pm2 startup
# Then copy/paste the displayed command onto the terminal
pm2 save
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
