# 提出課題

## 題名

- RestAPIを使用したTodoリスト

## ▼必須要件

・Todo の要素として次の項目を実装している
- タイトル
- 内容
- 検索
- 登録
- 更新
- 削除
- API 仕様書 以下に記載
  -  app/api/api.html
  -  app/api/api.md

## 追加項目

- [x] ユーザごとにTodoの操作が可能で、認証/認可を行える

## 使用環境
- [docker compose](https://docs.docker.com/compose/)
- git
- mysql8
- node.js 18.12.1
  - React

## 実行方法

- このリポジトリをローカルにクローン
```
git clone git@github.com:xazynya/todo-api.git
```
/todo-api 直下で以下コマンド実施
```
$ docker compose up -d
```
- http://localhost:3000/　にアクセス

## 注意点

- 実装でものすごく甘い点があるため実用に向かない。
  <br> ┗ 今後の課題とする。

## 苦労したところ

- node.js react で初めて作成したアプリ、
- とにかく環境構築、Vagrant 上で構築した結果、dockerに移行するのに手間取った
最初からdocker上で環境を構築すべきだった。
