var express = require('express')
var app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', function(req, res){
  res.render('index', { results: [['Group 3', 'Kevin', 'Sean', 'Max', 'Alex', 'Alec'],['Group 3', 'Kevin', 'Sean', 'Max', 'Alex', 'Alec']] });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})