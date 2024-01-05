// middleware/middleware.js

const redirectToAdminIfNotAuthenticated = (req, res, next) => {
  // Check if user is authenticated (you can add your authentication logic here)
  const isAuthenticated = /* Add your authentication logic here */ false;

  if (!isAuthenticated) {
    // Redirect to admin if not authenticated
    res.redirect('/admin');
  } else {
    // Continue to the next middleware or route handler
    next();
  }
};

module.exports = {
  redirectToAdminIfNotAuthenticated,
};
