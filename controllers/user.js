
const User = require('../models/User')
 
/************   Add user   **********/
exports.addUser = async(req, res) => {
  try {

    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number; 

    const user = await User.create({ name: name, phonenumber: phonenumber, email: email });
    res.status(201).json({ userDetail: user });
  } catch (err) {
    console.log('Validation error:', err.errors);
    res.status(500).json({ error: err });
  }
};

/**************  get all users of database  *************/
exports.getUsers = async(req, res) => {

  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = async(req,res) => {
  try{

    console.log('here --',req.params.id);
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number; 

    const user = await User.findByPk(id); //not working , i dont knoew why later it did
    console.log('found user --',id);

    const User = await user.update({ name: name, phonenumber: phonenumber, email: email});
    console.log(User);
    res.status(201).json({ userDetail: User});
  }
  catch(err){
    res.status(500).json({error: err});
  }
}

/***************     delete the user  ******************/
exports.deleteUser = async(req, res) => {
  
  try {
    const id = req.params.id;
    if (id=='undefined') {
      console.log('ID is missing');
      return res.status(400).json({ err: 'Id is missing' });
    }
    
    const user = await User.findByPk(id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ err: 'User not found' });
    }  
   
    await user.destroy({ where: { id: id }});
 
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

