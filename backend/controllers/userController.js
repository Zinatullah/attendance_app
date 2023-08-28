const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

////////////////////////////////////////////////   DB connection     ////////////////////////////////////////////////////////
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "zk",
});
////////////////////////////////////////////////    Register user     ////////////////////////////////////////////////////////

// //@desc     Register new user
// //@route    POST/api/users
// //@access   public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, user_type } = req.body;

  if ((!firstName, !lastName || !email || !password)) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const query = `SELECT * FROM \`auth_users\` WHERE \`email\` = '${email}'`;
    connection.query(query, async (err, data) => {
      if (err) {
        res.status(400).json({ message: "User already exist" });
      } else {
        if (data.length > 0) {
          res.status(400).json({ message: "Email already registered" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const token = generateToken(email);

          const query1 = `INSERT INTO \`auth_users\`(\`firstName\`, \`lastName\`, \`email\`, \`password\`, \`user_type\`, \`token\`) VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${user_type}', '${token}')`;

          connection.query(query1);

          res.status(201).json({ message: "User registered successfully" });
        }
      }
    });
  }
});

////////////////////////////////////////////////    Auth user     ////////////////////////////////////////////////////////

// //@desc     Authenticate a user
// //@route    POST/api/users/login
// //@access   public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const query = `SELECT * FROM \`auth_users\` WHERE \`email\` = '${email}'`;

  // Check for user email
  connection.query(query, async (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      if (data.length > 0) {
        const db_firstName = data[0].firstName;
        const db_email = data[0].email;
        const db_user_type = data[0].user_type;
        const db_password = data[0].password;
        const decryptedPassword = await bcrypt.compare(password, db_password);
        if (email === db_email && decryptedPassword) {
          res.json({
            user: db_firstName,
            email: db_email,
            user_type: db_user_type,
          });
        } else {
          res.status(400).json({ message: "Sorry invalid credentials" });
        }

        // res.send("Good");
      } else {
        res.status(404).send({ message: "Invalid credentials" });
      }
    }
  });
});

// //@desc     Get current user data
// //@route    Get/api/users
// //@access   Private
// const getMe = asyncHandler( async (req, res) => {
//     // const {_id, name, email, passowrd} = await User.findById(req.user.id)

//     // res.json({_id,name,email})
//     res.status(200).json(req.user)

// })

const getAllUsers = asyncHandler(async (req, res) => {
  const query = "SELECT * from auth_users";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("Error occured");
    }
    res.status(201).json(result);
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const query = `Delete from auth_users where email = '${email}'`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log("Error occured");
    }
    console.log(result);
    res.status(201).json(result);
  });
});

////////////////////////////////////////////////    updateUser user     ////////////////////////////////////////////////////////

// //@desc     Register new user
// //@route    POST/api/users
// //@access   public
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, user_type } = req.body;

  if ((!firstName, !lastName || !email || !password)) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const query = `UPDATE \`auth_users\` set \`firstName\` = '${firstName}', \`lastName\` = '${lastName}', \`password\` = '${hashedPassword}', \`user_type\` = '${user_type}' , \`token\` = '${token}' where email = '${email}'`;
    connection.query(query, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json({ message: "User updated successfully" });
      }
    });
  }
});
////////////////////////////////////////////////    Update password     ////////////////////////////////////////////////////////

// //@desc     Register new user
// //@route    POST/api/users
// //@access   public
const updatePassword = asyncHandler(async (req, res) => {
  const { email, old_password, new_password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);

  const query = `SELECT * FROM \`auth_users\` WHERE email = '${email}'`;
  connection.query(query, async (error, result) => {
    if (error) {
      res.status(404).json({ message: "User not found" });
    }

    if (result.length > 0) {
      db_password = result[0].password;
      const decryptedPassword = await bcrypt.compare(old_password, db_password);

      if (decryptedPassword) {
        console.log(decryptedPassword);
        const query1 = `UPDATE \`auth_users\` set  \`password\` = '${hashedPassword}' where email = '${email}'`;
        connection.query(query1, (error, result) => {
          if (error) {
            res.status(400).json({ message: "Unknown Error occured" });
          }
          console.log(result);
        });
        res.status(200).json({ message: "User updated successfully" });
      }else{
        res.status(400).json({ message: "Incorrect old password" });

      }

      // if (!decryptedPassword) {
      //   res.status(404).json({ message: "Incorrect old password" });
      // }
    }
  });

});

// Generate JWT
const generateToken = (email) => {
  return jwt.sign({ email }, "1234abcd ", {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updatePassword,
};
