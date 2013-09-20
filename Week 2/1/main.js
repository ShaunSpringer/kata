var fs = require('fs');
var readline = require('readline');
var child = require('child_process');

var TARGET_LENGTH = 6;
var wordMap = {};

readline.createInterface({
  input: fs.createReadStream('dict.txt'),
  terminal: false
}).on('line', function(word){

  var len = word.length;
  if (len > TARGET_LENGTH) {
    return;
  }

  wordMap[len] = wordMap[len] || [];
  wordMap[len].push(word);

}).on ('close', function (){
  findWords();
});

var total = 0;
var handleResults = function(m, socket) {
  //console.log(m);

  total += m.length;
  console.log(total);
};

var findWords = function() {
  var targets = wordMap[TARGET_LENGTH];
  var len = TARGET_LENGTH / 2;

  for (var i = 1; i < len; i++) {
    var worker = child.fork('worker.js');
    worker.on('message', handleResults);
    worker.send({ words: [wordMap[i], wordMap[TARGET_LENGTH - i]], targets: targets });
  }

  if (len % 2 !== 0) {
    var worker = child.fork('worker.js');
    worker.on('message', handleResults);
    worker.send({ words: [wordMap[len], wordMap[len]], targets: targets });
  }
};