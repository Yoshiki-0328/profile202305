"use strict";

// 現在時刻
const $nowTime = document.getElementById("js-nowTime");
let now;
let hour;
let minute;
let second;
window.addEventListener("load", () => {
  setInterval(function () {
    nowTimeGet();
    $nowTime.innerHTML = `${hour}:${minute}:${second}`;
  }, 1000);
});

function nowTimeGet() {
  now = new Date();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return hour, minute, second;
}

// ■ストップウォッチ
const $watch = document.getElementById("js-stopwatch");
const $start = document.getElementById("js-stopwatchStart");
const $stop = document.getElementById("js-stopwatchStop");
const $resset = document.getElementById("js-stopwatchResset");

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours() - 9).padStart(2, "0");
  const m = String(currentTime.getMinutes()).padStart(2, "0");
  const s = String(currentTime.getSeconds()).padStart(2, "0");

  $watch.textContent = `${h}:${m}:${s}`;
  timeoutID = setTimeout(displayTime, 1000);
}

// スタートボタンがクリックされたら時間を進める
$start.addEventListener("click", () => {
  $start.disabled = true;
  $stop.disabled = false;
  $resset.disabled = true;
  startTime = Date.now();
  displayTime();
});

// ストップボタンがクリックされたら時間を止める
$stop.addEventListener("click", function () {
  $start.disabled = false;
  $stop.disabled = true;
  $resset.disabled = false;
  clearTimeout(timeoutID);
  stopTime += Date.now() - startTime;
});

// リセットボタンがクリックされたら時間を0に戻す
$resset.addEventListener("click", function () {
  $start.disabled = false;
  $stop.disabled = true;
  $resset.disabled = true;
  $watch.textContent = "00:00:00";
  stopTime = 0;
});




// ■カウントダウンタイマー
const $timer=document.getElementById('js-timerTime');
const $tStart = document.getElementById('js-timerStart');
const $tStop =document.getElementById('js-timerStop');
const $tResset =document.getElementById('js-timerResset');

const $input = document.querySelector('.timer-input input');
// 入力値を取得

// ターゲット時間
let tTarget;
let tStartTime;
let tStopTime=0;
let tCountId ;
let setTime;

// ターゲット時間をセットし描画
function displayCount(){
  tTarget = new Date(tStartTime+(1000*setTime)-Date.now()-tStopTime);
  // console.log(tStartTime,Date.now(),tStopTime);
  let ch = String(tTarget.getHours()-9).padStart(2,'0');
  let cm = String(tTarget.getMinutes()).padStart(2,'0');
  let cs = String(tTarget.getSeconds()).padStart(2,'0');
  if(cs==0){
    tResset();
    alert('終了です');
  }else{
    // console.log(`${ch}:${cm}:${cs}`);
    $timer.innerHTML=(`${ch}:${cm}:${cs}`);
    tCountId = setTimeout(displayCount,500);
  }
}

// スタートボタンを押したとき
$tStart.addEventListener('click',()=>{
  $tStart.disabled = true;
  $tStop.disabled = false;
  $tResset.disabled = true;
  setTime =$input.value;
  tStartTime = Date.now();
  displayCount();
});

// ストップボタンを押したとき
$tStop.addEventListener('click',()=>{
  $tStart.disabled = false;
  $tStop.disabled = true;
  $tResset.disabled = false;
  clearTimeout(tCountId);
  tStopTime +=Date.now()-tStartTime;
});

// リセットボタンが押されたとき
$tResset.addEventListener("click", function () {
  tResset();
});

function tResset(){
  $tStart.disabled = false;
  $tStop.disabled = true;
  $tResset.disabled = true;
  $timer.textContent = "00:00:00";
  tStopTime = 0;  
}