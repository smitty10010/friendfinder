var friendsData = require("../data/friends");


module.exports = function(app) {


    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var userDataArray = req.body.scores;
        var compareValue = 200;
        var pickedFriendName;
        var pickedFriendPhoto;
        for (i = 0; i < friendsData.length; i++) {
            var compareArray = friendsData[i].scores;
            var diff = 0;
            for (n = 0; n < userDataArray.length; n++) {
                var numA = userDataArray[n];
                var numB = compareArray[n];
                diff = diff + Math.abs(numA - numB);
            }
            if (diff < compareValue) {
                compareValue = diff;
                pickedFriendName = friendsData[i].name;
                pickedFriendPhoto = friendsData[i].photo;
            }
        }
        friendsData.push(req.body);
        res.send({ status: 'OK', name: pickedFriendName, photo: pickedFriendPhoto });
    });

};