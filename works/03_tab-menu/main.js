'use strict';

const $tabMenus = document.querySelectorAll('.tab-menu a');
const $tabContents =document.querySelectorAll('.tab-content li');

$tabMenus.forEach(tabMenu=>{
    tabMenu.addEventListener('click',(e)=>{
        e.preventDefault();
        // タブメニューのIDを取得し、activeを付与
        const target =tabMenu.dataset.id;
        for(let menu of $tabMenus){
            menu.classList.remove('active');
        }
        tabMenu.classList.add('active');

        // IDが同一のものをactiveを付与
        $tabContents.forEach(tabContent=>{
            tabContent.classList.remove('active');
            if(target == tabContent.dataset.id){
                tabContent.classList.add('active');
            }
        })
    })
})