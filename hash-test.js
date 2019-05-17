const bcrypt = require('bcryptjs')
//pw : lllllllllllll
//salt : $2a$10$JFma1Y94/0R6LzQzVbdV2.
//slat  : $2a$10$ydj3Rn.KCkliHI0bJJVkl.
console.log(bcrypt.hashSync('lllllllllllll','$2a$10$ydj3Rn.KCkliHI0bJJVkl.'))
