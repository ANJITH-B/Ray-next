const { accountBookTransactionSchema } = require("../Models/accounts/accountBookTransaction")


const accountBookTransaction = async (account_id, date, user_id, description, voucher_type, cr, dr, balance) => {

  // using this args create a data for model with balance calculation( for now keep it empty or 0)

  await accountBookTransactionSchema.create({
    account_id,
    date,
    user_id,
    description,
    voucher_type,
    debit: dr,
    credit: cr,
    balance: balance
  })


}

module.exports = accountBookTransaction