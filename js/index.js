// all parameter use abbr. and non-superscript
// books
const book_chap = {
    "創": 50,
    "出": 40,
    "利": 27,
    "民": 36,
    "申": 34,
    "書": 24,
    "士": 21,
    "得": 4,
    "撒上": 31,
    "撒下": 24,
    "王上": 22,
    "王下": 25,
    "代上": 29,
    "代下": 36,
    "拉": 10,
    "尼": 13,
    "斯": 10,
    "伯": 42,
    "詩": 150,
    "箴": 31,
    "傳": 12,
    "歌": 8,
    "賽": 66,
    "耶": 52,
    "哀": 5,
    "結": 48,
    "但": 12,
    "何": 14,
    "珥": 3,
    "摩": 9,
    "俄": 1,
    "拿": 4,
    "彌": 7,
    "鴻": 3,
    "哈": 3,
    "番": 3,
    "該": 2,
    "亞": 14,
    "瑪": 4,
    "太": 28,
    "可": 16,
    "路": 24,
    "約": 21,
    "徒": 28,
    "羅": 16,
    "林前": 16,
    "林後": 13,
    "加": 6,
    "弗": 6,
    "腓": 4,
    "西": 4,
    "帖前": 5,
    "帖後": 3,
    "提前": 6,
    "提後": 4,
    "多": 3,
    "門": 1,
    "來": 13,
    "雅": 5,
    "彼前": 5,
    "彼後": 3,
    "約一": 5,
    "約二": 1,
    "約三": 1,
    "猶": 1,
    "啟": 22
}
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
// parameter in query
var view_book, view_chap;
// parameter in select (sec is str)
var sel_sec;
// sel_arr means: if [1] = True, then sec1 is selected
var sel_option_array, sel_sec_array;


// ABBR alter
var abbr = false;
// FUNCTION: ABBR
function get_abbr_book(name){
    if (abbr){
        return name;
    }else{
        return book_name[name];
    }
}


// initialize que_window
for (const [key, value] of Object.entries(book_chap)) {
    var button = document.createElement('button');
    button.textContent = key;
    button.setAttribute("class", "btn btn-outline-success btn-sm mx-1 my-1");
    document.getElementById("book_section").appendChild(button);
  
    // Add a click event listener to SELECTED BOOK
    (function(book) {
      button.addEventListener('click', function() {
        view_book = book;
        view_chap = "";
        sel_sec = "";
        update_info();
        // clear sec_area
        let element = document.getElementById("sec_section");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        que_chap_update(book);
      });
    })(key);
}

// updates for que when differnt button pressed
// BOOK pressed -> update chapter button
function que_chap_update(book){
    let element = document.getElementById("chap_section");
    // clear chapter buttons 
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    disabled_view(true);
    // add chap_buttom
    for (i=1; i<=book_chap[book]; i++) {
        var button = document.createElement('button');
        button.textContent = i;
        button.setAttribute("class", "btn btn-outline-secondary btn-sm mx-1 my-1");
        document.getElementById("chap_section").appendChild(button);
    
        // Add a click event listener to SELECTED CHAPTER
        (function(book, chap) {
            button.addEventListener('click', function() {
                view_chap = chap;
                sel_sec = "";
                update_info();
                que_sec_update(book, chap);
            });
        })(book, i);
      }
}
// CHAPTER pressed -> update sec content.
function que_sec_update(book, chap){
    // clear sec_area
    let element = document.getElementById("sec_section");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    disabled_view(true);
    // clear sel_sec_array
    sel_sec_array = [];
    // use API
    api_getallsec(book, chap).then((allsec) => {
        allsec.forEach(function (item, index, array) {
            var verse = document.createElement('option');
            verse.setAttribute("value", index+1);
            document.getElementById("sec_section").appendChild(verse);
            verse.innerHTML = item;
        });
    });
}

// SEC pressed -> update selection
document.getElementById("sec_section").addEventListener("change", function() {
    sel_option_array = document.getElementById("sec_section").selectedOptions;
    selection_update();
    update_info();
    disabled_view(false);
});

// update SEL_SEC (string)
function selection_update(){
    sel_sec_array = [];
    for (let i = 0; i < sel_option_array.length; i++) {
        sel_sec_array.push(parseInt(sel_option_array[i].value));
    }
    sel_sec = formatArray(sel_sec_array);
}
// 1, 2, 3 -> 1-3
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

// update INFO
function update_info(){
    if (sel_sec == ""){
        document.getElementById("bible_info").innerHTML = get_abbr_book(view_book) + " " + view_chap;
    }else{
        document.getElementById("bible_info").innerHTML = get_abbr_book(view_book) + " " + view_chap + ":" + sel_sec;
    }
}


// FUNCTION: COPY
document.addEventListener('copy', function(e){
    var text = get_abbr_book(view_book) + " " + view_chap + ":" + sel_sec + "\n";
    for (let i = 0; i < sel_option_array.length; i++) {
        text += sel_option_array[i].text;
    }
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
});

// FUNCTION: PROJECT
// disability
function disabled_view(d){
    document.getElementById("view_button").disabled = d;
}

// PARAM
document.getElementById("view_button").addEventListener("click", function() {
    const url = 'view.html';
    // Truncate to 50 character
    var truncate_sec = "";
    var trun_or_not = false;
    for (let i = 0; i < sel_option_array.length; i++) {
        if (document.getElementById("trunChecked").checked){
            if (truncate_sec.length > 50){
                sel_sec_array = sel_sec_array.slice(0, i);
                trun_or_not = true;
                break;
            }
        }
        truncate_sec += sel_option_array[i].text;
    }
    
    // get new info
    sel_sec = formatArray(sel_sec_array);
    // get chapter_length
    var chap_length = document.getElementById("sec_section").options.length;
    var title = get_abbr_book(view_book) + " " + view_chap + ":" + sel_sec;
    if (trun_or_not){
        title += " ⤑";
    }
    // request
    const params = {text_title:title, text_verse: truncate_sec, book: view_book, chap: view_chap, first: sel_sec_array[0], last: sel_sec_array[sel_sec_array.length - 1], chap_len: chap_length};
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const requestUrl = url + '?' + queryString;
    window.open(requestUrl);
});

// with JSON API
const url = 'https://bible.fhl.net/json/qb.php';

function api_getallsec(book, chap){
    const params = { chineses:book, chap: chap, strong: 0, gb: 0, };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const requestUrl = url + '?' + queryString;
    var allsec = [];
    return fetch(requestUrl)
        .then((response) => {
            console.log(response);
            return response.json(); 
        }).then((data) => {
            for (const sec of data.record){
                var nowsec = allsec.push(sec["sec"]+sec["bible_text"]);
            }
            return allsec;
        }).catch((err) => {
        console.log('錯誤:', err);
    });
}