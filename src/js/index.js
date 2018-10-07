$(function() {
    var wrap = new BScroll('.wrap', {
        click: true
    });

    $.ajax({
        url: '../data/data.json',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.code === 1) {
                render(res.data);
            }
        }
    })

    function render(data) {
        var obj = {};

        // obj = {
        //     'A':{
        //         title:'A',
        //         list:[
        //             {
        //                 "MasterID": "9",
        //                 "Name": "奥迪",
        //                 "CoverPhoto": "http://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_9_100.png",
        //                 "Spelling": "Aodi",
        //                 "tagurl": "http://picture.eclicks.cn/g1/l/2017/09/22/c3c70104705ff62e_86_32.png"
        //             }
        //         ]
        //     }
        // }
        data.forEach(function(item) {
            var first = item.Spelling.substr(0, 1);
            if (!obj[first]) {
                obj[first] = {
                    title: first,
                    list: []
                };
            }

            obj[first].list.push(item);


        })

        var arr = [];

        for (var i in obj) {
            arr.push(obj[i])
        }


        arr.sort(function(a, b) {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log(arr);

        var str = '';

        var navStr = '';

        arr.forEach(function(item) {
            str += `<li>
                <h2>${item.title}</h2>
                <ol>`;
            item.list.forEach(function(v) {
                str += `
                <li>${v.Name}</li>
                `
            })
            str += `</ol></li>`;

            navStr += `<li>${item.title}</li>`;
        });

        $('.list').append(str);
        $('.nav-list').append(navStr);
    }

    $('.nav-list').on('click', 'li', function() {
        var index = $(this).index();
        console.log(index);
        wrap.scrollToElement($('.list>li').eq(index)[0]);
    })


    // res.code   //1   登录成功   2.用户不存在   3.密码错误   

})