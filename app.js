let express = require('express');
let app = express();

const decodeQuery = (query) => {
    return Buffer.from(query, 'base64').toString();
}
const equationEvaluation = (equation) => {
    try{
    return eval(equation);
    }catch(error){
        throw new Error("equation is wrong")
    }
}
app.get('/calculus', function(req, res){
    const {query} = req.query;
    if(query.length === 0){
        return res.send({ error: true, message: "No string found" });
    }
    try{
        const equation = decodeQuery(query);
        const result  = equationEvaluation(equation)
        return res.send({ error: false, result: result });
    }catch(error){
        return res.send({ error: true, message: "Incorrect equation" });
    }

});

module.exports = app;
