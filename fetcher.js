const url = ((process.argv).slice(2))[0];
const path = ((process.argv).slice(2))[1];
const fs = require('fs');
const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, _, body) => {
  if (error !== null) {
    console.log("404: Page not found\nThe page you are looking for doesn't exist or an other error occured.");
    process.exit();
  }
  rl.question("This will overwrite any existing file path. Press y and enter to continue. Otherwise, press enter to skip. ", answer => {
    if (answer === 'y') {
      fs.writeFile(path, body, err => {
        if (err) {
          console.log('Invalid file path');
          process.exit();
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      });
    }
    if (answer === 'n') {
      process.exit();
    }
    rl.close();
  });
});