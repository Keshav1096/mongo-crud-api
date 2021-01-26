# Mongo CRUD API
APIs for CRUD - MongoDB

Mongo CRUD API allows developers to easily perform crud operations. <strong>CRUD</strong> stands for Create Read Update Delete.
This API helps in performing CRUD operations with JWT token based authorization.
JWT tokens that are generated in this code expire after 60 seconds.

## Pre-requisites
1. Docker
2. MongoDB
3. NodeJS
4. NPM
5. Code Editor (I prefer VS Code)

Create a ```.env``` file with the following:
```
PORT=<port number>
DB_USER=<user name>
DB_PASSWORD=<user password>
DB_NAME=<db name>
JWT_PASSWORD=<jwt password>
```

Make sure the above pre-requisites are installed in order for this API to work as expected.
## Install
To get started, first clone the repository and execute the following commands.

#### Install Packages
```
$ npm install
```
#### Create Docker image:
Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command:
```
$ docker build -t <any username>/mongo-node-api .
```
Your image will now be listed by docker
```
$ docker images
```
#### Running the image
Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:
```
$ docker run -p 5001:5001 -d <any username>/mongo-node-api
```
##### Print the output of your app:
```
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
MongoDB Server listening at http://localhost:5001
```

## API Functions
### Find
```
  METHOD: POST
  URL: <base url>/mongo/find
  Headers:
   - Authorization: <jwt token>
  Arguments:
   - table: <table name>
   - query: <key value pair>
  Returns: array of records
```
### Insert
```
 METHOD: POST
 URL: <base url>/mongo/insert
 Headers:
  - Authorization: <jwt token>
 Arguments:
  - table: <table name>
  - record: <key value pair>
 Returns: inserted id of record
```
### Update
```
METHOD: POST
URL: <base url>/mongo/update
Headers:
 - Authorization: <jwt token>
Arguments:
 - table: <table name>
 - _id: <_id of record>
 - record: <key value pair>
Returns: no of documents updated
 ```
 ### Delete
 ```
METHOD: POST
URL: <base url>/mongo/delete
Headers:
 - Authorization: <jwt token>
Arguments:
 - table: <table name>
 - _id: <_id of record>
Returns: no of documents deleted
 ```
 ### Generate Auth token
 ```
METHOD: POST
URL: <base url>/mongo/getAuthToken
Arguments:
 - email: registered email id
 - password: registered password
Returns: jwt token
 ```
