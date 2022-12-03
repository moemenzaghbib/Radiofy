import Post from "../models/post.js";

export async function post_post(req, res) {
    Post.create({ title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        url: req.body.url,
   })
    .then(
       
      res.status(200).json({Response: "created" }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }

  export async function verify_post(req, res) {
    const post = await Post.findOne({title: req.body.title});
    if (post) {
      // check user password with hashed password stored in the database
      //const validPassword = await bcrypt.compare(req.body.password, user.password);
     
      
     // var toknedEmail = emailToken(req.body.email);
       
        res.status(200).json({Response: "Exists"});
      }
   
   else {
    res.status(401).json({ Response: "Doesnt Exist" });
  }
  };
  