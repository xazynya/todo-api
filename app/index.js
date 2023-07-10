if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors')
const mysql = require('mysql2/promise');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const Validate = require("./validate");
const Encryption = require("./encryption");
const config = require("./config/jwt.config");
const verifyToken = require("./middlewares/verifyToken");
const port = `${process.env.PORT}`;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const con = async() => {
    client = await mysql.createConnection({
        host: `${process.env.MYSQL_HOST}`,
        user: `${process.env.MYSQL_USER}`,
        password: `${process.env.MYSQL_PASSWORD}`,
        database: `${process.env.MYSQL_DATABASE}`,
    });
}

/**
 * sign up
 */
app.post('/signup', async (req, res) => {
    // post sumple
    // $ curl -XPOST http://localhost:3333/api -d '{"user_id":1 , "text":"aaaaaa"}'
    // param:user_id
    // param:title
    let email =req.body.email;
    let username =req.body.username;
    let password = Encryption.encryptionPassword(req.body.password);

    if (!Validate.isEmail) {
        res.status(200).send({status:"NG", comment:"メールアドレスを入力してください"});
    }
    /**
     * mail check 登録済みメールアドレスをチェックする
    */
    let check_user_query = `select 
                                count(*) as count 
                            from account 
                            where mail= ? ;`;

    let check_user_argv = [password, email];

    await con();
    const [rows,fields]  = await client.execute(check_user_query, check_user_argv);

    if (rows[0].count === 0) {

        let query  = `insert into 
                        account(username, mail, password) 
                        value(?,?,?) ;`;

        let argv = [username, email, password];

        await con();
        try {

            await client.beginTransaction();
            await client.execute(query, argv);
            await client.commit();
            res.status(200).send({status:"OK", comment: "Add User"});

        } catch (error) {

            await client.rollback();
            throw error;

        } finally {

            client.end();
        }
        
    } else {
        console.log("already use email and username")
        res.status(200).send({status:"NG", comment:"allready use email"});
    }

});

/**
 * Login
 */
app.post('/login', async (req, res) => {
    let email =req.body.email;

    let password = Encryption.encryptionPassword(req.body.password);

    /**
     * 該当ユーザーのチェック
    */
    let check_user_query = `select
                                user_id 
                            from account 
                            where 
                                mail= ? and password= ? ;`;
    let check_user_argv = [email, password];
    await con();
    const [rows, fields] = await client.execute(check_user_query, check_user_argv);
    if(rows.length === 0){
        res.json({
            isSuccess: false,
            message: "ユーザーIDまたはパスワードが違います。",
          });
    } else {
        console.log(rows.length);
        let user_id = rows[0].user_id;
        const payload = {
            userId: user_id,
          };
        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
        res.json({
            isSuccess: true,
            user_id: user_id,
            token: token,
          });
    }
});


/**
 * View branching on request
 */
app.get('/api',verifyToken , async (req, res) => {

    // param:user_id
    // user id を持ったデータ取得
    if (req.decoded.userId != req.query.user_id) {
        res.status(400).send({"status":"NG","message":"エラー"});
    }
    var user_id = req.decoded.userId;
    var search_val;
    try {
        search_val = req.query.searchtext;
    } catch(e) {
        search_val = false;
    }

    //バリデーション
    if (Validate.isNum(user_id)) {
        await con();
        let add_query = "" ;
        
        if (search_val) {
            add_query = `and
                            MATCH( title ,content )
                            AGAINST('${search_val}')`;
        }

        let query = `select * 
                        from todo
                    where user_id =${user_id}
                    ${add_query};`;

        const [row, fields] =  await client.execute(query)
        res.send(row)

    } else {
        res.status(400).send({"status":"NG","message":"エラー"});
    }

});

/**
 * View branching on request
 */
app.get('/api/user',verifyToken ,async (req, res) => {

    // param:user_id
    // user id を持ったデータ取得
    if (req.decoded.userId != req.query.user_id) {
        res.status(400).send({"status":"NG","message":"エラー"});
    }
    var user_id = req.decoded.userId;
    //バリデーション
    if (Validate.isNum(user_id)) {
        await con();
        let query = `select 
                        user_id 
                        ,username 
                        ,mail 
                    from account
                    where user_id = ?`;
                    
        let argv = [user_id]; 
        const [row, fields] =  await client.execute(query, argv)
        res.send(row)

    } else {
        res.status(400).send({"status":"NG","message":"エラー"});
    }

});


app.post('/api',verifyToken, async(req, res) => {

    let title =req.body.title;
    let content =req.body.content;
    let completed = false;
    let user_id = req.body.user_id;
    if (!Validate.isNum(user_id)) {
        res.status(400).send({"status":"NG","message":"エラー"});
    }
    let uuid = crypto.randomUUID();

    let query  =   `insert into \
                    todo(
                        title
                        ,content
                        ,completed
                        ,user_id
                        ,uuid)
                    value(?,?,?,?,?) ;`;

    let argv = [title, content, completed, user_id, uuid];

    await con();
    try {

        await client.beginTransaction();
        await client.execute(query, argv);
        await client.commit();
        res.status(200).send({uuid, title, content})

    } catch (error) {

        await client.rollback();
        throw error;

    } finally {

        client.end();
    }

    
});

//Delete Todo
app.delete('/api/:uuid', verifyToken, async(req, res) => {

    if (!req.decoded.userId) {
        res.status(400).send({"status":"NG","message":"エラー"});
    }

    let {uuid} = req.params;
    let argv = [uuid];
    let query  = `delete from todo where uuid = ? ;`;

    await con();
    try {

        await client.beginTransaction();
        await client.execute(query, argv);
        await client.commit();
        res.status(200).send(uuid);

    } catch (error) {

        await client.rollback();
        throw error;

    } finally {

        client.end();
    }

    
});


app.put('/api/:uuid', verifyToken, async(req, res) => {

    if (!req.decoded.userId) {
        res.status(400).send({"status":"NG","message":"エラー"});
    }

    const {uuid} = req.params;
    let argv , query;


    if (req.body["completed"] !== undefined ) {

        argv = [(req.body.completed === 'true' ) ?  1 : 0, uuid];
        query  = `update todo 
                    set completed= ? 
                    where uuid= ? ;`;

    } else if (req.body["title"] !== undefined) {

        let reqTitle = req.body.title;
        let reqContent = req.body.content;

        argv = [reqTitle, reqContent, uuid];
        query  = `update todo 
                    set title= ?
                        ,content= ?
                    where uuid= ? ;`;
    }

    await con();
    try {

        await client.beginTransaction();
        await client.execute(query, argv);
        await client.commit();
        res.status(200).send(uuid);

    } catch (error) {

        await client.rollback();
        throw error;

    } finally {

        client.end();
    }

    
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));