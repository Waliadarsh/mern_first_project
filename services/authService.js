const jwt = require("jsonwebtoken");
require('dotenv').config();

let auth = async (req, res, next) => {
  try {
    // ! If ther is a token it returns a token prefixed with Bearer else returns undefined
    let authToken = req.headers.authorization;
    // console.log(authToken);
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res
        .status(500)
        .json({ error: true, message: "Valid Token Required" });
    }

    // ! Getting token without Bearer
    let token = authToken.split(" ")[1];
    // console.log(token);

    let decodedData = jwt.verify(token, process.env.JWT_KEY);
    // console.log(data);

    let {email, name} = decodedData;
    req.user = {email, name}
    next()
  }
  catch (err) {
    next(err);
  }
};


module.exports = {
    auth
}