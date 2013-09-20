process.on('message', function(m, socket) {
  var l = m.words[0];
  var r = m.words[1];
  var t = m.targets;


  var cache = {};
  var results = [];

  for (var f0 in t) {
    var t0 = t[f0];
    for (var i = 0; i < t0.length; i++) {
      var c = t0[i];
      var f1 = c[0];
      var t1 = l[f1];
      if (!t1) continue;

      for (var j = 0; j < t1.length; j++) {
        var w1 = t1[j];
        var f2 = c[w1.length];
        var t2 = r[f2];
        if (!t2) continue;

        for (var k = 0; k < t2.length; k++) {
          var w2 = t2[k];
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
  }

  process.send(results);
  process.exit();
});