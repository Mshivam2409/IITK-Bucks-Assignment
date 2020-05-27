# ASSIGNMENT 6

## Installing Dependencies

Run the following command to install the dependencies for the server
```
npm install
```
## Ngrok Setup
Go to [Ngrok Website](https://ngrok.com/download) and download the ngrok executable.

Run the following commands to expose the server's port on web.
```
chmod +x ./ngrok

./ngrok http 3492 
```

*(Ngrock executable is supplied )*

## Adding peers

Edit the included `peers.json` file to add or remove peers.

## Running the Server

```
node index.js
```
## Interacting with the server
The server runs on port `3492` and has __2__ endpoints.

__`/add`__ : This endpoint will accept POST requests containing JSON encoded data in the following format:
```
{
    'key': <an integer>,
    'value': <a string>
}
```
__`/list`__ : When this endpoint receives a GET request, it returns all the entries in the map as json data in the following format:
```
{
    key1: value1,
    key2: value2,
    key3: value3,
    ...
}
```
