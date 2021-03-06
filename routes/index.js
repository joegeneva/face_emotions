var express = require('express');
var app = require('express')();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var fs = require('fs');
var divby = 250;
var filename = "./data/test.json";

//this file handles basic save, delete, index routes.

router.post('/save', function(req, res, next) {
  var array = JSON.parse(req.body.data);  
  var batchSave = "";
  for (var i=0;i<array.length;i++){
    var traindata = makeinput(array[i].emotion,JSON.parse(array[i].posarray));
    batchSave += JSON.stringify(traindata) + '\n';
  }

  fs.appendFile(filename, batchSave )
  res.send(["File saved"]);
});

router.post('/delete', function(req, res, next) {
  fs.unlinkSync(filename);
  console.log('successfully deleted data.json');
  res.send(["deleted"]);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

function makeinput(emotion,array){
  var arrpack = [];
  array.forEach(function(currentValue,index){
    arrpack.push(currentValue[0]/divby);
    arrpack.push(currentValue[1]/divby);
  });
  emopack = [0,0,0,0,0,0,0];
  console.log(emotion);
  emopack[emotion] = 1;
  pack = {};
  pack.input = arrpack;
  pack.output = emopack;
  return pack;
  //trainingSet = [{input: [0,0],output: [0]}]
}

module.exports = router;
