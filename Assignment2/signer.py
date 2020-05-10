from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
import binascii

f = open('myPrivateKey.pem','r')
key = RSA.import_key(f.read())
msg = input("Enter the message to encrypt : ")
msg = msg.encode('ASCII')
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(key)
signature = signer.sign(hash)
print("Signature:", binascii.hexlify(signature).decode('ASCII'))

