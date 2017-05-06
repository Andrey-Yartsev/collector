var casper = require('casper').create();
var hashCode = require('./lib/hashCode');

function getLinks() {
  var links = document.querySelectorAll('.catalog-list .item-description-title-link');
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href')
  });
}

var base = 'nizhniy_novgorod/transport';
//var pageNumber = 1;
var id = hashCode(base);

casper.start('https://www.avito.ru/' + base, function() {
  casper.then(function() {
    var links = casper.evaluate(getLinks);
    require('fs').write('data/links/' + id + '.json', JSON.stringify(links));
    require('child_process').exec('node', ['linksParsed.js', id], function(error, stdout, stderr) {
      console.log('done ' + id);
    });

  });
});

casper.run();