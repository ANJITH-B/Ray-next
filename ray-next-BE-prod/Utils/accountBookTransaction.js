const { accountBookTransactionSchema } = require("../Models/accounts/accountBookTransaction")


const accountBookTransaction = async (account_id, date, user_id, description, voucher_type, cr, dr, balance, opening_balance) => {

  // using this args create a data for model with balance calculation( for now keep it empty or 0)

  await accountBookTransactionSchema.create({
    account_id,
    date,
    user_id,
    description,
    voucher_type,
    debit: dr,
    credit: cr,
    balance,
    opening_balance
  })


}

module.exports = accountBookTransaction