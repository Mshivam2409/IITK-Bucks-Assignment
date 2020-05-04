# First Assignment 
The server is written is NodeJS/ExpressJS

## Installing dependencies
Run this in the Assignment directory to install all dependencies.
```
npm install
```
## Starting the server

Run this in the Assignment directory to start the server
```
node server.js
```

## Sending Requests

You can send requests to the server using Curl/Httpie or anything of your choice

The server runs on port `8787`.

The string should be posted on `/hash` end point in the `json` format.
```
{ "data" : "your string here"}
````

For example using httpie
```
http -v localhost:8787 data="your string"
```
The response is returned in `json` format as:
```
{ "hash" : "string concatanated with number such that sha256 is less than target" }
```