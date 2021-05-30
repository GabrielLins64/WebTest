var
    http = require('http'),
    path = require('path'),
    fs = require('fs');

const PORT = 80;
const FILES_DIR = 'public/'
const INDEX_FILENAME = 'index.html'
const NOT_FOUND_FILENAME = 'views/not_found404.html'

extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".ico" : "image/x-icon", 
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".json" : "application/json"
};

function getFile(filePath,res,page404,mimeType){
    fs.access(filePath, function(error) {
        if(!error){
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    res.writeHead(200, {
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents, 'utf-8');
                } else {
                    console.dir(err);
                };
            });
        } else {
            console.log("Error in access:", error);
            fs.readFile(page404, function(err,contents){
                if(!err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};

function requestHandler(req, res) {
    var
    fileDir = path.dirname(req.url)
    fileName = path.basename(req.url) || INDEX_FILENAME,
    ext = path.extname(fileName),
    localFolder = __dirname + '/' + FILES_DIR,
    page404 = localFolder + NOT_FOUND_FILENAME,
    filePath = fileDir + '/' + fileName;

    if(!extensions[ext]){
        res.writeHead(406, {'Content-Type': 'text/html'});
        res.end("The requested file type is not supported");
    };

    getFile((localFolder + filePath),res,page404,extensions[ext]);
};

http.createServer(requestHandler).listen(PORT);

var os = require('os');
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;

console.log("\nServer running at:")
console.log('\n- Local:\t\x1b[36m%s', 'http://localhost:\x1b[96m' + PORT + "/\x1b[0m");
console.log("- Network:\t\x1b[36m%s", "http://" + ip + ":\x1b[96m" + PORT + "/\x1b[0m\n")
