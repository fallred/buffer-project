const request = require('request');
const fs = require('fs');

// request('http://example.com/image.jpg', {encoding: 'binary'}, function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     fs.writeFile('image.jpg', body, 'binary', function(err) {
//       if (err) {
//         console.log(err);
//       } else {
//         const bitmap = fs.readFileSync('image.jpg');
//         const base64Image = Buffer.from(bitmap).toString('base64');

//         console.log(base64Image);
//       }
//     });
//   }
// });


const axios = require('axios');
axios.get('https://materialcenter-test.gsxcdn.com/3e982efe-7219-4ae8-8a66-63033db3341f.jpg', {responseType: 'arraybuffer'})
  .then(response => {
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    console.log(base64Image);
  })
  .catch(err => {
    console.error(err);
  });