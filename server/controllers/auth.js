const User = require("../models/user");
exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email, role } = req.user;
  const user = await User.findOneAndUpdate(
    { email: email},
    { name: name || email.split('@')[0], picture, role },
    { new: true },
  ); // second argument is what to update ( new: true) -> send new info to client

  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save(); // saves in database
    res.json(newUser);
  }
};

exports.currentUser = async(req,res) => {
  User.findOne({email: req.user.email}).exec((err, user) => {
    if(err) throw new Error(err)
    res.json(user);
  })
}
