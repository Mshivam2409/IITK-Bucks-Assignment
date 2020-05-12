from Crypto.PublicKey import RSA
from Crypto.Signature import pss
from Crypto.Hash import SHA256
import binascii
import json

f = open('myPrivateKey.pem','r')
key = RSA.import_key(f.read())
msg = input("Enter the message to encrypt : ")
msg = msg.encode('ASCII')
hash = SHA256.new(msg)
signer = pss.new(key)
signature = signer.sign(hash)
print("Signature:", binascii.hexlify(signature).decode('ASCII'))
newpair = {msg.decode('ASCII'): binascii.hexlify(signature).decode('ASCII')}

with open("data.json", "r+") as file:
    data = json.load(file)
    data.update(newpair)
    file.seek(0)
    json.dump(data, file)

