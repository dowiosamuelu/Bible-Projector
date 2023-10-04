const book_name = {
    "創": "創世記",
    "出": "出埃及記",
    "利": "利未記",
    "民": "民數記",
    "申": "申命記",
    "書": "約書亞記",
    "士": "士師記",
    "得": "路得記",
    "撒上": "撒母耳記上",
    "撒下": "撒母耳記下",
    "王上": "列王紀上",
    "王下": "列王紀下",
    "代上": "歷代志上",
    "代下": "歷代志下",
    "拉": "以斯拉記",
    "尼": "尼希米記",
    "斯": "以斯帖記",
    "伯": "約伯記",
    "詩": "詩篇",
    "箴": "箴言",
    "傳": "傳道書",
    "歌": "雅歌",
    "賽": "以賽亞書",
    "耶": "耶利米書",
    "哀": "耶利米哀歌",
    "結": "以西結書",
    "但": "但以理書",
    "何": "何西阿書",
    "珥": "約珥書",
    "摩": "阿摩司書",
    "俄": "俄巴底亞書",
    "拿": "約拿書",
    "彌": "彌迦書",
    "鴻": "那鴻書",
    "哈": "哈巴谷書",
    "番": "西番雅書",
    "該": "哈該書",
    "亞": "撒迦利亞書",
    "瑪": "瑪拉基書",
    "太": "馬太福音",
    "可": "馬可福音",
    "路": "路加福音",
    "約": "約翰福音",
    "徒": "使徒行傳",
    "羅": "羅馬書",
    "林前": "哥林多前書",
    "林後": "哥林多後書",
    "加": "加拉太書",
    "弗": "以弗所書",
    "腓": "腓立比書",
    "西": "歌羅西書",
    "帖前": "帖撒羅尼迦前書",
    "帖後": "帖撒羅尼迦後書",
    "提前": "提摩太前書",
    "提後": "提摩太後書",
    "多": "提多書",
    "門": "腓利門書",
    "來": "希伯來書",
    "雅": "雅各書",
    "彼前": "彼得前書",
    "彼後": "彼得後書",
    "約一": "約翰壹書",
    "約二": "約翰貳書",
    "約三": "約翰參書",
    "猶": "猶大書",
    "啟": "啟示錄"
};


const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

// Title
document.getElementById("info").innerHTML = urlParams.get("text_title");
verses = urlParams.get("text_verse");
// Supercript
var mapObj = {
  0:"⁰",
  1:"¹",
  2:"²",
  3:"³",
  4:"⁴",
  5:"⁵",
  6:"⁶",
  7:"⁷",
  8:"⁸",
  9:"⁹",
};
verses = verses.replace(/1|2|3|4|5|6|7|8|9|0/gi, function(matched){
  return mapObj[matched];
});
// Verse
document.getElementById("verse").innerHTML = verses;

// PRE-LOAD next 3
var book = urlParams.get("book");
var chap = urlParams.get("chap");
var chap_len = urlParams.get("chap_len");
var first = urlParams.get("first");
var last = urlParams.get("last");
var pre_len = 3, next_len = 3;
// is there 3?
if (first < 4){
    document.getElementById("prev_3").setAttribute("hidden", true);
    pre_len = 2;
}
if (first < 3){
    document.getElementById("prev_2").setAttribute("hidden", true);
    pre_len = 1;
}
if (first < 2){
    document.getElementById("prev_1").setAttribute("hidden", true);
    pre_len = 0;
}
if (last > chap_len - 3){
    document.getElementById("next_3").setAttribute("hidden", true);
    next_len = 2;
}
if (last > chap_len - 2){
    document.getElementById("next_2").setAttribute("hidden", true);
    next_len = 1;
}
if (last > chap_len - 1){
    document.getElementById("next_1").setAttribute("hidden", true);
    next_len = 0;
}


// preload
const url = 'https://bible.fhl.net/json/qb.php';
// how many PRE and NEXT
var pre_info = "", next_info = "";
var pre_sec = [];
var next_sec = [];
// Query
if (next_len != 0){
    if (next_len == 1){
        next_info = parseInt(last) + 1;
    }else{
        next_info = (parseInt(last)+1)+"-"+(parseInt(last) + next_len);
    }
    api_getsec(book, chap, next_info).then((secs) => {
        secs.forEach(function (item, index, array) {
            next_sec.push(item);
        });
    });
}
if (pre_len != 0){
    if (pre_len == 1){
        pre_info = parseInt(first) - 1;
    }else{
        pre_info = (parseInt(first) - pre_len)+"-"+(parseInt(first) - 1);
    }
    api_getsec(book, chap, pre_info).then((secs) => {
        secs.forEach(function (item, index, array) {
            pre_sec.push(item);
        });
    });
}


// Event handler
document.getElementById("prev_3").addEventListener("click", function() {
    redirect_prev_sec(3);
});
document.getElementById("prev_2").addEventListener("click", function() {
    redirect_prev_sec(2);
});
document.getElementById("prev_1").addEventListener("click", function() {
    redirect_prev_sec(1);
});
document.getElementById("next_1").addEventListener("click", function() {
    redirect_next_sec(1);
});
document.getElementById("next_2").addEventListener("click", function() {
    redirect_next_sec(2);
});
document.getElementById("next_3").addEventListener("click", function() {
    redirect_next_sec(3);
});
// redirect PREV
function redirect_prev_sec(len){
    const url = 'view.html';
    var info;
    if (len == 1){
        info = parseInt(first) - 1;
    }else{
        info = (parseInt(first) - len)+"-"+(parseInt(first) - 1);
    }

    const params = {text_title:(book_name[book] + " " + chap + ":" + info), text_verse: pre_sec.slice(pre_sec.length - len,pre_sec.length).join(), book: book, chap: chap, first: (parseInt(first)-len), last: (parseInt(first)-1), chap_len: chap_len};
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const requestUrl = url + '?' + queryString;
    window.location.replace(requestUrl);
}
// redirect NEXT
function redirect_next_sec(len){
    const url = 'view.html';
    var info;
    if (len == 1){
        info = parseInt(last) + 1;
    }else{
        info = (parseInt(last)+1)+"-"+(parseInt(last) + len);
    }

    const params = {text_title:(book_name[book] + " " + chap + ":" + info), text_verse: next_sec.slice(0, len).join(), book: book, chap: chap, first: (parseInt(last)+1), last: (parseInt(last)+len), chap_len: chap_len};
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const requestUrl = url + '?' + queryString;
    window.location.replace(requestUrl);
}

// Hint: fullscreen
if (!window.screenTop && !window.screenY){
    var toast_hint = new bootstrap.Toast(document.querySelector('.toast')).show();
}

// common function
// API
function api_getsec(book, chap, interval){
    const params = { chineses:book, chap: chap, sec: interval, strong: 0, gb: 0, };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const requestUrl = url + '?' + queryString;
    var secs = [];
    return fetch(requestUrl)
        .then((response) => {
            console.log(response);
            return response.json(); 
        }).then((data) => {
            for (const sec of data.record){
                secs.push(sec["sec"]+sec["bible_text"]);
            }
            return secs;
        }).catch((err) => {
        console.log('錯誤:', err);
    });
}
// 1,2,3 -> 1-3
function formatArray(arr) {
    let ranges = [];
    let start = arr[0];
    let end = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == end + 1) {
            end = arr[i];
        } else {
            ranges.push(start == end ? start.toString() : start + "-" + end);
            start = arr[i];
            end = arr[i];
        }
    }
    
    ranges.push(start == end ? start.toString() : start + "-" + end);
    
    return ranges.join(",");
}