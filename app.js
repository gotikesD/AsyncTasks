const rp = require('request-promise');
const co = require('co');
const cheerio = require('cheerio');
const cluster = require('cluster');
const LineByLineReader = require('line-by-line')

const { MASTER_SETUP } = require('./config/')


const writeFile = require('./services/writeFile.js');
const levelDetector = require('./services/levelDetector.js');

//co(function *() {
//  let page = yield rp('http://paste.org.ru/?dlbntc');
//  let $ = cheerio.load(page);
//  let emails = $('textarea').text();
//  yield writeFile(emails)
//});

cluster.setupMaster(MASTER_SETUP);

for(var i = 1 ; i < 4 ; i++ ) {
  cluster.fork()
}

cluster.on('online', (worker) => {

   let index = 0;

    function childReed(i) {
    let lr = new LineByLineReader('data/email.txt');

    let level1 = [];
    let level2 = [];
    let level3 = [];


    lr.on('line', (line) => {
      let emailLevel = levelDetector(line[i]);
      switch(emailLevel) {
        case 1 :
          level1.push(line);
          break;
        case 2 :
          level2.push(line);
          break;
        case 3 :
          level3.push(line);
          break;
      }
    });

    lr.on('end', () => {
      const RULE = level1.length === 0 || level2.length === 0 || level3.length === 0;
      if(RULE) { childReed(i++)}
    });
  }

  childReed(index)

});


