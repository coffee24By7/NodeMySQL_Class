const fs = require('fs');

module.exports = {
    addrestaurantpage: (req, res) => {
        res.render('add-restaurant.ejs', {
            title: "Welcome to Establishment Reviewer  | Add a new restaurant"
            ,message: ''
        });
    },
    addrestaurant: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let establishment = req.body.establishment;
        let city = req.body.city;
        let foodtype = req.body.foodtype;
        let seating = req.body.seating;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `restaurant` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-restaurant.ejs', {
                    message,
                    title: "Welcome to Establishment Reviewer | Add a new restaurant"
                });;
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            //return res.status(500).send(err);
                        }
                        // send the restaurant's details to the database
                        let query = "INSERT INTO `restaurant` (establishment, city, foodtype, seating, image, user_name) VALUES ('" +
                            establishment + "', '" + city + "', '" + foodtype + "', '" + seating + "', '" + image_name + "', '" + username + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-restaurant.ejs', {
                        message,
                        title: "Welcome to Establishment Reviewer | Add a new restaurant"
                    });
                }
            }
        });
    },
    editrestaurantpage: (req, res) => {
        let restaurantId = req.params.id;
        let query = "SELECT * FROM `restaurant` WHERE id = '" + restaurantId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-restaurant.ejs', {
                title: "Edit  Restaurant"
                ,restaurant: result[0]
                ,message: ''
            });
        });
    },
    editrestaurant: (req, res) => {
        let restaurantId = req.params.id;
        let establishment = req.body.establishment;
        let city = req.body.city;
        let foodtype = req.body.foodtype;
        let seating = req.body.seating;

        let query = "UPDATE `restaurant` SET `establishment` = '" + establishment + "', `city` = '" + city + "', `foodtype` = '" + foodtype + "', `seating` = '" + seating + "' WHERE `restaurants`.`id` = '" + restaurantId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleterestaurant: (req, res) => {
        let restaurantId = req.params.id;
        let getImageQuery = 'SELECT image from `restaurant` WHERE id = "' + restaurantId + '"';
        let deleteUserQuery = 'DELETE FROM `restaurant` WHERE id = "' + restaurantId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    //return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};