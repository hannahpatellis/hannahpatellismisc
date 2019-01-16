const util = require('util')
const exec = require('child_process').exec;
const axios = require('axios');
const qs = require('qs');

let deviceMACs = [
  
];

let foundList = [];
let output = ''

read = exec('arp -a', function (err, stdout, stderr) {
  if (err) {
    console.log('Error in exec()\n', err);
  }
  
  output = stdout;

  deviceMACs.forEach(e => {
    if(stdout.includes(e) === true) {
      console.log("Found a match", e);
      foundList.push(e);
    }
  });

  phoneHome(JSON.stringify(foundList), output);
});

const phoneHome = (foundList, output) => {
  axios.post('', qs.stringify({
    foundList: foundList,
    output: output
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    console.log("Response came back", res.data);
  })
  .catch(err => {
    console.log("Error during Axios call\n", err);
  });
}