const { StatusCodes } = require("http-status-codes");


const login = async (_req, res) => {
    //TODO actually implement log in functionality
    res.status(StatusCodes.OK).send("User logged in");
  };


  //TODO USER REGISTRATION, VALIDATION , etc ..


  module.exports= {
    login
  };
  