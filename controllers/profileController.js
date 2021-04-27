const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');


const routerController = {

    signup: function (req, res) {
        // var dPicture = req.body.dPicture;
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var uName = req.body.uName;
        var bio = req.body.bio;
        var pw = req.body.pw;

        var indivUser = {
            // dPicture: dPicture,
            fName: fName,
            lName: lName,
            email: email,
            uName: uName,
            bio: bio,
            pw: pw
        }

        db.insertOne(userCollection, indivUser, function (flag) {
            if(flag) {
                res.redirect('/Login');
            }
        });
       

    },

    getProfile: function(req, res) {
        //query where 
        var query = {uName: req.params.uName};

        var projection = 'fName lName uName bio';
        // var projection = 'dPicture fName lName uName bio';

        db.findOne(userCollection, query, projection, function(result) {
            if(result != null) {
                var details = {
                    //dPicture: result.dPicture
                    fName: result.fName,
                    lName: result.lName,
                    uName: result.uName,
                    //friends: friends
                };
                res.render('profile', details);
            } else {
                res.render('error');
            }
        });

    }
    
};   

module.exports = routerController;