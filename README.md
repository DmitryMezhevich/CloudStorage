<h1 align="center">CloudStorage</h1>

<p align="center">
<img src="https://i.postimg.cc/HjGYVdFn/cloud-storage-removebg-preview.png" width="40%"></p>

[![](https://img.shields.io/badge/Switch%20Language-RU-blue)](https://github.com/DmitryMezhevich/CloudStorage/blob/main/README.RUS.md)

## Description

CloudStorage is a small pet project written in Node.js. This project enables users to upload and download files from a remote server. The server uses the local disk for storage. In this project, the issue of concurrent access to files is solved using the npm module "mutex-async".

## What are the possibilities?

-   Retrieving a list of files from the server in JSON format
-   Uploading file(s) to the server using form-data
-   Downloading a specific file from the server
-   Deleting a specific file or an entire folder from the server

## Installation

<p style="text-indent: 20px;">
NOTE: Installation requires Node.js v19.9.0 or higher and npm v9.6.3 or higher.
</p>

1. Download or clone the repository to your computer:

```bash
$ git clone https://github.com/DmitryMezhevich/UploadFiles.git
```

2. Open the project folder in the terminal.
3. Install all external npm dependencies:

```bash
$ npm install
```

4. Start the application:

```bash
$ npm start
```

## Demo Version

The CloudStorage application has also been deployed on a remote server as a pet project.
You can make requests to the remote API using the following URL:

```url
  url https://cloudstorage-02ii.onrender.com
```

IMPORTANT: The storage capacity of the remote server is limited as I'm using a free subscription for my pet project.

### Constraint:

The maximum size of an uploaded file should not exceed 4 GB (if you plan to upload large files, I recommend installing the application on your local computer).

## Requests

For making requests to the API, it is recommended to use Postman.
Note: If you want to use the demo version, make sure to replace "localhost:3000/" with the "https://cloudstorage-02ii.onrender.com" in all requests.

-   Get a list of files in JSON format:

```
GET localhost:3000/API/listFiles
```

Example of a response from the server in JSON format:

```JSON
[
   {
      "orderID": "100",
      "type": "directory",
      "children": [
            {
               "name": "1.png",
               "type": "file"
            }
      ]
   }
]
```

-   Uploading file(s) to the server using form-data:

```
POST localhost:3000/API/downloadFile?orderID
```

Where orderID is the identification number of the folder where the file(s) will be stored.
In the form-data, it is mandatory to specify the key under which the uploaded file is located.
Example response from the server in JSON format:

```JSON
{
    "description": "File(-s) was upload!"
}
```

-   Downloading a specific file:

```
GET localhost:3000/API/uploadFiles?orderID=100?fileID=1.png
```

Where orderID is the identification number of the folder where the file is located, and fileID is the name of the file.  
Note: You can obtain the list of available files by making a request to retrieve the list of files: GET localhost:3000/API/listFiles.  
The response will be the downloaded file.

-   Deleting a specific file or an entire folder:

```
DELETE localhost:3000/API/deleteFile?orderID=100?fileID=1.png
```

```
DELETE localhost:3000/API/deleteOrder?orderID=100
```

Where orderID is the identification number of the folder where the file is located, and fileID is the name of the file.

Example of a response from the server in JSON format:

```JSON
{
    "descripthin": "File: '1.png' has been remove!"
}
```

## Modules used in the project:

-   express
-   async-mutex
-   formidable
-   path
-   fs
-   fs-extra

## For questions and suggestions:

### LinkedIn: [Mezhevich Dmitry](https://www.linkedin.com/in/dmitry-mezhevich-073091225) 😉
