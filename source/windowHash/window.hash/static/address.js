
// function Router() {
//     this.routes = {};
//     this.currentUrl = '';
// }
// Router.prototype.route = function(path, callback) {
//     this.routes[path] = callback || function(){};
// };
// Router.prototype.refresh = function() {
//     this.currentUrl = location.hash.slice(1) || '/';
//     this.routes[this.currentUrl]();
// };
// Router.prototype.init = function() {
//     window.addEventListener('load', this.refresh.bind(this), false);
//     window.addEventListener('hashchange', this.refresh.bind(this), false);
// };
// window.Router = new Router();
// window.Router.init();

// var addAdresss = '';
// var addressList = [
//     {
//         name: '测试',
//         address: '西城区',
//         tel: '666'
//     }
// ];

// Router.route('/', function() {

//     $('#box').show();
//     $('#list,#add-address').hide();

//     $('#btn').click(function(){
//         location.hash = '#/list';
//     });


// });

// Router.route('/list', function() {

//     $('#list').show();
//     $('#box,#add-address').hide();
//     var listHtml = $('#list ul');
//     for (var index = 0; index < addressList.length; index++) {
//         var liHtml = `
//             <li>
//                 name：${addressList[index].name} <br/>
//                 address：${addressList[index].address} <br/>
//                 tel： ${addressList[index].tel} 
//             </li>
//         `;
//         listHtml.append(liHtml);
//     }
//     $('#go-add').click(function(){
//         location.hash = '#/add';
//     });

// });

// Router.route('/add', function() {

//     $('#add-address').show();
//     $('#box,#list').hide();

//     $('#add-btn').click(function(){
//         var address = {
//             name: $('#name').val(),
//             address: $('#address').val(),
//             tel: $('#tel').val()
//         };

//         addressList.push(address)
//         history.back();

//     });

// });

window.addEventListener('load', function(e) {
    console.log(e);
    changeFn(e);
}, false);
window.addEventListener('hashchange', function(e) {
    console.log(e);
    changeFn(e);
}, false);

var globalData = {
        addressList: [
            {
                name: '测试',
                address: '西城区',
                tel: '666'
            },
            {
                name: '测试2',
                address: '22',
                tel: '33'
            }
        ],
        defaultAddress: 0,
        user: {
            name: null,
            pwd: null
        }
    };

function changeFn(e) {
    var hash =  location.hash.slice(1) || '/';

    // if(!name){
    //     history.replaceState(null, null, 'address.html')
    // }

    switch (hash) {
        case '/':
            pageInit();
            break;
        
        case 'list':
            pageList();
            break;
        case 'add':
            pageAdd();
            break;
        default:
            pageInit();
            break;
    }

}


function pageInit(){
    
    $('#box').show();
    $('#list,#add-address').hide();

    var selectedHtml = `
        <li>
            name：${globalData.addressList[globalData.defaultAddress].name} <br/>
            address：${globalData.addressList[globalData.defaultAddress].address} <br/>
            tel： ${globalData.addressList[globalData.defaultAddress].tel} 
        </li>
    `;
    $('#selected-address').html(selectedHtml);

    $('#btn').click(function(){
        location.hash = '#list';
    });
}

function pageList() {

    $('#list').show();
    $('#box,#add-address').hide();

    var listDom = $('#list ul');
    var ListHtml = '';
    for (var index = 0; index < globalData.addressList.length; index++) {
        ListHtml += `
            <li>
                name：${globalData.addressList[index].name} <br/>
                address：${globalData.addressList[index].address} <br/>
                tel： ${globalData.addressList[index].tel} 
            </li>
        `;
    }
    listDom.html(ListHtml);

    $('#list li').click(function(){
        var index = $(this).index();
        console.log(index);
        globalData.defaultAddress = index;
        history.back();
    });

    $('#go-add').click(function(){
        location.hash = '#add';
    });
    

}


function pageAdd() {

    $('#add-address').show();
    $('#box,#list').hide();

    $('#add-btn').click(function(){
        var address = {
            name: $('#name').val(),
            address: $('#address').val(),
            tel: $('#tel').val()
        };

        globalData.addressList.push(address)
        history.back();

    });

}



