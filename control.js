// TESTING SI JOANA NI HEHE

const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const mysql = require("mysql");
const control = express();
var md5 = require('md5');
const session = require('express-session');
var nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const upload = multer({ dest: 'public/' });

var connection = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "ezarbooking"
})

connection.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log("Database Connected");
})

control.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

control.engine('hbs', exphbs({ extname: '.hbs' }));

control.set('view engine', 'ejs');
// control.use(express.static("./public"));
control.use('/css', express.static(__dirname + '/public/css'));
control.use('/img', express.static(__dirname + '/public/img'));
control.use('/js', express.static(__dirname + '/public/js'));
control.use('/assets', express.static(__dirname + '/assets'));
control.use(bodyParser.json());
control.use(bodyParser.urlencoded({ extended: true }));
control.use(fileUpload());



control.get("/", (req, res) => {
    res.redirect("/login");
})
control.get("/login", (req, res) => {
    res.render("login");
    // res.send("hello");
})

control.get("/signup", (req, res) => {
    res.render("signup");
})


control.get("/about", (req, res) => {
    res.locals.user = req.session.user;
    res.render("about");
})

control.get("/home", (req, res) => {
    res.locals.user = req.session.user;
    connection.query("SELECT * FROM apartment ", (err, results) => {
        if (err) {
            throw err
        }
        // res.send(results);
        res.render("home", { data: results });

    })
})

control.get("/apartmentProfiles/:id", (req, res) => {
    // res.locals.user = req.session.user;
    res.redirect("/apartmentProfiles?id=" + req.params.id);
    // res.send("hello");
})
control.get("/apartmentProfiles", (req, res) => {
    var id = req.session.user.accUID;
    res.locals.user = req.session.user;
    connection.query("SELECT * FROM apartment WHERE accUID='" + req.session.user.accUID + "'", (err, results) => {
        if (err) {
            throw err
        }
        // res.send(results);
        res.render("ownerApartmentProfiles", { data: results });

    })
})
control.get("/requestList/:id", (req, res) => {
    res.redirect("/requestList?id=" + req.params.id);
})

control.get("/requestList", (req, res) => {


    res.locals.user = req.session.user;
    var datas = new Array();
    connection.query("SELECT * FROM rentrequest WHERE appID='" + req.query.id + "'", (err, results) => {
        if (err) {
            throw err
        }
        // res.send(results);
        connection.query("SELECT * FROM account ", (err, accounts) => {
            if (err) {
                throw err
            }

            for (x = 0, y = 0; x < accounts.length; x++) {
                if (results[y] != null) {
                    if (results[y].tenantUID == accounts[x].accUID) {
                        datas[y] = accounts[x];
                        y++;
                        x = 0;
                    }
                }

            }
            res.render("ownerApartmentRequests", { data: datas })
        })

    })

})
control.get("/requestedRents/:id", (req, res) => {
    res.locals.user = req.session.user;
    res.redirect("/requestedRents?id=" + req.params.id);
})

control.post("/addDiscussion", (req, res) => {
    res.locals.user = req.session.user;
    connection.query('INSERT INTO `forum`(`name`, `type`, `accUID`, `image`, `text`) VALUES ("' + req.body.title + '","' + req.body.type + '","' + req.query.id + '","' + req.files.image.name + '","' + req.body.text + '")', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;

            res.redirect("/profile");
            // res.send("Success");
        }
    })
})



control.get("/forumsDiscussion", (req, res) => {
    res.locals.user = req.session.user;
    var datas = new Array();
    connection.query("SELECT * FROM forum WHERE forumID = '" + req.query.id + "'", (err, results) => {
        if (err) {
            throw err;
        }
        // req.session.user.fname;
        datas[0] = results[0];
        connection.query("SELECT * FROM account   ", (err, accounts) => {
            if (err) {
                throw err;
            }
            datas[0].forumsID = req.query.id;
            datas[0].fname = accounts[0].fname;
            datas[0].lname = accounts[0].lname;
            datas[0].contact = accounts[0].contact;
            datas[0].emailadd = accounts[0].emailadd;
            datas[0].accImage = accounts[0].image;
            // console.log(accounts[x].accUID);
            connection.query("SELECT * FROM forumcomment WHERE forumID = '" + req.query.id + "'", (err, comment) => {
                if (err) {
                    throw err;
                }
                // console.log(comment[comment.length - 1].text);
                connection.query("SELECT * FROM account ", (err, commentAcc) => {
                    if (err) {
                        throw err;
                    }
                    var y = comment.length - 1;
                    var z = 1;

                    for (x = 0; x < commentAcc.length; x++) {
                        if (comment[y] != null) {
                            if (commentAcc[x].accUID == comment[y].accUID) {
                                // datas[z].fname = commentAcc[x].fname;
                                // datas[z].lname = commentAcc[x].lname;
                                // datas[z].text = comment[y].text;

                                datas[z] = comment[y];
                                datas[z].fname = commentAcc[x].fname;
                                datas[z].lname = commentAcc[x].lname;
                                datas[z].contact = commentAcc[x].contact;
                                datas[z].image = commentAcc[x].image;
                                datas[z].email = commentAcc[x].emailAdd;
                                console.log(comment[y].text, datas[z].text, z);
                                // console.log(datas[z].text, comment[y].text, z);
                                z++;
                                x = 0;
                                y--;
                            }
                        }

                    }
                    console.log(datas[1].text, 1);
                    res.render("forumsDiscussions", { data: datas });
                })

            })

        })

    })
})

control.post("/forumsAddcomment/:id", (req, res) => {
    connection.query('INSERT INTO `forumcomment`( `forumID`, `accUID`, `text`) VALUES ("' + req.params.id + '","' + req.session.user.accUID + '","' + req.body.text + '")', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;

            res.redirect("back");
        }
    })

    // res.redirect("/forums/posts?id=" + req.params.id);
})
control.get("/forums/posts/:id", (req, res) => {
    res.redirect("/forums/posts?id=" + req.params.id);
})

control.get("/commentDelete/:id/:text", (req, res) => {

    connection.query("DELETE FROM forumcomment WHERE forumID = '" + req.params.id + "' AND accUID = '" + req.session.user.accUID + "' AND text = '" + req.params.text + "' ", (err, results) => {
        if (err) {
            throw err;
        }
        res.redirect("/forumsDiscussion?id=" + req.params.id);
    })

})

control.get("/forums/findRoommate", (req, res) => {
    res.locals.user = req.session.user;


    var datas = new Array();
    connection.query("SELECT * FROM forum WHERE type = 'findRoommate'", (err, results) => {
        if (err) {
            throw err;
        }
        // req.session.user.fname;
        datas = results;
        connection.query("SELECT * FROM account   ", (err, accounts) => {
                if (err) {
                    throw err;
                }
                var y = results.length - 1;
                for (x = 0; x < accounts.length; x++) {
                    if (results[y] != null) {
                        if (results[y].accUID == accounts[x].accUID) {
                            datas[y].fname = accounts[x].fname;
                            datas[y].lname = accounts[x].lname;
                            datas[y].contact = accounts[x].contact;
                            datas[y].emailadd = accounts[x].emailadd;
                            datas[y].accImage = accounts[x].image;
                            // console.log(accounts[x].accUID);
                            x = 0;
                            y--;
                        }
                    }
                }


                res.render("forums", { data: datas });

                // res.send(datas);

            })
            // res.send(datas);


        // res.redirect("/profile");
        // res.send("Success");

    })
})



control.get("/forums/posts", (req, res) => {
    res.locals.user = req.session.user;


    var datas = new Array();
    connection.query("SELECT * FROM forum WHERE accUID = '" + req.query.id + "'", (err, results) => {
        if (err) {
            throw err;
        }
        // req.session.user.fname;
        datas = results;
        connection.query("SELECT * FROM account   ", (err, accounts) => {
                if (err) {
                    throw err;
                }
                var y = results.length - 1;
                for (x = 0; x < accounts.length; x++) {
                    if (results[y] != null) {
                        if (results[y].accUID == accounts[x].accUID) {
                            datas[y].fname = accounts[x].fname;
                            datas[y].lname = accounts[x].lname;
                            datas[y].contact = accounts[x].contact;
                            datas[y].emailadd = accounts[x].emailadd;
                            datas[y].accImage = accounts[x].image;
                            // console.log(accounts[x].accUID);
                            x = 0;
                            y--;
                        }
                    }
                }


                res.render("forums", { data: datas });

                // res.send(datas);

            })
            // res.send(datas);


        // res.redirect("/profile");
        // res.send("Success");

    })
})


control.get("/map", (req, res) => {
    res.locals.user = req.session.user;
    res.render("map");
})

control.get("/forums", (req, res) => {
    res.locals.user = req.session.user;


    var datas = new Array();
    connection.query("SELECT * FROM forum ", (err, results) => {
        if (err) {
            throw err;
        }
        // req.session.user.fname;
        datas = results;
        connection.query("SELECT * FROM account   ", (err, accounts) => {
                if (err) {
                    throw err;
                }
                var y = results.length - 1;
                for (x = 0; x < accounts.length; x++) {
                    if (results[y] != null) {
                        if (results[y].accUID == accounts[x].accUID) {
                            datas[y].fname = accounts[x].fname;
                            datas[y].lname = accounts[x].lname;
                            datas[y].contact = accounts[x].contact;
                            datas[y].emailadd = accounts[x].emailadd;
                            datas[y].accImage = accounts[x].image;
                            console.log(accounts[x].accUID);
                            x = 0;
                            y--;
                        }
                    }
                }


                res.render("forums", { data: datas });

                // res.send(datas);

            })
            // res.send(datas);


        // res.redirect("/profile");
        // res.send("Success");

    })
})
control.get("/apartmentDetails", (req, res) => {

    res.locals.user = req.session.user;
    connection.query("SELECT * FROM apartment WHERE appID='" + req.query.id + "'", (err, accounts) => {
        if (err) {
            throw err
        }
        // res.send(results);
        connection.query("SELECT * FROM account WHERE accUID='" + accounts[0].accUID + "'", (err, results) => {
            if (err) {
                throw err
            }
            // // res.send(results);
            accounts[0].fname = results[0].fname;
            accounts[0].lname = results[0].lname;
            accounts[0].contact = results[0].contact;
            accounts[0].emailadd = results[0].emailadd;
            accounts[0].accountType = req.session.user.accType;
            accounts[0].checkReq = 0;
            // res.send(accounts[0]);
            connection.query("SELECT * FROM rentrequest WHERE appID='" + req.query.id + "'", (err, requests) => {
                if (err) {
                    throw err
                }
                for (x = 0; x < requests.length; x++) {
                    if (requests[x] != null) {
                        if (requests[x].tenantUID == req.session.user.accUID) {
                            accounts[0].checkReq = 1;
                        }
                    }
                }


                // res.send(accounts[0].checkReq);
                // console.log(accounts[0].checkReq);

                res.render("apartmentDetails", { app: accounts[0] });
            })

            // res.render("apartmentDetails", { app: accounts[0] });
        })


    })
})
control.get("/requestedRents", (req, res) => {
    // var x = 0,
    //     y = 0;
    res.locals.user = req.session.user;
    var datas = new Array();
    var temp;
    connection.query("SELECT * FROM rentrequest WHERE tenantUID='" + req.query.id + "'", (err, accounts) => {
        if (err) {
            throw err
        }
        connection.query("SELECT * FROM apartment", (err, results) => {
                if (err) {
                    throw err
                }

                var z = accounts.length - 1;
                for (x = 0; x < results.length; x++) {
                    if (z >= 0) {
                        if (accounts[z].appID == results[x].appID) {
                            datas[z] = results[x];
                            accounts[z] = 'hello';
                            x = 0;
                            z--;
                            // y++;
                        }
                    }

                }


                res.render("tenantRequestedRents", { data: datas });
                // res.send(results);
            })
            //         // res.send(accounts);

    })
})

control.get("/addApartment", (req, res) => {
    // res.send(req.session.user.accUID);
    res.render("apartmentAdd", { user: req.session.user });
    // res.send("hello");
})


control.get("/about", (req, res) => {
    res.locals.user = req.session.user;
    res.render("about");
    // res.send("hello");
})

control.get("/editApartment/:id", (req, res) => {
    // res.render("apartmentEdit", { app: req.params.id });
    res.redirect("/editApartment?id=" + req.params.id);
    // res.send("hello");
})

control.get("/editApartment", (req, res) => {

    res.locals.user = req.session.user;
    res.render("apartmentEdit", { app: req.query });
    // res.send("hello");
})

control.get("/deleteApartment/:id", (req, res) => {
    connection.query('DELETE FROM apartment WHERE appID="' + req.params.id + '"', (err, results) => {
        if (err) {
            throw err;
        } else {
            res.redirect('back');
        }
    })
})

control.get("/deleteRequest/:id", (req, res) => {
    res.locals.user = req.session.user;
    connection.query('DELETE FROM rentrequest WHERE appID="' + req.params.id + '" AND tenantUID = "' + req.session.user.accUID + '" ', (err, results) => {
        if (err) {
            throw err;
        } else {
            res.redirect('back');
        }
    })
})


control.get("/editProfile", (req, res) => {

    if (req.session.user.accType == 1) {
        res.redirect("/editOwnerprofile=" + req.session.user.fname + "." + req.session.user.lname);
    } else {
        res.redirect("/editTenantprofile=" + req.session.user.fname + "." + req.session.user.lname);
    }

})

control.get("/editOwnerprofile=:username", (req, res) => {

    res.locals.user = req.session.user;
    res.render("ownerProfileEdit");

})

control.get("/editTenantProfile=:username", (req, res) => {

    res.locals.user = req.session.user;
    res.render("ownerProfileEdit");

})

control.get("/edit/:id", (req, res) => {
    res.render("/edit/:id");
})


control.post("/apartmentAdd/:id", (req, res) => {

    connection.query('INSERT INTO `apartment`( `accUID`, `city`, `street`, `baranggay`, `type`, `capacity`, `restriction`, `price`, `description`,`image1`,`image2`,`image3`,`image4`) VALUES ("' + req.params.id + '","' + req.body.city + '","' + req.body.street + '","' + req.body.baranggay + '","' + req.body.type + '","' + req.body.capacity + '","' + req.body.restriction + '","' + req.body.price + '","' + req.body.description + '","' + req.body.image + '","' + req.body.image1 + '","' + req.body.image2 + '","' + req.body.image3 + '")', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;

            res.redirect("/apartmentProfiles?id=" + req.params.id);
        }
    })
})

control.post("/editOwner/:id", (req, res) => {
    let sampleFile
    let uploadPath
    connection.query('UPDATE `account` SET `image`="' + req.files.image.name + '", `fname`="' + req.body.fname + '",`lname`="' + req.body.lname + '",`gender`="' + req.body.gender + '",`contact`="' + req.body.contact + '",`details`="' + req.body.details + '" WHERE accUID="' + req.params.id + '"', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;
            req.session.user.image = req.files.image.name;
            req.session.user.accUID = req.params.id;
            req.session.user.fname = req.body.fname;
            req.session.user.lname = req.body.lname;
            req.session.user.gender = req.body.gender;
            req.session.user.contact = req.body.contact;
            res.locals.user = req.session.user;

            sampleFile = req.files.image;
            uploadPath = __dirname + '/public/img/profileImg' + sampleFile.name;

            sampleFile.mv(uploadPath, function(err) {
                if (err) return res.status(500).send(err);

                console.log(sampleFile);
            })
            res.redirect("/profile");
        }
    })
})


control.post("/apartmentEdit/:id", (req, res) => {
    connection.query('UPDATE `apartment` SET `city`="' + req.body.city + '",`street`="' + req.body.street + '",`baranggay`="' + req.body.baranggay + '",`type`="' + req.body.type + '",`capacity`="' + req.body.capacity + '",`restriction`="' + req.body.restriction + '",`price`="' + req.body.price + '",`description`="' + req.body.decription + '",`image1`="' + req.body.image + '",`image2`="' + req.body.image1 + '",`image3`="' + req.body.image2 + '",`image4`="' + req.body.image3 + '" WHERE appID = "' + req.params.id + '"', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;

            res.redirect("/apartmentProfiles?id=" + req.session.user.accUID);

        }
    })

})

control.get("/profile=:username", (req, res) => {

    res.locals.user = req.session.user;
    res.render("tenantProfile");

})

control.get("/profile", (req, res) => {


    if (req.session.user.accType == 1) {
        res.redirect("/Ownerprofile=" + req.session.user.fname + "." + req.session.user.lname);
    } else {
        res.redirect("/profile=" + req.session.user.fname + "." + req.session.user.lname);
    }

})

control.get("/profile=:username", (req, res) => {

    res.locals.user = req.session.user;
    res.render("tenantProfile");

})

control.get("/Ownerprofile=:username", (req, res) => {

    res.locals.user = req.session.user;
    res.render("ownerProfile");

})

control.get("/requestRent/:id/:id2", (req, res) => {

    connection.query('INSERT INTO `rentrequest`( `tenantUID`, `appID`) VALUES ("' + req.params.id2 + '","' + req.params.id + '")', (err, results) => {
        if (err) {
            throw err;
        } else {
            // req.session.user.fname;

            res.locals.user = req.session.user;
            res.redirect("/profile");
        }
    })

    // res.redirect("/requestRent");
    // res.send(req.params.id2);
})



control.get("/logout", (req, res) => {

    req.session.destroy;
    res.redirect("/login");

    // res.send("hello");
})

control.get("/apartments", (req, res) => {

    res.locals.user = req.session.user;
    // connection.query("SELECT * FROM rentrequest WHERE tenantUID ='" + req.session.user.accUID + "'", (err, accounts) => {
    //     if (err) {
    //         throw err
    //     }
    connection.query("SELECT * FROM apartment WHERE accUID !='" + req.session.user.accUID + "'", (err, results) => {
            if (err) {
                throw err;
            }

            // res.send(results);
            res.render("apartments", { data: results });

        })
        // res.send(results);

    // })

})

control.get("/apartmentDetails/:id", (req, res) => {
    res.locals.user = req.session.user;
    res.redirect("/apartmentDetails?id=" + req.params.id);

})


control.post("/signup", (req, res) => {

    req.body.uuid = generateCode();
    if (req.body.password === req.body.repeatpass) {
        var md5Hash = md5(req.body.password + req.body.email);
        connection.query("INSERT INTO `account`( `accUID`, `fname`, `lname`,`gender`,`contact`,`birthdate`, `emailadd`, `password`,`accType`) VALUES ('" + req.body.uuid + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.gender + "','" + req.body.contact + "','" + req.body.birthdate + "','" + req.body.email + "','" + md5Hash.toString() + "'," + req.body.acctype + ")", (err, results) => {

                if (err) {
                    throw err
                } else {
                    // res.send("Account added");
                    res.render("login");

                }
            })
            // res.send("Sakto ra");
    } else {
        res.send("Password Mismatch");
    }

})

control.post("/login", (req, res) => {
    connection.query('SELECT * FROM account WHERE emailadd="' + req.body.email + '"', (err, results) => {
        var md5Hash = md5(req.body.password + results[0].emailadd);
        // res.send(md5Hash.toString().substring(0, 20) + " " + results[0].password);
        if (err) {
            throw err
        } else {
            if (results[0].password === md5Hash.toString().substring(0, 20)) {
                // req.session.accUID = JSON.stringify(results[0].accUID);
                var string = encodeURIComponent(results[0].accUID);
                req.session.user = results[0];
                res.locals.user = req.session.user;
                // res.render('home');

                res.redirect("/home");
            } else {
                res.send("This account does not exist");
            }

        }

    })
})

control.get("/sample", (req, res) => {
    connection.query('SELECT * FROM sample', (err, results) => {
        if (err) {
            throw err
        }
        res.render("zsample", { data: results[0] });
    })


})

control.post('/upload', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }
    // connection.query('INSERT INTO `sample`(`picture`) VALUES ("' + req.files.avatar.name + '")', (err, results) => {
    //     if (err) {
    //         throw err
    //     }
    //     res.render('zsample', { dataImage: req.files.avatar.name, data: req.body });

    // })
    connection.query('UPDATE `sample` SET `picture`="' + req.files.avatar.name + '" WHERE id = 3', (err, results) => {
        if (err) {
            throw err
        }
        // res.render('zsample', { data.picture: req.files.avatar.name });
        res.redirect("/sample");

    
    })
    sampleFile = req.files.avatar;
    uploadPath = __dirname + '/public/img/profileImg' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);

        console.log(sampleFile);
    })

    // res.send(req.body);
});


generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    for (var i = 0; i < length; i++) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}


control.listen(3000);