# Assignment 2

## Installing Dependencies

Run the following command to install dependencies:
```
npm install
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
05ee0229350dd14964566d7cb50ec4dab3d8d2cb548d5766569bface0d295b02f33821070fc83626b6af72f38cdbac46ce268c63800937ee637cc4a9d131d78c4acf6fd0f7bc2c905c4c1e303e6d6114063bd86d639cc293e4017f65b10ed3b1261b9ada1f7d773d5e7eb3088d8fad3ae9d8a91da49eb419863b38f7aab8a4ca3fe6fd8f11c865d138443801543d403a8f6c9af1a57e96717776dac53f8ed523e372a7f0bff6e8b30acf2015320ce01c8d63b4741e46f1b1f31c05913fcd7b6be66abfdab89892d72fec84d210e9e8adce75db76ec7f6204470fd55efd34713ed8f10207f471269d7d1283b09dee8a2d045207b404c3f236d3cd8776b6278027297d06f34b76c4680ffc733eedd32d7778fb3eaa7b76834210fc34e94599c4746bd420653d7cae9316898bae42e1f6640ae8eaa4556448586e3461b38e1014a1c7cf08a8b58be03b8027dbe97d45b251acc90e733b7051780ec63e2b9a422268ad3cf6040c4440079cc15e4354d145a80f4edcbc3e08025887baf7758c4c9d35
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
