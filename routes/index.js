module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `restaurant` ORDER BY id ASC"; // query database to get all the restaurants

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Establishment Reviewer | View Restaurants"
                ,restaurants: result
            });
        });
    },
};
