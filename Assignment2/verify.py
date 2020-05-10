from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
import binascii

f = open('privatekey.pem','r')
key = RSA.import_key(f.read())
path=input("Enter your public key path : ")
f = open(path,'r')
crt = RSA.import_key(f.read())

msg=input("Enter unencrypted text : ")
fmsg=msg.encode('ASCII')
encrypted=input("Enter your encrypted message : ")
fencrypt=encrypted.encode('ASCII')
fans=binascii.unhexlify(fencrypt)
hash = SHA256.new(fmsg)
verifier = PKCS115_SigScheme(crt)
try:
    verifier.verify(hash,fans)
    print("Signature is valid.")
except:
    print("Signature is invalid.")
