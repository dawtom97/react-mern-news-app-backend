import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "news");
    if (decodedToken.id === process.env.ADMIN_ID) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export default authAdmin;
