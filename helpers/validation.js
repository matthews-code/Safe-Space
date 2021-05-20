const { check } = require('express-validator');

const validation = { 
    signupValidation: function () {

        var validation = [
            check('fName', 'First Name should not be empty.').trim().notEmpty(),
            check('lName', 'Last Name should not be empty.').trim().notEmpty(),
            check('email','Email should not be empty.').trim().notEmpty(),
            check('email', 'Invalid email address').trim().isEmail(),
            check('uName', 'Username should not be empty').trim().notEmpty(),
            check('uName', "Username should contain at least 5 characters.").trim().isLength({min: 5}),
            check('pw', "Password should contain at least 8 characters.").trim().isLength({min: 8})

            // check('username').custom(value => !/\s/.test(value))
            //                 .withMessage('No spaces are allowed in the username');
        ];
            
        return validation;
    },
    loginValidation: function () {
        var validation = [
            check('uName', "Username should contain at least 5 characters.").trim().isLength({min: 5}),
            check('uName', 'Username should not be empty').trim().notEmpty(),
            check('pw', 'Password should be at least 8 characters.').trim().isLength({min: 8})
        ];
        return validation;
    },
    
    createEntryValidation: function() {
        var validation = [
            check('entryTitle', "Entry title should be at most 50 characters.").trim().isLength({max: 50}),
            check('entryBody', "Entry Body should not be empty.").trim().notEmpty()
        ];
    },

    // editEntryValidation: function () {
    //     var validation = [

    //     ]
    // }

    editAccountValidation: function (){
        var validation = [
            check('fName', 'First Name should not be empty').trim().notEmpty(),
            check('lName', 'Last Name should not be empty').trim().notEmpty(),
            check('email','Email should not be empty.').trim().notEmpty(),
            check('email', 'Invalid email address').trim().isEmail(),
            check('pw', "Password should contain at least 8 characters.").trim().isLength({min: 8}),
            check('bio', "Password should contain at least 8 characters.").trim().isLength({max: 150})
        ];
        return validation;
    }
}


module.exports = validation;