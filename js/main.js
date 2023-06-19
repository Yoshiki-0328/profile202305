// modal------------------
// ------------------------
// ------------------------
//1. テキストを含む一般的なモーダル
$(".info").modaal({
	overlay_close:true,//モーダル背景クリック時に閉じるか
	before_open:function(){// モーダルが開く前に行う動作
		$('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
	},
	after_close:function(){// モーダルが閉じた後に行う動作
		$('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
	}
});
	

// fadeup------------------
// ------------------------
// ------------------------
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {
  //ふわっと動くきっかけのクラス名と動きのクラス名の設定
  $(".fadeUpTrigger").each(function () {
    //fadeInUpTriggerというクラス名が
    var elemPos = $(this).offset().top + 10; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp");
      // 画面内に入ったらfadeInというクラス名を追記
    } else {
      $(this).removeClass("fadeUp");
      // 画面外に出たらfadeInというクラス名を外す
    }
  });
}
//関数でまとめることでこの後に違う動きを追加することが出来ます
$(".fadeDownTrigger").each(function () {
  //fadeInDownTriggerというクラス名が
  var elemPos = $(this).offset().top - 50; //要素より、50px上の
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight) {
    $(this).addClass("fadeDown");
    // 画面内に入ったらfadeDownというクラス名を追記
  } else {
    $(this).removeClass("fadeDown");
    // 画面外に出たらfadeDownというクラス名を外す
  }
});
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述

// topscroll------------------
// ------------------------
// ------------------------
const $topBtn = document.getElementById("js-topBtn");
const $topBtnA = document.getElementById("js-topBtnA");

$topBtnA.addEventListener("click", (e) => {
  e.preventDefault();
});
// スクロールトップボタンの表示・非表示
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    $topBtn.classList.remove("hidden");
  } else {
    $topBtn.classList.add("hidden");
  }
});

// トップボタンへのスクロール
$topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
