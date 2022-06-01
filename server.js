const express = require ("express"),
app = express(),
jwt =require('jsonwebtoken'),
secret = '1234'

const users = [{
    _id:"12345",
    name:"avi",
    email:'s@a',
    password:"1234"
}]


function login (email,password){
    const user = users.find(u=>u.email===email)
    if(!user)throw 'login faild'
    if(user.password!=password)throw "login faild1"
    const token =createToken(user._id)
    return token
}

function log(){
try {
    const token =login('s@a',"1234")
    const res = authToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NSIsImlhdCI6MTY1NDA4OTQwMCwiZXhwIjoxNjU0MDg5NTIwfQ.uSsv6aWCnKMbtc3_DkD2lacV-8NfXEebEA5h1pqG0dc')
    console.log(res);
} catch (error) {
    console.log(error);
}
}

function createToken(id){
    const token =jwt.sign({_id:id},secret,{expiresIn:"2m"})
    return token
}

function authToken (token){
    const decode =jwt.verify(token,secret),
    id = decode._id,
    user = users.find(u=>u._id===id)
    return user
}

log()


app.listen(3002,()=>console.log('server is running'))