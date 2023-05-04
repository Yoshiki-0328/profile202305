'use strict';
const $result = document.getElementById('js-result');
const $btns = document.querySelectorAll('.btn');

function calc(target){
    const targetVal=target.innerHTML;
    if(targetVal=='='){
        console.log($result.innerHTML);
        $result.innerHTML=eval($result.innerHTML);
    }else if(targetVal=='AC'){
        $result.innerHTML=0;
    }else{
        if($result.innerHTML==0){
            $result.innerHTML = targetVal;
        }else{
            $result.innerHTML += targetVal;
        }
    }
}
