var casper = require("casper").create()
var fs = require('fs');
/*
Page vs the Script context 

the scipt context is where you construct the logic of your casperjs script

the page context is where you script as if you are on the web page
*/

casper.start('http://google.com', function(){
    //this.capture('./output/test.png');

    //var message = "The current page title is " + this.getTitle() + " at " + this.getCurrentUrl();
    // var title = this.evaluate(function(message){
    //     var title = document.title;
    //     return message + title;
    // }, message);
    //console.log(message);
    this.fill('form', {q:'hello world!'}, true);
});

var data;
casper.wait(1000,function(){
    data = this.evaluate(function(){
        var targetElements = document.querySelectorAll('.g h3 a');
        var data = [];
        for(var i = 0; i < targetElements.length; i++){
            var currentElement = targetElements[i];
            var currentLink = currentElement.getAttribute('href');
            var currentTitle = currentElement.text;
            var currentItem = {
                'link': currentLink,
                'title': currentTitle
            };
            data.push(currentItem);
        }
        return data;
    });

    console.log(JSON.stringify(data))
    this.capture('./output/test-search.png');
});
// casper.thenOpen('http://www.bing.com/', function(){
//     this.capture('./output/test2.png');
// });
casper.run(function(){
    fs.write('./output.json', JSON.stringify(data,null,2));
    this.exit()
});
