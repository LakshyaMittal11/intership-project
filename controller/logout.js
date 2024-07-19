const logout = (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
};
module.exports=logout;