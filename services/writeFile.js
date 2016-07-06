const fs = require('fs');

module.exports = (emails) => {
  return new Promise((resolve,reject) => {
    fs.writeFile('email.txt', emails, (err,data) => {
      if(err) {reject(err)}
      resolve(data)
    })
  })
}