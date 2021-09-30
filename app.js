const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//browser takes data about index.html from server
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
	console.log(req.body.cityName);
	const query = req.body.cityName;
	const apikey = "cb2853fd0e1cd74171349132b725e139";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey 
	
	https.get(url,function(response){
				response.on("data",function(data){
			const weatherData = JSON.parse(data)
				const temp = weatherData.main.temp
				const weatherDesciption = weatherData.weather[0].description
				const icon = weatherData.weather[0].icon
				const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
				res.write("<p>The weather is currently " +weatherDesciption+".</p>");
				res.write("<h1>The tempearature in " +  req.body.cityName +  " is " + temp +" Kelvin.</h1>");
				res.write("<img src="+imageURL+">");
				res.send();
				

		})
	})
	

})



app.listen(process.env.PORT || 3000,function(){
	console.log("Server is running on port 3000");
})

