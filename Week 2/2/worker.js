process.on('message', function(m, socket) {
  var l = m.words[0];
  var r = m.words[1];
  var len1 = m.lengths[0];
  var len2 = m.lengths[1];
  var t = m.targets;

  var results = [];
  var arr = [];

  var findMatches = function(a, b, word, cache) {
    console.log(a,b)
    if (!a || !b) return;

    var res = [];
    var tracker = {};
    for (var i = 0; i < a.length; i++) {
      var w1 = a[i];
      for (var j = 0; j < b.length; j++){
        var w2 = b[j];
        if (w1 + w2 === word && cache[word] !== true) {
          res.push([w1, w2, word]);
          tracker[word] = true;
        }
      }
    }

    return { results: res, tracker: tracker };
  };

  for (var f0 in t) {
    var t0 = t[f0];
    for (var i = 0; i < t0.length; i++) {
      var c = t0[i];
      var f1 = c[0];
      var f2 = c[len1];

      var res1 = findMatches(l[f1], r[f2], c, {});
      if (!res1) continue;
      results = results.concat(res1.results)

      var res2 = findMatches(l[f2], r[f1], c, {});
      if (!res2) continue;
      results = results.concat(res2.results);
    }
  }

  process.send(results);
  process.exit();
});