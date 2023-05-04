'use strict';

const $btns = document.querySelectorAll('ul li a');
const $quesiton = document.getElementById('js-question');

const question=[
    {
        question:'今年のプロ野球日本一は？',
        options:['オリックス','ヤクルト','西武','巨人'],
        answer:'オリックス'
    },
    {
        question:'今年の西武の順位は？',
        options:['1位','2位','3位','4位'],
        answer:'3位'
    },
    {
        question:'今年のパリーグのホームラン王は？',
        options:['山川','柳田','吉田','浅村'],
        answer:'山川'
    }
];

// 1問目の問題セット
let questionNum =0;
quesetionSet();
// ２問目以降の問題セット
function quesetionSet(){
    $quesiton.innerText=question[questionNum].question;
    for(let i = 0; i<4;i++){
        $btns[i].innerText = question[questionNum].options[i];
    }

};

// 押された選択肢と回答を比較する
let answerNum =0;
$btns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.innerText == question[questionNum].answer){
            alert('正解！');
            answerNum++;
        }else{
            alert('不正解！');
        }
        questionNum++;
        if(questionNum>question.length-1){
            alert(`終了です。${answerNum}問正解です。`);
            questionNum=0;
        }
            quesetionSet();
    });
});




