const jwt = require('jsonwebtoken');


const getUser = async (username) => {
  return { userId: '643a2888d275da386059f0ba', password: 'test', username };
};

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (user.password !== password) {
    return res.status(403).json({ error: 'Invalid password' });
  }

  delete user.password;

    const token = jwt.sign(user,process.env.MY_SECRET, { expireIn: '1h' });
    console.log('test before error')
    res.cookie("token", token, {
        httpOnly:true,
    })
    return res.redirect(`/userProfile/${user.userId}`);
};
