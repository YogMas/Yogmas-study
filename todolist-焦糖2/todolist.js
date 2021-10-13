window.addEventListener('load', function () {
    load();
    var ipt = document.querySelector('#ipt')
    ipt.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            //读取本地存储原来的数据
            var local = getDate();
            // 更新数据
            var day = new Date();
            var day_real = timer(day);
            var battle = +new Date();
            local.push({
                content: this.value,
                done: false,
                time: day_real,
                time_battle: battle
            });
            saveDate(local);   //储存数据
            load();  //重新加载
            click(); //点击删除
            click_ol();
            awd();
        }
    });
    //隐藏已经完成
    hidden();
    function hidden_if() {
        if (check_done.checked) {
            var ol = document.querySelector('ol')
            var li = ol.children

            if (ol.children === []) {
            } else {
                for (i = li.length - 1; i >= 0; i--) {
                    li[i].parentNode.removeChild(li[i])
                }
            }
        } else {
            load();
            click(); //点击删除
            click_ol();
            awd();
        }
    }
    function hidden() {

        var check_done = document.querySelector('#check_done')
        var label_done = document.querySelector('.switch_done')
        label_done.addEventListener('click', hidden_if)
    }
    //清空所有已完成按钮
    var clearall = document.querySelector('#clearall')
    clearall.addEventListener('click', function () {
        var data = getDate();
        var newdata = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].done == false) {
                newdata.push(data[i]);
            }
        }
        saveDate(newdata);
        load();
        click();
        click_ol();
        awd();
        hidden_if();
    })
    //升序按钮和降序按钮
    var up = document.querySelector('#order_up')
    var down = document.querySelector('#order_down')
    down.addEventListener('click', function () {
        var data1 = getDate();
        var data2 = data1.sort(compareup("time_battle"))
        saveDate(data2);
        load();
        click();
        click_ol();
        awd();
        hidden_if();
    })
    up.addEventListener('click', function () {
        var data1 = getDate();
        var data2 = data1.sort(comparedown("time_battle"))
        saveDate(data2)
        load();
        click();
        click_ol();
        awd();
        hidden_if();
    })
    //升序函数
    function compareup(data) {
        return function (obj1, obj2) {
            var value1 = obj1[data];
            var value2 = obj2[data]
            return value1 - value2
        }
    }
    //降序函数
    function comparedown(data) {
        return function (obj1, obj2) {
            var value1 = obj1[data];
            var value2 = obj2[data]
            return value2 - value1
        }
    }
    //黑夜和白天模式切换
    var check_day = document.querySelector('#check_day')
    var switch_day = document.querySelector('.switch_day')
    var p = document.querySelectorAll('p')
    var h2 = document.querySelectorAll('h2')
    console.log(p);
    switch_day.addEventListener('click', function () {
        if (check_day.checked) {
            document.body.style = 'background-color: #555;'
            p[0].style = 'color:white;'
            p[1].style = 'color:white;'
            h2[0].style = 'color:white;'
            h2[1].style = 'color:white;'
        } else {
            document.body.style = 'background-color: #ccc;'
            p[0].style = 'color:black;'
            p[1].style = 'color:black;'
            h2[0].style = 'color:black;'
            h2[1].style = 'color:black;'
        }
    })
    //todolist 删除操作
    var ul = document.querySelector('ul')
    var li = ul.children
    var index = ''
    click();
    function click() {
        for (i = 0; i < li.length; i++) {
            (function () {
                var temp = i
                li[i].children[3].addEventListener('click', function () {
                    index = this.id
                    var date = getDate();
                    date.splice(index, 1)
                    saveDate(date);
                    load();
                    click();
                    click_ol();
                    awd();
                    hidden_if();
                })
            })()
            //js循环添加onclick函数 不大懂原理 百度的 function前面为什么加括号也不知道
        }
    }
    var ol = document.querySelector('ol')
    var olli = ol.children
    var index = ''
    click_ol();
    function click_ol() {
        for (i = 0; i < olli.length; i++) {
            (function () {
                var temp = i
                olli[i].children[3].addEventListener('click', function () {
                    index = this.id
                    var date = getDate();
                    date.splice(index, 1)
                    saveDate(date);
                    load();
                    click();
                    click_ol();
                    awd();
                })
            })()
        }
    }
    // todolist 正在进行和已经完成
    awd();
    function awd() {
        var check = document.querySelectorAll('#check')
        console.log(check);
        var index = ''
        check_click();
        function check_click() {
            for (i = 0; i < check.length; i++) {
                (function () {
                    var temp = i
                    check[i].addEventListener('click', function () {
                        var data = getDate();
                        index = this.nextElementSibling.nextElementSibling.nextElementSibling.id
                        data[index].done = this.checked
                        saveDate(data)
                        load()
                        awd();
                        click();
                        click_ol();
                        hidden_if();
                    })
                })()
            }
        }
    }


    //构造函数读取本地存储数据
    function getDate() {
        var date = localStorage.getItem("todolist")
        if (date != null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    }
    //保存本地存储时局
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date));
    }
    //存储数据渲染
    function load() {
        //读取本地数据
        var load_data = getDate();
        var ul = document.querySelector('.todolist')
        var ol = document.querySelector('.done')
        //遍历之前先清空ul中的数据
        ul.innerHTML = ''
        ol.innerHTML = ''
        //遍历数据
        for (i = 0; i < load_data.length; i++) {
            if (load_data[i].done == false) {
                var li = document.createElement('li')
                ul.appendChild(li)
                var input = document.createElement('input')
                input.type = 'checkbox'
                input.id = 'check'
                li.appendChild(input)
                var div = document.createElement('div')
                div.innerHTML = load_data[i].content
                li.appendChild(div)
                var div = document.createElement('div')
                div.innerHTML = load_data[i].time
                li.appendChild(div)
                var div = document.createElement('div')
                div.id = i
                div.innerHTML = ''
                li.appendChild(div)
            }
            else {
                console.log(load_data[i].done);
                var li = document.createElement('li')
                ol.appendChild(li)
                var input = document.createElement('input')
                input.type = 'checkbox'
                input.id = 'check'
                input.checked = 'checked'
                li.appendChild(input)
                var div = document.createElement('div')
                div.innerHTML = load_data[i].content
                li.appendChild(div)
                var div = document.createElement('div')
                div.innerHTML = load_data[i].time
                li.appendChild(div)
                var div = document.createElement('div')
                div.id = i
                div.innerHTML = ''
                li.appendChild(div)
            }
        }
    }
    //转化日期格式函数
    function timer(time) {
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var date = time.getDate();    //当天号数
        date = date < 10 ? '0' + date : date;
        var hours = time.getHours();
        hours = hours < 10 ? '0' + hours : hours;
        var minutes = time.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var seconds = time.getSeconds();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    }

})