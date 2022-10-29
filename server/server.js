const express = require('express')
const { spawn } = require('child_process')
const path = require('path');
const app = express()
app.use(express.json())

const port = process.env.PORT || 8090;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/pages/index.html'));
    // console.log(__dirname)
});

app.get("/api/hello",(req,res)=>{ 
    let dataToSend;
    let pyFile = './python/hello.py'
    // spawn new child process to call the python script
    const python = spawn('python',[pyFile]);
    // collect data from script
    console.log('running')
    python.stdout.on('data', function (data) {
        console.log('running')
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend)
        data = {body:dataToSend};
        res.json(data)
    });
})

app.get("/api/add/:num1/:num2",(req,res)=>{
    const num1 = req.params.num1
    const num2 = req.params.num2
    let dataToSend;
    let pyFile = './python/add.py'
    // spawn new child process to call the python script
    const python = spawn('python', [pyFile,num1,num2]);
    // collect data from script
    console.log('running')
    python.stdout.on('data', function (data) {
        console.log('running')
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend)
        data = {"body":dataToSend};
        res.json(data)
    });
})
app.listen(port, () => console.log(`Listening on port ${port}!`))