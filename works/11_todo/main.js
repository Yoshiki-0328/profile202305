const $newData = document.querySelector("#newData");//インプットボックスの要素取得
const $list = document.querySelector('#list');//リスト表示させる要素
let $values=[];//TODOリストアイテムを格納します。


// ★★todoの新規作成処理
async function createData() {
  // バリデーション
  if($newData.value.trim()==''){
    alert('TODO登録データが入力されていません。')
    return;
  }
  // フェッチ通信でFIREBASEへPOSTする
  await fetch(
    "https://todo-list-a652c-default-rtdb.firebaseio.com/todo.json",//FIREBASEのURL+階層名+.json
    {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({todo: $newData.value}),  //入力値をJSONへ変換する
    }
);
  $newData.value="";  //インプットボックスを空欄
  getData()  //getDataメソッドでリストアイテムを最新化する
}



//★★データ取得処理
async function getData() {
  // フェッチ通信でFIREBASEのデータを取得
  const response = await fetch(
    "https://todo-list-a652c-default-rtdb.firebaseio.com/todo.json",//FIREBASEのURL+階層名+.json
    { method: "GET" }
    );
  const responseData = await response.json();//promiseをJSONへ変換
  // 表示リストを一度クリア
  while($list.lastChild){
    $list.removeChild($list.lastChild);
  }
  // FIREBASEから取得したデータが0件の場合メッセージを表示する
  if(responseData==null){
    const p=document.createElement('p');
    p.innerHTML='登録済みのTODOがありません。'
    $list.appendChild(p);
  }
  // FIREBASEから取得したデータをリスト表示
  for(const i in responseData){ //JSONに格納された値を繰り返し処理で抽出
    const li = document.createElement('li');
    const inp = document.createElement('input')
    inp.type='checkbox'
    inp.id=i
    const p=document.createElement('p');
    p.innerHTML=responseData[i].todo
    li.appendChild(inp)
    li.appendChild(p)
    $list.appendChild(li);
  }
  refresh()  //表示されているリストアイテムにイベント処理を付与する
}

// リストアイテムの要素をJavascript側で再取得します
async function refresh(){
  $values = document.querySelectorAll('#list li input')
  // input要素がクリックされたい際に、クラスの切替とチェックの切替を行う
  $values.forEach((val)=>{
    val.addEventListener('click',()=>{
      if(val.checked==false){
        val.checked=false;
        val.classList.remove('done')
      }else{
        val.checked=true;
        val.classList.add('done')
      }
    })
  })
}


//★★データ削除関数実行
async function deleteData(){
  const deleteList=[]
  // リストアイテムにチェックがあるアイテムを削除対象の配列に格納する
  $values.forEach((val)=>{
    if(val.classList.contains('done')){
      deleteList.push(val);
    }
  })
  // 削除対象配列のIDのアイテムをFIREBASEからDELETEする
  for(const i of deleteList){
  await fetch(
    `https://todo-list-a652c-default-rtdb.firebaseio.com/todo/${i.id}.json`,//FIREBASEのURL+階層名+.json
    {method: "DELETE"}
  );
  }
  getData();  //getDataメソッドでリストアイテムを最新化する
}


// 画面ロードの度に、リストアイテムを最新化します。
window.addEventListener('load',getData)


