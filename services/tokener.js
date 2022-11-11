import jwt from 'jsonwebtoken';

export function emailToken(email) {
    var token = jwt.sign({email_id: email}, "Stack", {
        expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s
 });
 return token
}