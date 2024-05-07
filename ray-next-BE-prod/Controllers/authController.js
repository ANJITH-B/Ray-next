const { userSchema } = require("../Models/userModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");
const transporter = require("../Services/nodeMailer");
const otpGenerator = require("otp-generator");
const { otpSchema } = require("../Models/otpModel");
const { agentSchema } = require("../Models/agentModel");
const { v4 } = require("uuid");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { controlAccountSchema } = require("../Models/accounts/chartControlAccountModel");
const { regularAccountSchema } = require("../Models/accounts/chartRegularAccountModel");


// sign up
module.exports.signup = async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    phone,
    company,
    profession,
    region,
    state,
    agentID,
  } = req.body;
  try {
    const agentExists = await agentSchema.findOne({
      agentID,
    });

    if (!agentExists) {
      return errorResponse(res, 404, "Agent with this id doesnt exist");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      name,
      username,
      password: encryptedPassword,
      email,
      phone,
      company,
      profession,
      region,
      state,
      // verified: true,
      // secret_code: v4(),
      agentID,
    });

    const OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const mailOptions = {
      from: "aju4613@gmail.com",
      to: newUser.email,
      subject: "Verification Code RayNext",
      text: `your otp is ${OTP}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log("Error:", error);
        res.status(500).send("Error sending email.");
      } else {
        console.log("Email sent:", info.response);
        // res.send('Email sent successfully.');
        await otpSchema.create({
          email: newUser.email,
          otp: OTP,
        });
        // console.log(userSchema.getIndexes())
        return successResponse(res, 201, "user created succesfully", newUser);
      }
    });

    //  return successResponse(res,201,"user created succesfully",newUser)
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (E11000) - Handle it here
      return errorResponse(
        res,
        403,
        "username or email or phone number already exists"
      );
    } else {
      // Other errors - Handle them here
      return errorResponse(res, 403, error.message);
    }
  }
};

module.exports.addAgent = async (req, res) => {
  const { name, email } = req.body;
  const randomID = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(randomID);
  try {
    const newAgent = await agentSchema.create({
      name,
      email,
      agentID: randomID,
    });

    return successResponse(res, 201, "agent added succesfully", newAgent);
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

module.exports.verifySignup = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const otpExists = await otpSchema.findOne({
      email,
    });

    if (!otpExists) {
      return errorResponse(res, 404, "OTP isnt available");
    }

    if (otpExists.otp != otp) {
      return errorResponse(res, 403, "Invalid OTP");
    }

    await otpSchema.deleteMany({
      email,
    });
    const secret_code = v4();

    const mailOptions = {
      from: "aju4613@gmail.com",
      to: otpExists.email,
      subject: "Secret Code - RayNext",
      text: `your secret code is ${secret_code}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log("Error:", error);
        res.status(500).send("Error sending email.");
      } else {
        console.log("Email sent:", info.response);
        // res.send('Email sent successfully.');

        let userr = await userSchema.updateOne(
          {
            email,
          },
          { secret_code, verified: true }
        );

        userr = await userSchema.findOne({ email })
        // add cash,credit,sales,purchase regular accounts

        // control account creation
        const control = [
          {
            account_name: "Revenue from Operation",

            nature_of_account: "INCOME",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Income from other sources",

            nature_of_account: "INCOME",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Cost of Operation",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Direct Expenses",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Indirect Expenses",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Depreciation",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Tax",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Finance cost",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Management cost",

            nature_of_account: "EXPENSE",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Current Asset",

            nature_of_account: "ASSET",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Fixed Asset",

            nature_of_account: "ASSET",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Current Liability",

            nature_of_account: "LIABILITY",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Non-Current Liability",

            nature_of_account: "LIABILITY",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Share holders Current Account",

            nature_of_account: "EQUITY",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Share Capital",

            nature_of_account: "EQUITY",

            user_id: userr._id,
            _id: "",
          },
          {
            account_name: "Drawings",

            nature_of_account: "EQUITY",

            user_id: userr._id,
            _id: "",
          },
        ];

        for (let i = 0; i < control.length; i++) {
          const newControlAccount = await controlAccountSchema.create({
            account_name: control[i].account_name,
            nature_of_account: control[i].nature_of_account,
            user_id: control[i].user_id,
          });

          control[i]._id = newControlAccount._id;
        }
        // const control = [
        //   {
        //     account_name: "Revenue from Operation",

        //     nature_of_account: "ASSET",

        //     user_id: userr._id,
        //     _id: "",
        //   },
        //   {
        //     account_name: "Cost of Operation",

        //     nature_of_account: "EXPENSE",

        //     user_id: userr._id,
        //     _id: "",
        //   },
        //   {
        //     account_name: "Current Asset",

        //     nature_of_account: "ASSET",

        //     user_id: userr._id,
        //     _id: "",
        //   },
        // ];

        // for (let i = 0; i < control.length; i++) {
        //   const newControlAccount = await controlAccountSchema.create({
        //     account_name: control[i].account_name,
        //     nature_of_account: control[i].nature_of_account,
        //     user_id: control[i].user_id,
        //   });

        //   control[i]._id = newControlAccount._id;
        // }

        console.log(control)

        // regular account creation

        const regulars = [
          {
            account_name: "Online Sales",
            user_id: userr._id,
            parent_account_id: control[0]._id,
          },
          {
            account_name: "Talabat",
            user_id: userr._id,
            parent_account_id: control[0]._id,
          },
          {
            account_name: "Delivery",
            user_id: userr._id,
            parent_account_id: control[0]._id,
          },
          {
            account_name: "Retail Sale",
            user_id: userr._id,
            parent_account_id: control[0]._id,
          },
        ];

        for (let j = 0; j < regulars.length; j++) {
          const newRegularAccount = await regularAccountSchema.create({
            account_name: regulars[j].account_name,
            user_id: regulars[j].user_id,
            parent_account_id: regulars[j].parent_account_id,
            opening_balance: 0,
            current_balance: 0,
          });
        }
        await regularAccountSchema.create({
          account_name: "Difference in Openning Balance",
          user_id: userr._id,
          parent_account_id: control[9]._id,
        })
        // const regulars = [
        //   {
        //     account_name: "Customer cash",
        //     user_id: userr._id,
        //     parent_account_id: control[1]._id,
        //     opening_balance: 0,
        //     opening_balance_type: "CR",
        //   },
        //   {
        //     account_name: "Credit",
        //     user_id: userr._id,
        //     parent_account_id: control[0]._id,
        //     opening_balance: 0,
        //     opening_balance_type: "DR",
        //   },
        //   {
        //     account_name: "Cash account",
        //     user_id: userr._id,
        //     parent_account_id: control[0]._id,
        //     opening_balance: 0,
        //     opening_balance_type: "DR",
        //   },
        //   {
        //     account_name: "Sales account",
        //     user_id: userr._id,
        //     parent_account_id: control[0]._id,
        //     opening_balance: 0,
        //     opening_balance_type: "DR",
        //   },
        //   {
        //     account_name: "Purchase account",
        //     user_id: userr._id,
        //     parent_account_id: control[1]._id,
        //     opening_balance: 0,
        //     opening_balance_type: "CR",
        //   },
        // ];

        // for (let j = 0; j < regulars.length; j++) {
        //   const newRegularAccount = await regularAccountSchema.create({
        //     account_name: regulars[j].account_name,
        //     user_id: regulars[j].user_id,
        //     parent_account_id: regulars[j].parent_account_id,
        //     opening_balance: 0,
        //     opening_balance_type: regulars[j].opening_balance_type,
        //     current_balance: 0,
        //   });
        // }
        // await regularAccountSchema.create({
        //   account_name: "Difference in Openning Balance",
        //   user_id: userr._id,
        //   parent_account_id: control[2]._id,
        // })

        return successResponse(res, 201, "user verified succesfully", userr);
      }
    });
  } catch (error) {
    return errorResponse(res, 403, error.message);
  }
};

module.exports.verifySerialNumber = async (req, res) => {
  const { serial_number, email } = req.body;
  try {
    const userExists = await userSchema
      .findOne({
        email,
      })
      .select("-password");

    console.log(userExists._id);

    if (!userExists) {
      return errorResponse(res, 404, "user doesnt exist");
    }

    if (serial_number !== userExists.secret_code) {
      return errorResponse(res, 404, "Invalid serial number");
    }

    const accessToken = jwt.sign(
      { _id: userExists._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      { _id: userExists._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
      }
    );

    console.log({ accessToken, refreshToken });

    return successResponse(res, 200, {
      message: "successful",
      token: {
        accessToken,
        refreshToken,
      },
      current_user: userExists,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get current user details

module.exports.getCurrentUser = async (req, res) => {
  const _id = req.decoded._id;
  try {
    const currentUser = await userSchema.findOne({ _id });
    if (!currentUser) {
      return errorResponse(res, 500, "user doesnt exist");
    }

    return successResponse(res, 200, "success", currentUser);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports.signin = async (req, res) => {
  const { usernameORemailORPhone, secret_code, password } = req.body;
  try {
    const pipeline = [
      {
        $match: {
          $or: [
            { username: usernameORemailORPhone },
            { email: usernameORemailORPhone },
            { phone: usernameORemailORPhone },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          phone: 1,
          secret_code: 1,
          company: 1,
          region: 1,
          password: 1,
          state: 1,
        },
      },
    ];

    const userExist = await userSchema
      .aggregate(pipeline)
      .exec()
      .then((users) => {
        if (users.length === 0) {
          // User not found
          console.log("User not found");
          return errorResponse(res, 404, "user not found");
        } else {
          // User found, verify the password
          const user = users[0];

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.error("Password comparison error:", err);
              return errorResponse(res, 500, err.message);
              // Handle error
            } else if (result) {
              // Password is correct
              if (secret_code == user.secret_code) {
                const accessToken = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_ACCESS_SECRET,
                  {
                    expiresIn: process.env.JWT_ACCESS_EXPIRY,
                  }
                );

                const refreshToken = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_REFRESH_SECRET,
                  {
                    expiresIn: process.env.JWT_REFRESH_EXPIRY,
                  }
                );
                delete user.password;
                return successResponse(res, 200, "login succesful", {
                  token: { accessToken, refreshToken },
                  current_user: user,
                });
              } else {
                return errorResponse(res, 401, "invalid secret code");
              }

              // Proceed with authentication
            } else {
              // Password is incorrect
              console.log(result);
              console.log("Incorrect password");
              return errorResponse(res, 401, "incorrect password");
              // Handle incorrect password
            }
          });
        }
      });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
