const electron = require('electron');
const ipc = electron.ipcRenderer;
let request = require('request');
const changeBtn = document.getElementById('changeBtn');
const exitBtn = document.getElementById('exitBtn');

function myFunc(){
    var rnd = new Date().getTime();
    var url ="https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_="+rnd;
    request(url,function(err,response,body){
    if(err)
    {
        document.getElementById("quote").innerHTML = 'Unable to fetch the quote plaese check the network connection';
        return;
    }
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
});
exitBtn.addEventListener('click',function(){
    ipc.send('close-app');
});