'USE STRICT';

const $topBtn = document.getElementById('js-topBtn');
const $topBtnA = document.getElementById('js-topBtnA')

$topBtnA.addEventListener('click',(e)=>{
    e.preventDefault();
})
// スクロールトップボタンの表示・非表示
window.addEventListener('scroll',()=>{
    if(window.pageYOffset>500){
        $topBtn.classList.remove('hidden');
    }else{
        $topBtn.classList.add('hidden');
    }
});

// トップボタンへのスクロール
$topBtn.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});


