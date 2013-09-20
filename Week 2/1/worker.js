process.on('message', function(m, socket) {
  var l = m.words[0];
  var r = m.words[1];
  var t = m.targets;
  var cache = {};
  var results = [];

  for (var i = 0; i < t.length; i++) {
    var c = t[i];
      for (var j = 0; j < l.length; j++) {
      var w1 = l[j];
      for (var k = 0; k < r.length; k++) {
        var w2 = r[k];
        if (w1 + w2 == c && !cache[c]) {
          results.push([w1, w2, c]);
          cache[c] = true;
        } else if (w2 + w1 == c && !cache[c]) {
          results.push([w2, w1, c]);
          cache[c] = true;
        }
      }
    }
  }

  process.send(results);
  process.exit();
});