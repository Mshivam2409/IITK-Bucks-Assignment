# IITK Bucks Assignments

This is the assignment repository of __PClub Summer '20 Project IITKBucks__.

We will implement a blockchain based virtual currency. This project will also implement a ledger and a wallet for the currency.
***
##  Assignment 1
Suppose you have a string/an image/anything else. You convert it into binary. You put the bytes together. You now have a long sequence of bits.

Now assume that this sequence of bits represents a number. A very large number. But still a finite positive integer.

Suppose you have a mathematical function *f(x): Z->[1,100]*. This function can take any integer as the input, but always produces the output as an integer between 1 and 100. It is given that this function produces a uniform distribution.

So you give this function an integer as an input. What is the probability that the output will be 5?

1/100 ?

What is the probability that the output will be less than or equal to 5?

1/20 ?

Let's call 5 our target. Now suppose you want to throw random numbers into the function as input, and you want the output to be less than or equal to our target *(which is 5)*. What is the expected number of times you'll have to try?

20 ?

Now suppose you decrease the target to 4. What is the expected number of times you'll have to try to find an integer x such that *f(x)<=target?*

25 ?

Thus, now you have to try harder *(do more work)* to find such a number.

Now suppose you increase the target to 10. What is the expected number of times you'll have to try to find an integer x such that *f(x)<=target?*

10 ?

Now you have to do less work to find such a number.

This is the essence of mining. You try to find such an input for a function which produces an output that is less than the target. The function used is a hash function, like the `SHA-256` hash function. It produces 256 bits as the output *(hence the name)* . If you represent the bytes as an integer, it would lie in the range *[0, 2^256)* . The number is usually written in the hexadecimal format. So the hash value can range from 
`0x0000000000000000000000000000000000000000000000000000000000000000`    to `0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`. But the hash function can take any sequence of bytes as the input.


Also, if you change even a single bit in the input, the generated output is very different from the earlier output. For example:
```java
SHA256("dryairship1") = f869c8d9dec84d39ed2afa0001aade4c9045c477a1f8729cec92f32c982d0d6e
SHA256("dryairship2") = 985f4c5e0429a0c53e2230ce65eefd2f77eb48aa94cb47bd9172baa0d9f22ad8
SHA256("dryairship3") = bfb1120349742e156c243fa2909e09313da3c5ba7d815db9810ed7d757168a29
```

Here, we had some constant data `dryairship`, and a changing value *(the number at the end)*. Mining is the process of finding this changing value that when combined with our data *("dryairship" in our case)* will produce an output below the target. Since the range of `SHA256` hash function is huge, the target chosen is very high. If we chose the target to be `0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`, the smallest positive integer that satisfies our target is 16962.
```java
SHA256("dryairship16962") = 000032939d7b1788583856044a76a79129b7c52ecb3ef63f384d09b9dd6787b5`
```
As soon as we find this magic number `16962`, we have achieved success.

The given program that takes some data as string input. Then it tries to find a positive number x such that when x is appended to the end of the string, the SHA256 hash of this new string is less than the target, which is `0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`. 
***
## Assignment 2

A blockchain is essentially like a linked list.

In a linked list, each item contains the address of the next item. In a blockchain, each block contains the hash of the previous block *(i.e. the parent block)*.

Similar to a linked list, each block can have only one parent block, and each parent can have only one child. You can store any type of data in a block *(for a cryptocurrency, the data stored contains the transactions)*.

The structure of a block is like the following:
```javascript
Block {
    index      // The index of the block in the blockchain. This is equal to 1 + the index of the parent block.
    timestamp  // The time at which the block was mined
    data       // The data contained inside the block (can be of any data type)
    parentHash // The hash of the parent block
    nonce      // The nonce value such that the hash of this entire block is less than the target
}
```
Also, blockchains are distributed. It means that every node has a copy of the blockchain.

If one node mines a new block, it shares it to every other node on the network so that they can include it in their chain.

Whenever a node receives a new block, it should verify if the block is valid. There are a few things to verify:

1. Every transaction in the block is valid.
2. The hash of the parent block is correct.
3. The specified nonce creates a hash which is less than the target.

It should be very easy to implement the verification of the nonce and the hash of the parent block. To verify transactions, however, you need to do some work.
A transaction looks like the following:
```javascript
Transaction {
    id      // A unique ID for every transaction
    input   // There can only be one input
    outputs // There can be multiple outputs. This is an array of outputs.
}
```

The `input` contains a reference to some previous output. 
Think of it this way: if you have some money, you definitely received it from somewhere. So to prove that you have the money you say, you need to tell me that output in the existing blockchain that gave you the money. So the input contains the ID of that output which gave you the money.

The `output` is what you do with the money that you have. Like, if some transaction gave me 100 coins, and I want to spend them, here's how I would do it: I have 100 coins, I give 20 coins to A, 30 coins to B, and keep the rest of the 50 coins with myself. Thus, this input has 3 outputs. 20->A, 30->B, 50->myself.

Each output contains three things:
```javascript
Output {
    id        // A unique ID for every output 
    amount    // The mount of money used in this output
    recipient // The account that receives this money
}
```
Note that one input can only be used once. This is why if you want to spend money only partly, you need to have one output that sends the money back to you.

Whenever a block is mined, it contains the new transactions that have occurred. So you take all the outputs of all the transactions and store it somewhere. Now whenever you encounter a new transaction, you first check if the input for this transaction exists in your list of unused outputs. If it does, this is a valid transaction. You should now remove this particular output from your list of unused outputs. Thus, one output can only be used once.


Also, you need to check if the total money being spent in this transaction is less than or equal to the money that is in the input.
So now you can verify all the things that you should verify whenever you receive a new block.

If you look at our previous model, there is one strong flaw in it. Any user can point to any unused transaction output, and claim that it belongs to him (since you aren't verifying the user in the transaction's input part).

We'll address it today. We'll make use of some cryptography to do so.

There are various types of cryptographic algorithms. Some are reversible (like base64) and some are irreversible (like SHA256) (irreversible means that you cannot find out the original data from the encrypted data).

Some reversible cryptographic functions do not use any keys (like base64), but some do.

Among those reversible cryptographic methods that use keys, we have two classes: Symmetric encryption and Asymmetric encryption.

In symmetric encryption, the same key is used to encrypt and decrypt data.

In asymmetric encryption, there are two keys: a public key and a private key. Something encrypted using the public key can only be decrypted using the private key (and vice versa).

Suppose we generate a public-private key pair for each user. The private key of a user is a secret (and is known only to them), while their public key is publicly available.

When we have to send coins to someone, we put their public key in the recipient field.

So suppose there is a particular transaction, in which there is an output which sends coins to me. How do I claim that those coins belong to me?

The aim is to prove that the public key belongs to you. If the public key belongs to you, the coins belong to you.
A simple way would be to declare your private key. Then anyone could encrypt some text with the public key, and try to decrypt it using the private key given by you. If the decryption is successful, it means that the coins belong to you. However, your private key is your only identity, and sharing your private key with anyone allows them to misuse it (for example, claim and use coins that belong to you). As a rule: never share your private keys with anyone.
So we can't share private keys. How do we claim the coins now? We use signatures!
Suppose you generate a random text, and encrypt it using your private key. Then you declare both the original text, and the encrypted text. Then anyone with your public key (which is available there in the output) can try to decrypt the encrypted text. If the decryption is successful, and the decrypted text equals the original text given by you, it means that the public key is yours. This is how digital signatures work.
If you have any doubts regarding this, please ask.
So now you have your second assignment. Write a program that asks the user for 3 inputs:

1. The public key of the user
2. The unencrypted text
3. The encrypted text

The encryption method used will be `RSA`. There are two popular padding methods: `OAEP` and `PKCS`. We will use the `OAEP` padding *(You don't have to understand the differences. Just know that if something is using PKCS, it is old and can be "hacked".)*. You have to verify if the public key can decrypt the encrypted text, and that the decrypted text is equal to the unencrypted text provided by the user. Print __`"Signature verified!"`__ if the verification is successful, otherwise print  __`"Verification failed"`__.

__Note__: *Keys are generally shared using a .pub/.pem file. So when you ask the public key of the user, they will provide you a path to a file. You should read the signature from that file. Most languages have libraries to load signatures directly from files.*
___
 
## Assignment 3

Now let's go back to our model of a transaction. We'll make a few changes:
 - A transaction is allowed to have multiple inputs.
 - The `ID` of a transaction is the `SHA256` hash of its data *(more on this later)*
 - The outputs don't have their own IDs, they have their own indices *(like elements in an array)*. They are referred to by using the transaction ID and the index of the output.

Now, we'll refer to a user *(a recipient or a sender)* using their public key. The data stored in an output is then: the index of the output, the amount of coins in this output, and the recipient's public key. If we get an array of outputs, we already know the index of each output by it's position in this array. So we don't need to explicitly store the index in each output. For the public key, we can serialize it in the PEM format. The amount of coins can be stored as a 64-bit integer *(which is 8 bytes)*, but the length of the public key might vary. So you need to store the length of the public key too *(the reason will make sense in some time)*. We will assume that the length of a public key can fit in a 32-bit integer.

So here is how we represent an output, by first representing everything as bytes, and then concatenating it all together:

`[the number of coins][length of the public key][the public key]`

So when you see a blob *(a series of bytes)*, which represents an output, here is what you do:
 - You read the first 8 bytes. This represents a 64-bit integer. This is the number of coins.
 - Then you read the next 4 bytes. This represents a 32-bit integer. This is the length of the public key. Let this value be x.
 - Finally, you read the next x bytes. This is the public key in PEM format.

And when you have multiple outputs, you can just concatenate it all together. Like this:

`[number of coins in output 1][length of the public key for output 1][the public key for output 1][number of coins in output 2][length of the public key for output 2][the public key for output 2]...`

I hope now you realize why we need to store the length of the public key.
This entire sequence of bytes represents our total output data. But wait, we also need one more thing. How long will we keep reading the outputs? We need to know the number of outputs as well. This can be represented as a 32-bit integer.

Now let us come to the inputs. Recall that each input actually refers to a previous output. So, each input contains the following data: The transaction ID *(in which the output is contained)*, the index of the output in the list of outputs for that transaction, and a signature which verifies that the person who wants to use the output is allowed to use the output.

I said that the ID of a transaction is the SHA256 hash of its data. This means that it is of 256 bits, or 32 bytes. The index of an output is a 32-bit integer, so 4 bytes. For the signature, we again need to store its length first (which is a 32-bit integer) and then the actual signature. So here is how we represent an input:

`[transaction ID][index of output][length of signature][signature]`

So when you see a blob which represents an input, here is how you read it:
 - You first read 32 bytes. This represents the transaction ID.
 - You then read the next 4 bytes. This represents a 32-bit integer. This the the index of the output in that transaction.
 - Then you read the next 4 bytes. This represents a 32-bit integer. This is the length of the signature. Let this value be x.
 - Finally, you read the next x bytes. This is the signature.

And when you have multiple inputs, you can just concatenate it all together. Like this:

`[transaction ID for input 1][index of output for input 1][length of signature for input 1][signature for input 1][transaction ID for input 2][index of output for input 2][length of signature for input 2][signature for input 2]...`

This entire sequence of bytes represents our total input data. Again, as in the case of outputs, we need to know the number of inputs as well.

This can be represented as a 32-bit integer.

Finally, all the data contained in a transaction can be represented as follows:

`[number of inputs][TOTAL INPUT DATA][number of outputs][TOTAL OUTPUT DATA]`

Now you have the above sequence of bytes. You calculate the SHA256 hash of this, and you get the transaction ID.

For assignment 3, you have to write a program that asks for transaction data and creates a binary file *(i.e., not 1s and 0s in text format, but actual binary data)* for that transaction. So you first ask for the number of inputs *(to be entered as an integer)*, and for each input, you ask for a transaction ID *(to be entered in hex format)*, the index *(to be entered as an integer)*, and a signature *(to be entered in hex format)*. Then you ask for the number of outputs *(to be entered as an integer)*, and for each output, you ask the number of coins *(to be entered as a 64-bit integer)* and the path of a public key *(.pem)* file. Then you create the transaction data in binary format, as described above, and calculate its hash *(the transaction ID)*. Then you save this binary data into a file named `<the calculated transaction ID in hex format>.dat` *(without the <>, of course)*. You don't have to verify anything in the transaction data. Just accept whatever the user gives you.
___

## Assignment 4

For assignment 4, you just have to do the reverse, i.e., you have to write a program that asks for a file path, reads that file for transaction data, calculates the transaction ID, and print all the details for that transaction. The file will contain binary data for one transaction. You have to print the output in the following format:

```html
Transaction ID: <in hex format>
Number of inputs: <an integer>
    Input 1:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    Input 2:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    ...
Number of outputs: <an integer>
    Output 1:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    Output 2:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    ...
```    
