const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const profileController = {

    signup: function (req, res) {
        // console.log("im in");
        var dPicture;
        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var uName = req.body.uName;
        var bio = req.body.bio;
        var pw = req.body.pw;

        // console.log(dPicture);
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            var indivUser = {
                dPicture: dPicture,
                fName: fName,
                lName: lName,
                email: email,
                uName: uName,
                bio: bio,
                pw: hash
            }
    
            db.insertOne(userCollection, indivUser, function (flag) {
                if(flag) {
                    res.redirect('/login');
                }
                else { 
                    res.status(500);
                    res.render('error', {
                        title: '500  Internal Server Error',
                        css:['global', 'error'],
                        status: {
                            code: "500",
                            message: "Something unexpected happened."
                        }  
                    });   
                }
                    
            });
        });
        

    },

    getProfile: function(req, res) {
        var query = {uName: req.params.uName};
        //var projection = 'dPicture fName lName uName bio friendsList';
        db.findOne(userCollection, query, '', function(result) {
            db.findOnePopulate(userCollection, query, '', {path: 'friendsList.friendId', model: 'User'}, function(populateResult) {
                if(populateResult) {

                    //console.log(populateResult.friendsList);
    
                    res.render('profile', {
                        title: 'SafeSpace',
                        css: ['global', 'personalprofile'],
                        JSbool: false,
                        details: result,
                        friends: populateResult.friendsList,
                        sessionUser: req.session.uName
                    });
    
                } else {
                    res.status(400);
                    res.render('error', {
                        title: '400 Bad Request',
                        css:['global', 'error'],
                        status: {
                            code: "400",
                            message: "Bad request"
                        }
                    });
                }
            });    
        });
    },
    
    checksignup: function (req, res) {
        var uName = req.query.uName;
        // console.log("test");
        db.findOne(userCollection, {uName: uName}, '', function (result) {
            res.send(result);
        });
    },

    checklogin: function (req, res) {
        var uName = req.query.uName;
        var pw = req.query.pw;

        db.findOne(userCollection, {uName: uName}, 'pw', function (result) {
            if(result === null)
                res.send(false);
            else {
                bcrypt.compare(pw, result.pw, function(err, equal) {
                    if(equal) {
                        res.send(true);
                    }  
                    else {
                        res.send(false);
                    }
                });  
            }     
        });
    },

    login: function(req, res){
        var uName = req.body.uName;
        var pw = req.body.pw;

        db.findOne(userCollection, {uName: uName}, '', function (result) {

           // Bookmark
           req.session.uName = result.uName;
           console.log(result.uName);
           req.session.pw = result.pw;
           res.redirect('/mainpage');
        });
        
    },

    getLogout: function(req,res){
        
        req.session.destroy(function(error){
            if(error){
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    } 
                    
                });
                throw error;
            }
            else
                res.redirect('/login');
        })
    },

    editAccount: function (req, res) {
        
        var dPicture;
        var uName = req.session.uName;
        var pw = req.body.pw; // the password changed

        console.log("password in session at editAccount: " + pw);
        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            var indivUser = {
                dPicture: dPicture,
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                bio: req.body.bio,
                pw: hash,
            }
            console.log("changed current password: " + hash);
            
            db.updateOne(userCollection, {uName: uName}, indivUser, function(update){
                console.log("update: " + update);
                if(update != null){
                    res.redirect('/settings');
                }
            });
        });
        
    },

    deleteaccount: function(req,res){

        var uName = req.session.uName;

        db.deleteOne(userCollection, {uName: uName},function(deleted) {
            console.log(deleted);
            req.session.destroy(function(error){
                if(error){
                    throw error;
                }
                else
                    res.redirect('/login');
            })
        })
    }
};   

module.exports = profileController;