let request = require('request');
request("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function(err,response,body){
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;

});
setInterval(function(){
    var rnd = new Date().getTime();
    var url ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_="+rnd;
    request(url,function(err,response,body){
    console.log(url);
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;

});

},5000)