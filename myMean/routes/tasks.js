var express = require('express');
var router = express.Router();

/*
 * GET tasklist.
 */
router.get('/getTasks', function(req, res) {
    var db = req.db;
    var collection = db.get('tasklist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addTask.
 */
router.post('/addTask', function(req, res) {
    var db = req.db;
    var collection = db.get('tasklist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: err }
        );
    });
});

/*
 * POST to editTask.
 */
router.post('/editTask', function(req, res) {
    var db = req.db;
    var collection = db.get('tasklist');
    collection.update({_id:req.body.id},{title:req.body.title,notes:req.body.notes,deadline:req.body.deadline}, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteTask.
 */
router.delete('/deleteTask/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('tasklist');
    var idToDelete = req.params.id;
    collection.remove({ '_id' : idToDelete }, function(err) {
        res.send((err === null) ? { msg: 'success' } : { msg:'error: ' + err });
    });
});

module.exports = router;
