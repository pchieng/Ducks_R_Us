const client = require('../client');

const createPayments = async ({cardNum, expDate, cvv, billingAddress, cardName}) => {
    try{
    const {rows: [payments]} = await client.query(`
    INSERT INTO payments(
        "cardNum" ,
        "expDate" ,
        cvv ,
        "billingAddress" , 
        "cardName"
        )
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [cardNum, expDate, cvv, billingAddress, cardName])
    return payments
    }catch(error){
        throw error
    }
}

module.exports = {createPayments}