const client = require('../client');

const createPayments = async ({cardNum, expDate, cvv, billingAddress, cardName}) => {
    try{
    const {rows: [payment]} = await client.query(`
    INSERT INTO payments(
        cardNum ,
        expDate ,
        cvv ,
        billingAddress , 
        cardName
    )
    
    `, [cardNum, expDate, cvv, billingAddress, cardName])

    
    
    }catch(error){
        throw error
    }
}

module.exports = {createPayments}