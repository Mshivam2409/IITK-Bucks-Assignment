# Assignment 5

## Installing the dependencies
Run the following commands to install dependencies:
```
npm install
```

## Running the Code

Run the command in terminal

```
node index.js
```
You may run into limit of the `V8 Heap`. You may use this to increase it 
```
node --max-old-space-size=8192 index.js
```

The program asks for for the binary file and prints the nonce.