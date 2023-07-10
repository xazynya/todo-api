# TodoList API

## Todo [/api{?user_id,searchtext}]
## Todo リスト取得.検索API [GET]  

#### 処理概要
* ユーザーが登録したTODOの一覧を返す。
* searchtextをリクエストに含めると絞り込み結果を返す。

+ Parameters
    + user_id: 1  (number, optional) - ユーザーID   
    + searchtext: 明日 (string, optional) - 取得件数
+ Response 200 (application/json)
    + Attributes
        + content: 買いに行く予定 (string) - 
        + title: メロンパン  (string, required) - アクセストークン
        + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538` (string) - uuid
## Todo [/api]
## Todo 登録 API [POST]  
#### 処理概要
* 新たにTODOを追加する。
+ Parameters
    + user_id: 2  (number, optional) - ユーザーID    
    + title: メロンパン  (string, optional) -
    + content: メロンパンを購入すること  (string, optional) -
+ Response 200 (application/json)
    + Attributes
        + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538` (string) - uuid
## Todo [/api/{uuid}]
## Todo 更新 API [PUT]
#### 処理概要
* 新たにTODOを追加する。

+ Parameters
    + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538`  (string) - Todoitemのuuid
    + title: メロンパン  (string, optional) -
    + content: メロンパンを購入すること  (string, optional) -
    + completed: 0 (number) - 対応済みフラグ
+ Response 200 (application/json)
    + Attributes
        + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538` (string) - uuid
## Todo [/api/{uuid}]
## Todo 削除 API [DELETE]
+ Parameters
    + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538`  (string) - Todoitemのuuid
+ Response 200 (application/json)
    + Attributes
        + uuid: `07ca5401-3b09-4ac9-9965-0e0eac1fd538` (string) - uuid
## Todo [/signup]
## ユーザー登録 API [POST] 
#### 処理概要
* メールアドレス・ユーザー名・パスワードを登録
+ Parameters
    + email: test@example.com  (string) - 
    + username: username  (string) -
    + password: password  (string) -
+ Response 200 (application/json)
    + Attributes
        + status:OK (string) -;
## Todo [/login]
## ユーザー登録 API [POST] 
#### 処理概要
* メールアドレス・パスワードでログイン
+ Parameters
    + email: test@example.com  (string) - ユーザーID 
    + password: password  (string) -
+ Response 200 (application/json)
    + Attributes
        + isSuccess: true (boolean) -
        + token:eyJhbGciOiJIUzI1NiIs...(string) -;
        + user_id: 1  (number) -