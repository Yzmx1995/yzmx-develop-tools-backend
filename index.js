const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const qs = require('qs');
const path = require('path');

const app = express();
app.use(express.static('public'));


// app.get('/generate-typeset-array', (req, res) => {
//     fs.writeFileSync('./result.json', JSON.stringify());
// })

app.post('/generate-typeset-array', (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        let { result } = JSON.parse(data);
        fs.writeFileSync('./result.json', JSON.stringify(result, null, '\t'));
        var f = fs.createReadStream(path.join(__dirname, 'result.json'));
        res.writeHead(200, {
          'Content-Type': 'application/force-download',
          'Content-Disposition': 'attachment; filename=result.json'
        });
        f.pipe(res);
    });
})
 
app.listen(8081, () => {
   console.log('server is open!');
 })