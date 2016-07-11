var casper = require('casper').create();
var fs = require("fs");


if(fs.exists('./data.json')){
    var file = fs.read("./data.json");
    var data = JSON.parse(file);

    var viewportSizes = data.viewportSizes;
    var urls = data.urls;


    casper.start();

    var counter = 0;

    casper.repeat(viewportSizes.length, function (){
        var viewportSize = viewportSizes[counter++];
        
        casper.viewport(viewportSize,1000).each(urls, function(self, item, index){
            self.thenOpen(item,function (){
                var title = this.getTitle();
                console.log(title);
                this.wait(2000, function(){
                    this.capture('./output/'+title.toLowerCase()+'/screenshot_' + viewportSize + '.png')
                });
            });
        });
    });


    console.log(urls);
    console.log(viewportSizes);

    casper.run();
}
else{
    casper.echo("Missing the data.json file", "ERROR");
    casper.exit();
}
