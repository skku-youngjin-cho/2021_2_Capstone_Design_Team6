const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const url = "mongodb://dev:3037@localhost:27017/capstone_db"

let db;

MongoClient.connect(url, (error, client) => {
    if (error) return console.log(error, 'hi');

    db = client.db('capstone_db');

    app.listen(8080, () => {
        console.log('connected');
    })
})

app.post('/save', (request, response) => {
    let qr = request.body;
    db.collection('info').findOne({ name: qr.user }, (err, res) => {
        let num = res.count;
        db.collection(qr.user).insertOne({ _id: num + 1, memo: qr.memo },
            (error, result) => {
                console.log('저장완료');
                db.collection('info').updateOne({ name: qr.user }, { $inc: { count: 1 } },
                    (e, r) => {
                        if (e) {
                            return console.log(e);
                        }
                    })
                response.send('저장완료');
            })
    })
});


app.post('/signup', (request, response) => {
    let qr = request.body;
    db.createCollection(qr.name, (e, r) => {
        if (e) {
            msg = { msg: 'duplicatedName' }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            return response.header(headers).send(msg)
        }
        db.collection('info').insertOne({ name: qr.name, count: 0, password: qr.pwd }, (infoE, infoR) => {
            if (infoE) {
                msg = { msg: infoE }
                headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
                return response.header(headers).send(msg)
            }
            msg = { msg: 'signup' }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            response.header(headers).send(msg)
        })
    })
});

app.post('/signin', (request, response) => {
    let qr = request.body;
    db.collection('info').findOne({ name: qr.name }, (e, r) => {
        if (e) {
            msg = { msg: e }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            return response.header(headers).send(msg)
        }
        if (qr.pwd == r.password) {
            msg = { msg: 'signin' }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            response.header(headers).send(msg)
        } else {
            msg = { msg: 'wrongPassword' }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            response.header(headers).send(msg)
        }
    })
});

app.get("/get/:id", (req, res) => {
    db.collection(req.params.id)
        .find()
        .toArray((error, result) => {
            rp = { memoList: result }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            res.header(headers).send(rp)
        });
});

app.get("/userinfo", (req, res) => {
    db.collection('info')
        .find()
        .toArray((error, result) => {
            userList = { userList: result }
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
            res.header(headers).send(userList)
        });
});


app.post('/send', (req, res) => {
    let qr = req.body;
    db.collection(qr.from).findOne({ _id: qr.id }, (e, r) => {
        let smemo = r.memo;
        db.collection('info').findOne({ name: qr.to }, (err, res) => {
            let num = res.count;
            db.collection(qr.to).insertOne({ _id: num + 1, memo: smemo },
                (error, result) => {
                    console.log('전송완료');
                    db.collection('info').updateOne({ name: qr.to }, { $inc: { count: 1 } },
                        (e, r) => {
                            if (e) {
                                return console.log(e);
                            }
                        })
                })
        })
    })

});