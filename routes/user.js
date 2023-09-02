const express = require('express');

const router = express.Router();
const usercontroller = require('../controllers/user');

router.post('/add-user',usercontroller.addUser);
router.get('/get-users',usercontroller.getUsers);
router.put('/update-user/:id',usercontroller.updateUser);
router.delete('/delete-user/:id',usercontroller.deleteUser);

module.exports = router;