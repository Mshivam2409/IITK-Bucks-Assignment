const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal:false
})

var PublicKeyPath,EncryptedMsg,DecryptedMsg

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the path of Public Key : ', (answer) => {
      PublicKeyPath = answer;
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the decrypted Message : ', (answer) => {
        DecryptedMsg = answer;
      resolve()
    })
  })
}

const question3 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Enter the Encrypted Message : ', (answer) => {
          EncryptedMsg = answer;
        resolve()
      })
    })
  }

const main = async () => {
  await question1()
  await question2()
  await question3()
  rl.close()
  require("child_process").spawn('python3', ['./verify.py',PublicKeyPath,DecryptedMsg,EncryptedMsg], {
    cwd: process.cwd(),
    detached: true,
    stdio: "inherit"
  });
}

main()