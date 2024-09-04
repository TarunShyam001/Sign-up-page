const { where } = require('sequelize');
const Users = require('../models/users');

exports.postAddUsers = async (req, res) => {
  const {username, email, password} = req.body; 
  console.log('Received Data'+ req.body);
  try {
    const existingUser = await Users.findOne({where : {email}});
    if(existingUser) {
        return res.status(409).json({ message: 'A user with the same email is already exists.' });
    }
    const user = await Users.create({ username, email, password }); 
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.postAddLogin = async (req, res) => {
  const {email, password} = req.body; 
  try {
    const existingUser = await Users.findOne({where : {email}});
    if(existingUser) {
      if(existingUser.password != password) {
        return res.status(401).json({ message: 'Incorrect Password' });
      } else {
        return res.status(201).json({message: 'Login Successfully'});
      }
    } else {
      return res.status(404).json({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};