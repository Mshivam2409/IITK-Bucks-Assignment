# Assignment 2

## Installing Dependencies

Run the following commands to install dependencies:
```
npm install
pip3 install -r requirements.txt
```

## Choosing the Input

Choose the data from `data.json` file provided.

The `original text` is the `unencrypted text` and then the `encrypted text`.

### Sample Input

Unencrypted text :
```  
Shivam
```

Encrypted text :
```
a3974af66b2538151949c83d7b2abdf8d94e4740f229f97e0864d22cb469b34349124137b1ed38f1e1ec9d1cd71619f995f353ed3a1be4d658927bca61e32fa4b4c45f2012cd681b21ed513d5eba7017506f1ab604325d519bd24eb8ebf807169347fc67f6b8b045928891d437e12edfdf4d0c3ab137dbe810dade3bc3c65da807ca161f1a0c5e9cb5777c62c49680e1e5835861bc736175a89122fe20cb085cd86b3b78a207efd74cde7aeac8e0185f3bf5ad738b38e12ecb040fbfe2b797ca1afafef2c64caa36a1ac5523438c8b4ec0f31e4a89e8abd2647564bcda637235a0907eaed7401e7a760c76e0921fadf6bcd91f564c6d563d68532bf7d73f5152fbb207155c2c09de86bb3cc2a213785436022c0e8971ce538d654262a3e69a5fd16b2ca0a83441711cc0bb2435814156845a129c44d4a4036666076c6f42dec111b81165d35de34fc815bfc8af4b2d5ee2fee54c4167d5f5c6cba0f336b81e6f22ad57bdac73b8ec7ae6ff9bf9a1513fa046aefdbf7068df9bf7ce80540191ad
```

## Running the Verification Code

Run the command in terminal

```
node index.js
```

The terminal ask for the `public key path` , `unencrypted text` and `encrypted text`.

Enter the input as chosen from `data.json` file

If the encrypted message is decrypted from my public key then the message is shown
`Signature is valid` else
it shows `Signature is invalid`
