// middleware/middleware.js
const redirectToAdminIfNotAuthenticated = (req, res, next) => {
  const isAuthenticated = /* too lazy to add logic */ false;

  if (!isAuthenticated) {
    res.redirect('/admin');
  } else {
    next();
  }
};

module.exports = {
  redirectToAdminIfNotAuthenticated,
};
