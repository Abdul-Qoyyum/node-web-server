const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
   return text.toUpperCase();
});

app.set('view engine', 'hbs');



app.use((req, res, next) => {

var logs = `${Date.now()} ${req.method} ${req.originalUrl} \r\n `;
fs.appendFile('server.log', logs,  (err) => {
	if (err)  throw err;
})
console.log(logs);

next();
});



app.use((req, res, next) => {
	res.render('maintainance');
});



app.use(express.static(__dirname + '/public'));


app.get('/about', (req, res) => {
	res.render('about',{
		pageTitle : 'About page',
		currentYear : new Date().getFullYear()
	});
});




app.get('/',(req, res) => {
      res.render('home',{
      	welcomeMessage : 'Welcome to my homepage',
        pageTitle : 'Home page',
		currentYear : new Date().getFullYear(),
		});
});




app.get('/bad', (req, res) => {
	res.send({errorMessage: "Bad request please try again"});
});



app.listen(3000, () => console.log('Server is listening on port 3000'));