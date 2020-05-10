from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
import binascii
import sys 

path=sys.argv[1]
f = open(path,'r')
crt = RSA.import_key(f.read())

msg=sys.argv[2]
fmsg=msg.encode('ASCII')
encrypted=sys.argv[3]
fencrypt=encrypted.encode('ASCII')
fans=binascii.unhexlify(fencrypt)
hash = SHA256.new(fmsg)
verifier = PKCS115_SigScheme(crt)
try:
    verifier.verify(hash,fans)
    print("Signature is valid.")
except:
    print("Signature is invalid.")
