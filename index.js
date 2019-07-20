let request = require('request');
const changeBtn = document.getElementById('changeBtn');

function myFunc(){
    var rnd = new Date().getTime();
    var url ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_="+rnd;
    request(url,function(err,response,body){
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;

});

}
myFunc();
var myTimer = setInterval(myFunc,10000)
changeBtn.addEventListener('click',function(){
    clearInterval(myTimer);
    myFunc();
    myTimer = setInterval(myFunc,10000)
})