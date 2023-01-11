exports.superAdminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "superAdmin") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with role 'superAdmin' are allowed",
        type : "danger" 
      });
  }
  next();
}


exports.adminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "admin" && role == "user") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with role 'admin' are allowed",  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};

exports.adminSuperAdminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "admin" && role !== "superAdmin") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with roles 'admin, superAdmin' are allowed",  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};

exports.userMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "superAdmin" && role !== "admin" && role !== "user") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with roles 'user, admin, superAdmin' are allowed" ,  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};

exports.userAdminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "admin" && role !== "user") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with roles 'user, admin' are allowed" ,  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};

exports.userSuperAdminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const  { role } = req.user;
  if (role !== "superAdmin" && role !== "user") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with roles 'user, superAdmin' are allowed" ,  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};

exports.sharedMiddleware = (req, res, next) => {
  if (!req.user) return res.status(400).json({
    message: "Bad Request",
    type: "danger"
  });
  const { role } = req.user;
  if (role !== "superAdmin" && role !== "user" && role !== "admin") {
    return res
      .status(403)
      .json({ 
        message: "Access denied! Only user with roles 'user, superAdmin' are allowed" ,  
        type : "danger" 
      });
  }
  next();
  // return res.json(req.user.role)
};



