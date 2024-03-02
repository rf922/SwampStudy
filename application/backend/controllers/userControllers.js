const { StatusCodes } = require("http-status-codes");


const login = async (_req, res) => {
    //TODO actually implement log in functionality
//    res.status(StatusCodes.OK).send("User logged in");
    const { username, password } = _req.body;
    res.status(StatusCodes.OK).send("User logged in : "+username +" with key : "+password);

  };

    //TODO , VALIDATION , etc ..

  const register = async (_req, res) => {
    const { username, password } = _req.body;
    res.status(StatusCodes.OK).send("Registerting user . . .");

  };




  module.exports= {
    login,
    register
  };
  