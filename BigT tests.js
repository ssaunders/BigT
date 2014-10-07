/*** INCLUDE JUTSU ***/
window.jutsu = jutsu = {
/** EXAMPLE CONFIG:
{
    description: "(1,0) test with size 100,100 at 0,0",
    arguments: [{
        textPosition: "0,0",
        dimensions: {
            x: 0,
            y: 0,
            width: 100,
            height:100,
        }
    }, 1, 0],
    expectedVal: [100,0]
}
**/


    //Does not do multi-dim arrays
    isEqual : function(one, two) {
        var oneType = typeof(one),
            twoType = typeof(two);
        if( oneType !== twoType){
            return false;
        } else if(oneType !== 'object') {
            return one === two;
        } else if(one instanceof Array && two instanceof Array) {
            var i = one.length;     //stackoverflow, Tim Down
            if (i !== two.length) return false;
            while (i--) {
                if (one[i] !== two[i]) return false;
            }
            return true;
        } else {
            console.warn("I can't compare two objects, yet.");
        }
    },

    assert : function(one, two, test, msg) {
        var css, result;

        switch (test) {
            "!=": break;

            "==": break;

            "<" : 
            ">=": break;

            "<=": 
            ">" : break;
        }

        if(this.isEqual(one, two)) {
            result = "%cPASSED";
            css = 'color:green';
        } else {
            result = "%cFAILED";
            css = 'color:red';
        }
        console.log(result,css," - ",msg," -   target: ",two," actual:",one);
    },

    runTests : function(title, testFn, tests, scope) {
        console.group(title);

        var testVal, checkVal, result;
        for(var num = 0; num < tests.length; ++num) {
            testVal = testFn.apply(scope, tests[num].arguments);
            checkVal = tests[num].expectedVal;
            this.assert(testVal,checkVal, tests[num].test, tests[num].description);
        }
     
        console.groupEnd();
    }
};

function testBigT() {
    var tests=[{

    }];

    jutsu.assert();
}
