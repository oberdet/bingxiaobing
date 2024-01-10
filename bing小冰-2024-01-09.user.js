// ==UserScript==
// @name         bing小冰
// @namespace    http://tampermonkey.net/
// @version      2024-01-09
// @description  bing国内小冰是可以用的但是js屏蔽了，本脚本写的垃圾
// @author       You
// @match        
// @icon         
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    var ddiv = document.getElementById("ev_send_input")
    var butt = document.getElementById("ev_send_button")
    var ddisv = document.getElementById("ev_send_text")
    if (ddisv !== null) {
        butt.remove()
        ddisv.remove()
        var newinput = document.createElement('input');
        var newDiv = document.createElement('div');
        newDiv.className = "ev_send_button"
        newDiv.id = "ev_send_buttonnew"
        newinput.id = "ev_send_texts"
        newinput.className = 'ev_send_text';
        newinput.placeholder = ("来说点什么吧")
        ddiv.appendChild(newinput);
        ddiv.appendChild(newDiv);
        var newnnDiv = document.createElement('div');
        var dddiv = document.getElementById("ev_send_buttonnew")
        newnnDiv.className = "ev_send_button_img"
        newnnDiv.id = "ev_send_button_imgnew"
        dddiv.appendChild(newnnDiv);
    }
    var dddivs = document.getElementById("ev_send_buttonnew")
    function rt() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
    }
    function yu() {
        return (rt() + rt() + rt() + rt() + rt() + rt() + rt() + rt()).toLowerCase()
    }
    dddivs.onclick = function () {
        var ddisvs = document.getElementById("ev_send_texts")

        // var i = Aes.encrypt("百度是什么", "3d9d5f16-5df0-43d7-902e-19274eecdc41", 256)
        console.log(ddisvs.value)
        var i = Aes.encrypt(ddisvs.value, "3d9d5f16-5df0-43d7-902e-19274eecdc41", 256)
        var c = (new Date).getTime().toString()
        var uas = sj_gx()
        uas.timeout = 1e4
        uas.open("POST", "/english/xiaoiceapi?cc=cn&ensearch=0", !0)
        var l = {
            senderId: null,
            senderNickname: "",
            content: {
                text: i,
                imageUrl: "",
                imageBase64: null,
                audioUrl: "",
                audioBase64: null
            },
            msgId: yu(),
            timestamp: c
        }
        var wuo = document.getElementById('ev_talkbox');
        wuo.innerHTML = wuo.innerHTML + '<div class="ev_msg_wrapper" data-bm="54"><img class="ev_my_img" src="https://storage.live.com/users/0xc79e44ca527b7a35/myprofile/expressionprofile/profilephoto:UserTileStatic/p?ck=1&amp;ex=720&amp;sid=2C8788212C13678B063F9C232D3D663E&amp;fofoff=1" data-bm="53"><div class="ev_my_msg">' + ddisvs.value + '</div></div>'

        uas.onreadystatechange = function () {
            if (uas.readyState === 4 && uas.status === 200) {
                const data = JSON.parse(uas.responseText); // 将 JSON 字符串转换为 JavaScript 对象
                const text = data[0].content.text; // 访问 "text" 字段
                var wuos = document.getElementById('ev_talkbox');
                wuos.innerHTML = wuos.innerHTML + '<div class="ev_msg_wrapper" data-bm="71"><div id="ev_zo_img" class="ev_zo_img"></div><div class="ev_zo_msg"><span data-bm="72">' + text + '</span></div></div>'

                console.log(text); // 打印 "text" 字段
            }
        };
        uas.setRequestHeader("Content-Type", "application/json")
        uas.send(JSON.stringify(l))
        ddisvs.value = ""


    }

})();