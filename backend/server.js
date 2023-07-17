const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const cors = require('cors');
const express = require("express");
const { GridFSBucket } = require('mongodb');
const app = express();
app.use(express.json())
app.use(cors());
const bcrypt = require("bcrypt");
require("dotenv").config()

const connectdb = () => {
    try {
        mongoose.connect("mongodb+srv://admin:admin@atlascluster.bu2ptdd.mongodb.net/dass?retryWrites=true&w=majority", { useNewUrlParser: true })
        console.log("connected");
    }
    catch (err) {
        console.log("failed to connect");
    }
}
connectdb();

const regSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    fname: String,
    lname: String,
    uname: String,
    contact: Number,
    saved_posts: Array,
    followers: Array,
    following: Array
})

const Growth_schema = new mongoose.Schema({
    users: Number,
    date: String,
    subgid: String
})

const Postnumber_schema = new mongoose.Schema({
    posts: Number,
    date: String,
    subgid: String
})

const Visitor_schema = new mongoose.Schema({
    visitors: Array,
    date: String,
    subgid: String
})

const Delete_schema = new mongoose.Schema({
    reported: Number,
    deleted: Number,
    subgid: String,
    date: String
})

const Growth = mongoose.model("Growth", Growth_schema);

const Postnumber = mongoose.model("Postnumber", Postnumber_schema);

const Visitor = mongoose.model("Visitor", Visitor_schema);

const Deletedata = mongoose.model("Deletedata", Delete_schema);

const User = mongoose.model("User", regSchema)

app.post('/register', function (req, res) {
    console.log(req.body)

    var tocr = {
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        age:req.body.age,
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        contact:req.body.contact
    }

    User.create(tocr, function (err, small) {
        if (err) {
            console.log("error");
            res.status(400).send("duplicate email!")
        }
        else {
            console.log("inserted")
            res.status(200).send("Inserted!")
        }
    })
})

app.post('/login', function (req, res) {
    console.log(req.body)


    User.find({ email: req.body.email }, function (err, found) {
        if (err) {
            console.log("error");
        }
        else {
            console.log("found");
            console.log(found);
            if (found.length == 0)
                res.status(400).send("you are not registered yet")
            else {
                // res.status(200).send(found[0]);
                if(bcrypt.compareSync(req.body.password,found[0].password)) {
                    res.status(200).send(found[0]);
                }
                else {
                    res.status(200).send("wrong password");
                }
            }
        }
    })
})

app.post("/update", function (req, res) {
    console.log(req.body)
    User.updateOne({ email: req.body.email },
        {
            fname: req.body.fname,
            uname: req.body.uname,
            contact: req.body.contact
        }, function (err, docs) {
            if (err) {
                console.log("error");
            }
            else {
                console.log(docs);
                res.status(200).send("Updated");
            }
        })
})

const subg_schema = new mongoose.Schema({
    name: String,
    des: String,
    tags: String,
    bk: String,
    people: Array,
    posts: Array,
    moderators: String,
    blocked_ppl: Array,
    once_leaved: Array,
    creation_date: Object
})

const Subg = mongoose.model('Subg', subg_schema);

app.post("/subg", function (req, res) {
    console.log(req.body);
    Subg.create(req.body, function (err, small) {
        if (err) {
            console.log("error");
            res.status(400).send("Error")
        }
        else {
            console.log("inserted")
            res.status(200).send("Inserted!")
        }
    })
})

app.post("/getsubgs", function (req, res) {
    console.log(req.body);
    Subg.find({ moderators: req.body.email }, function (err, result) {
        if (err) {
            console.log("error!!");
        }
        else {
            console.log("got all subgs!");
            res.status(200).send(result);
        }
    })
})

app.post("/getsubgdata", function (req, res) {
    console.log(req.body);
    Subg.find({ _id: req.body.id }, function (err, found) {
        if (err) {
            console.log("error")
        }
        else {
            console.log(found);
            res.status(200).send(found[0]);
        }
    })
})

app.post("/getAllsubgs", function (req, res) {
    Subg.find({}, function (err, found) {
        if (err) {
            console.log("error!");
            res.status(400).send("error");
        }
        else {
            console.log(found);
            res.status(200).send(found);
        }
    })
})

const req_schema = new mongoose.Schema({
    id: String,
    email: String,
    name: String
})

const Request = mongoose.model('Request', req_schema);

app.post('/create_joinreq', function (req, res) {
    console.log(req.body);
    Request.find(req.body, function (err, found) {
        if (err) {
            console.log("error while checking for duplicate requests");
        }
        else {
            if (found.length > 0) {
                console.log("found request");
                res.status(200).send("already requested");
            }
            else {
                Request.create(req.body, function (err, small) {
                    if (err) {
                        console.log("error occured while creating a join request");
                        res.status(400).send("Error")
                    }
                    else {
                        console.log("Successfully created a join request");
                        res.status(200).send("done");
                    }
                })
            }
        }
    })
})

app.post('/getjoinreqests', function (req, res) {
    // console.log(req.body);
    Request.find({ id: req.body.id }, function (err, found) {
        if (err) {
            console.log("error occured while finding all join req");
            res.status(400).send("error");
        }
        else {
            console.log("found all");
            res.status(200).send(found);
        }
    })
})

app.post('/acc_req', function (req, res) {
    console.log(req.body);
    Request.deleteOne({ _id: req.body._id }, function (err) {
        if (err) {
            console.log("error occured while removing request");
        }
        else {
            console.log("successfully removed request");
        }
    })
    Subg.updateOne({ _id: req.body.id },
        {
            $addToSet: { people: req.body.email }
        }, function (err, docs) {
            if (err) {
                console.log("error");
            }
            else {
                console.log(docs);
                res.status(200).send("Updated");
            }
        })
})

app.post("/get_users", function (req, res) {
    console.log("in get_users",req.body);
    Subg.find({ _id: req.body.subgid }, function (err, found) {
        if (err) {
            console.log("error occured while sending users");
        }
        else {
            res.status(200).send(found[0]);
        }
    })
})

app.post("/get_no_users", (req, res) => {
    console.log("In get_no_users", req.body);
    Subg.find({ _id: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("get no users", found);
            res.status(200).send(found[0]);
        }
    })
})



app.post("/get_no_posts", (req, res) => {
    console.log("in get_no_posts", req.body);
    Post.find({ subgid: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/inc_no_posts", (req, res) => {
    Postnumber.find({ date: req.body.date }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            if (found.length === 0) {
                Postnumber.create(req.body, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs);
                        res.send("obj cerated");
                    }
                })
            }
            else {
                Postnumber.updateOne({ date: req.body.date }, {
                    $inc: { posts: 1 }
                }, (err, docs) => {
                    if (err) console.log(err);
                    else {
                        console.log(docs);
                        res.send("obj updated");
                    }
                })
            }
        }
    })
})

app.post("/inc_gro_subg", (req, res) => {
    console.log("request sent is", req.body);
    Growth.find({ date: req.body.date }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            if (found.length === 0) {
                var tocr = {
                    date: req.body.date,
                    users: req.body.users,
                    subgid: req.body.subgid
                }
                Growth.create(tocr, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs);
                    }
                })
            }
            else {
                console.log("in else block");
                Growth.updateOne({ date: req.body.date }, {
                    $inc: { users: 1 }
                }, (err, docs) => {
                    if (err) console.log(err);
                    else console.log(docs);
                })
            }
        }
    })
})

app.post("/dec_gro_subg", (req, res) => {
    console.log("request sent in dec is", req.body);
    Growth.find({ date: req.body.date }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            if (found.length === 0) {
                var tocr = {
                    date: req.body.date,
                    users: req.body.users,
                    subgid: req.body.subgid
                }
                Growth.create(tocr, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(docs);
                        res.status(200).send("done");
                    }
                })
            }
            else {
                console.log("in else block");
                Growth.updateOne({ date: req.body.date }, {
                    $inc: { users: -1 }
                }, (err, docs) => {
                    if (err) console.log(err);
                    else {
                        console.log(docs);
                        res.status(200).send("done");
                    }
                })
            }
        }
    })
})

app.post("/add_visitor", (req, res) => {
    Visitor.find({ date: req.body.date }, (err, fnd) => {
        if (err) {
            console.log(err);
        }
        else {
            if (fnd.length === 0) {
                var tocr = {
                    date: req.body.date,
                    subgid: req.body.subgid,
                    visitors: [req.body.user]
                }
                Visitor.create(tocr, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send("created");
                    }
                })
            }
            else {
                Visitor.updateOne({ date: req.body.date }, {
                    $addToSet: { visitors: req.body.user }
                }, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send("updated")
                    }
                })
            }
        }
    })
})

app.post("/get_growth", (req, res) => {
    console.log(req.body);
    Growth.find({ subgid: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/get_postnumber", (req, res) => {
    Postnumber.find({ subgid: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/get_rep_del", (req, res) => {
    Deletedata.find({ subgid: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/get_vis", (req, res) => {
    Visitor.find({ subgid: req.body.subgid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/add_deletedata", (req, res) => {
    console.log("In deletedata", req.body);
    Deletedata.find({ date: req.body.date }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            var r = req.body.reported;
            var d = req.body.deleted;
            if (found.length === 0) {
                Deletedata.create(req.body, (err2, docs) => {
                    if (err2) {
                        console.log(err2);
                    }
                    else {
                        console.log(docs);
                        res.send("Deletedata inserted");
                    }
                })
            }
            else {
                if (r === 1) {
                    Deletedata.updateOne({ date: req.body.date }, {
                        $inc: { reported: 1 },
                    }, (err2, docs) => {
                        if (err2) console.log(err2);
                        else {
                            console.log(docs);
                            res.send("Deletedata updated");
                        }
                    })
                }
                else {
                    Deletedata.updateOne({ date: req.body.date }, {
                        $inc: { deleted: 1 },
                    }, (err2, docs) => {
                        if (err2) console.log(err2);
                        else {
                            console.log(docs);
                            res.send("Deletedata updated");
                        }
                    })
                }
            }
        }
    })
})

app.post("/rej_req", function (req, res) {
    Request.deleteOne({ _id: req.body._id }, function (err) {
        if (err) {
            console.log("error occured while removing request");
        }
        else {
            console.log("successfully removed request");
        }
    })
})

app.post("/leave_subg", function (req, res) {
    console.log(req.body);
    // res.status(200).send("leaved");
    Subg.updateOne({ _id: req.body.subgid }, {
        $pull: { people: req.body.email },
        $addToSet: { once_leaved: req.body.email }
    }, function (err, docs) {
        if (err) {
            console.log("error");
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("leaved");
        }
    })
})

const post_schema = new mongoose.Schema({
    subgid: String,
    email: String,
    content: String,
    upvotes: Array,
    downvotes: Array,
    comments: Array
})

const Post = mongoose.model("Post", post_schema);

app.post("/create_post", function (req, res) {
    Post.create(req.body, function (err, small) {
        if (err) {
            console.log(err);
        }
        else {
            Subg.updateOne({ _id: req.body.subgid }, {
                $push: { posts: "a" }
            }, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).send("post created")
                }
            })
        }
    })
})

app.post("/get_all_posts", function (req, res) {
    Post.find({ subgid: req.body.subgid }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(found);
        }
    })
})

app.post("/give_like", function (req, res) {
    Post.updateOne({ _id: req.body.post._id }, {
        $addToSet: { upvotes: req.body.email }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("You Successfully gave an upvote");
        }
    })
})

app.post("/give_dislike", function (req, res) {
    Post.updateOne({ _id: req.body.post._id }, {
        $addToSet: { downvotes: req.body.email }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("You Successfully gave a downvote");
        }
    })
})

app.post("/get_all_comm", function (req, res) {
    Post.find({ _id: req.body.post._id }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(found);
            if (found.length > 0)
                res.status(200).send(found[0].comments);
            else
                res.status(200).send([]);
        }
    })
})

app.post("/add_com", function (req, res) {

    var toupdate = {
        cmail: req.body.cmail,
        comment: req.body.comment
    }

    Post.updateOne({ _id: req.body.postid }, {
        $addToSet: { comments: toupdate }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send("Comment Added");
        }
    })
})

app.post("/save_post", (req, res) => {
    console.log(req.body);
    User.find({ email: req.body.email }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            var ok = 1;
            console.log(found[0].saved_posts);
            for (var i = 0; i < found[0].saved_posts.length; i++) {
                if (found[0].saved_posts[i] === req.body.id) {
                    ok = 0;
                    console.log("hi");
                }
            }
            if (ok === 1) {
                User.updateOne({ email: req.body.email }, {
                    $addToSet: { saved_posts: req.body.id }
                }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).send("done");
                    }
                })
            }
            else {
                res.status(200).send("already saved");
            }
        }
    })
})

app.post("/get_saved", (req, res) => {
    User.find({ email: req.body.email }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            if (found.length > 0)
                res.status(200).send(found[0].saved_posts);
            else
                res.status(200).send([]);
        }
    })
})

app.post("/rem_saved", (req, res) => {
    console.log(req.body);
    User.updateOne({ email: req.body.email }, {
        $pull: { saved_posts: req.body.postid }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("Done");
        }
    })
})

app.post("/get_saved_data", (req, res) => {
    console.log(req.body);
    Post.find({ _id: req.body.postid }, (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(found);
            if (found.length > 0)
                res.status(200).send(found[0]);
        }
    })
})

app.post("/add_follower", (req, res) => {
    console.log(req.body);
    User.updateOne({ email: req.body.to_follow }, {
        $addToSet: { followers: req.body.want_to }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            User.updateOne({ email: req.body.want_to }, {
                $addToSet: { following: req.body.to_follow }
            }, function (error, Docs) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(Docs);
                    res.status(200).send("Done");
                }
            })
        }
    })
})

app.post("/get_followers", (req, res) => {
    console.log(req.body);
    User.find({ email: req.body.email }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(found);
            if (found.length > 0) {
                if (found[0].followers !== undefined) {
                    res.status(200).send(found[0].followers);
                }
                else {
                    res.status(200).send([]);
                }
            }
            else {
                res.status(200).send([]);
            }
        }
    })
})

app.post("/get_following", (req, res) => {
    console.log(req.body);
    User.find({ email: req.body.email }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(found);
            if (found.length > 0) {
                if (found[0].following !== undefined) {
                    res.status(200).send(found[0].following);
                }
                else {
                    res.status(200).send([]);
                }
            }
            else {
                res.status(200).send([]);
            }
        }
    })
})

app.post("/remove_follower", (req, res) => {
    User.updateOne({ email: req.body.from }, {
        $pull: { followers: req.body.toremove }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
        }
    })
    User.updateOne({ email: req.body.toremove }, {
        $pull: { following: req.body.from }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("Removed");
        }
    })
})

app.post("/remove_following", (req, res) => {
    User.updateOne({ email: req.body.from }, {
        $pull: { following: req.body.toremove }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
        }
    })
    User.updateOne({ email: req.body.toremove }, {
        $pull: { followers: req.body.from }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs);
            res.status(200).send("Unfollowed");
        }
    })
})

const report_schema = new mongoose.Schema({
    by: String,
    whom: String,
    concern: String,
    content: String,
    postid: String,
    subgid: String,
    isIgnored: Number,
    blocked: Number,
    creation_date: Object
})

const Report = mongoose.model("Report", report_schema);

app.post('/add_report', (req, res) => {
    console.log(req.body);
    Report.create(req.body, (err, small) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(small);
            res.status(200).send("done");
        }
    })
})

app.post('/get_reports', (req, res) => {
    Report.find({ subgid: req.body.subgid }, async (err, found) => {
        if (err) {
            console.log(err);
        }
        else {
            var d = new Date(), len = 3600000;
            var todelete = found.filter(rep => {
                return Date.parse(d) - Date.parse(rep.creation_date) >= len && rep.isIgnored === 0 && rep.blocked === 0;
            })
            console.log(todelete);
            var tosend = found.filter(rep => {
                return Date.parse(d) - Date.parse(rep.creation_date) < len || rep.isIgnored === 1 || rep.blocked === 1;
            })
            for (var i = 0; i < todelete.length; i++) {
                await Report.deleteOne({ _id: todelete[i]._id });
            }
            res.status(200).send(tosend);
        }
    })
})

app.post("/onIgnore", (req, res) => {
    Report.updateOne({ _id: req.body.id }, {
        $set: { isIgnored: 1 }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send("Done");
        }
    })
})

app.post("/delete_post_in_report", (req, res) => {
    console.log(req.body);
    Report.deleteMany({ postid: req.body.postid }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            Post.deleteOne({ _id: req.body.postid }, err2 => {
                if (err2) {
                    console.log(err2);
                }
                else {
                    User.updateMany({}, {
                        $pull: { saved_posts: req.body.postid }
                    }, (err3, docs) => {
                        if (err3) {
                            console.log(err3);
                        }
                        else {
                            console.log("saved post updated");
                        }
                    })
                    Subg.updateOne({_id:req.body.subgid},{
                        $pop:{posts:-1}
                    },(err3,docs)=>{
                        if(err3) {
                            console.log(err3);
                        }
                        else {
                            console.log("post count decreased");
                            console.log(docs);
                        }
                    })
                }
            })
        }
    })
    res.send("Done");
})

app.post("/block_user", (req, res) => {
    Subg.updateOne({ _id: req.body.subgid }, {
        $addToSet: { blocked_ppl: req.body.person },
        $pull : {people:req.body.person}
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            Report.updateOne({ _id: req.body.reportid }, {
                $set: { blocked: 1 }
            }, function (err2, docs2) {
                if (err2) {
                    console.log(err2);
                }
                else {
                    console.log(docs2);
                    res.status(200).send("Done");
                }
            })
        }
    })
})

app.post("/delete_report", (req, res) => {
    Report.deleteOne({ _id: req.body.reportid }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Done");
        }
    })
})

app.post("/remsubg", async (req, res) => {
    console.log(req.body);

    const posts = await Post.find({ subgid: req.body.id });

    Post.deleteMany({ subgid: req.body.id }, err => {
        if (err) console.log(err);
        else console.log("Posts deleted");
    })

    Request.deleteMany({ id: req.body.id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Requests deleted");
        }
    })

    Report.deleteMany({ subgid: req.body.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("All reports removed");
        }
    })

    Subg.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log("error in removing subg")
            res.status(400).send("Not done");
        }
        else {
            console.log("Successfully removed subg");
        }
    })
    res.status(200).send(posts);
})

app.post("/rem_saved_delete_subg", (req, res) => {
    console.log("in this......", req.body);
    for (var i = 0; i < req.body.posts.length; i++) {
        User.updateMany({}, {
            $pull: { saved_posts: req.body.posts[i]._id }
        }, (err, docs) => {
            if (err) console.log(err);
            else console.log(docs);
        })
    }
})

app.listen(7000, function () {
    console.log("Server started on port 7000");
})