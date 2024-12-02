import jwt from "jsonwebtoken";

export const sellerAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized: No token provided " });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decodedToken){
      return res.status(401).json({ message: "user not autherized" });
  }

    if (decodedToken.role!=="salesUser" && decodedToken.role!=="admin" ) {
      return res.status(401).json({ message: "user not autherized" });
    }

    req.sales = decodedToken;

    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};
