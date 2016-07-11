var url = "https://duckduckgo.com/";

function checkSelectorAttribute(selector, attr){
    var results = [];
    var elements = document.querySelectorAll(selector);
    if(elements.length === 0){
        return null;
    }

    for (var i = 0; i< elements.length; i++){
        var current = elements[i];
        var hasAttr = current.hasAttribute(attr);
        if(!hasAttr){
            results.push(current.outerHTML);
        }
    }

    return results;
}

casper.options.remoteScripts.push('https://code.jquery.com/jquery-2.2.3.min.js');

casper.test.begin('Testing the accessibiity', function(test){
    casper.start(url, function(){
        test.assertHttpStatus(200, "The page is up and running");
        this.evaluate(function(){
            $.noConflict();
        });
    });

    casper.then(function(){
        test.assert(casper.getCurrentUrl() === url, "Url is the one expected");
    });

    casper.then(function(){
        test.assertDoesntExist('a input', 'Input element doesnt exist inside an anchor element');
    })

    casper.then(function(){
        test.assertExists('html[lang]', 'A html element with a "lang" attribute exists')
        test.assertTruthy(this.getElementAttribute('html[lang]', 'lang'));
    });

    casper.then(function(){
        test.assertExists('head title', 'A title element exists inside the head');
    });

    casper.then(function(){
        var imagesWithNoAltAttr = this.evaluate(checkSelectorAttribute, 'img', 'alt');
        if(imagesWithNoAltAttr && imagesWithNoAltAttr.length > 0){
            test.fail('There are ' + imagesWithNoAltAttr.length + ' images without the alt attribute');
        }
    })

    casper.run(function(){
        test.done();
    });
});