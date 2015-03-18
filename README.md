# tanakatemplate
お遊びで作ったjsのテンプレート


## 使い方

- `js/template.js` を読み込む
```html:index.html
<script src='js/template.js'></script>
```
- template部分を書いてみる
```html:index.html
<script type='text/tanaka-template'>
<div align="center">
  <p>{{TITLE}}</p>
  <p>{{DISCRIPTION}}</p>
  <img src='{{IMG_SRC}}' width='300' height='250' />
</div>
</script>
```
プレースホルダは任意です。
- newしてプレースホルダの値を渡してあげる
```javascript:index.js
<script>
  new TanakaTemplate(
    {
      TITLE: 'タイトルだよーん♪',
      DISCRIPTION: '様々な事象について諸々を諸々するよね',
      IMG_SRC: 'http://person-link.co.jp/img/logo.png'});
</script>
```
- 後から読み込む場合は引数無しでインスタンスを生成
```javascript:index.js
var template2 = new TanakaTemplate();
```
- オプションパラメータを設定してあげて
```javascript:index.js
template2.setOpt({
  type: 'text/oreno-template',
  target: document.getElementById('target'),
  befortag: '<<',
  aftertag: '>>',
});
```
- 最後にrunでパラメータを渡す
```javascript:index.js
template2.run({
  TITLE: '二つ目のタイトルだよーん♪',
  DISCRIPTION: 'ふたつめのdiscriptionだよー',
  IMG_SRC: 'http://person-link.co.jp/img/logo.png',
  WIDTH: '300',
  HEIGHT: '250'
});
```

## メソッド

### Constructor
| name | param | discription |
|:-----------|:------------|:------------|
|new TanakaTemplate(opt_arg, opt_opt) | opt_arg: Object,<br> opt_opt: Object | プレースホルダに充てる変数を渡すと<br>設定したテンプレートを取り込んでその場に書き出す<br>以下に設定したoptを渡す事も出来る<br>引数無しの場合はインスタンスの生成のみ行う |

### Instance Methods
| name | param | discription |
|:-----------|:------------|:------------|
| setOpt(opt) | opt: Object | 下記オプションの上書き処理をする |
| run(arg) | arg: Object | プレースホルダに設定された箇所に挿入する値を入れて書き出していく |

### Optional Params
| name | type | default | discription |
|:-----------|:------------|:------------|:------------|
| type | string | text/tanaka-template | 取得するscriptタグに設定されているtype属性<br>最も上部にあるタグを取得する<br>templateが設定されている場合はそっちが優先される |
| tmeplate | Element | null | テンプレートのタグ<br>ただしscriptタグでないといけない |
| target | Element | null | 書き出しを行う場所 |
| befortag | string | {{ | プレースホルダの始まりのタグ |
| aftertag | string | }} | プレースホルダの終わりのタグ |
| runFlg | boolean | true | 即時書き出しを行うかどうか |