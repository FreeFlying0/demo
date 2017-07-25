
function Flag() {

    var pay = 0;
    var number = 0;

    Object.defineProperty(this, 'pay', {
        get: function() {
            return pay;
        },
        set: function(value) {
            pay = value;
            flagFn();
        }
    });


    function flagFn() {
        if (pay === 0) {
            console.log('置为0的逻辑');
        } else {
            console.log('置为1的逻辑');
        }
    }
};

var flag = new Flag();



