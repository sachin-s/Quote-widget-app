
const electron = require('electron');
const ipc = electron.ipcRenderer;
let request = require('request');


function myFunc(){
    var rnd = new Date().getTime();
    var url ="https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_="+rnd;
    //var url = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";
    request(url,function(err,response,body){
    if(err)
    {
        document.getElementById("quote").innerHTML = 'Unable to fetch the quote plaese check the network connection';
        return;
    }
    let bodyJson = JSON.parse(body);
    console.log(bodyJson);
    let randomQuote = bodyJson[0]["content"]["rendered"];
    document.getElementById("quote").innerHTML = randomQuote;
    

});

}

window.addEventListener('DOMContentLoaded', () => {

const changeBtn = document.getElementById('changeBtn');
const exitBtn = document.getElementById('exitBtn');
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
})
