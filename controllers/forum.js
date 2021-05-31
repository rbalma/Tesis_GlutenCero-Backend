const Thread = require('../models/thread');
const Post = require('../models/post');


function newThread (req, res) {
    const thread = new Thread();

    const {title, user_id, user_name, user_lastname} = req.body;
    thread.title = title;
    thread.user['id'] = user_id;
    thread.user['name'] = user_name;
    thread.user[2] = user_lastname;

    if(!title){
        res.status(404).send({message:"Todos los campos son obligatorios"});
    } else {
        thread.save((err, threadStored) => {
            if(err){
                console.log(err)
                res.status(404).send({message: "El Hilo ya existe"});
            } else {
                if(!threadStored){
                    res.status(404).send({message: "Error al crear el Hilo"});
                }else{
                    res.status(200).send({message: "El Hilo se creó con éxito"});
                }
            }
        });
    }
}


function getThread(req, res){
    Thread.find().then(threads => {
        if(!threads){
          res.status(404).send({message:"No se ha encontrado ningun hilo"})
        } else {
          res.status(200).send({ threads });
        }
      });
}


function deleteThread(req, res) {
    const { id } = req.params;
  
    Thread.findByIdAndRemove(id, (err, threadDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!threadDeleted) {
          res.status(404).send({ message: "Hilo no encontrado." });
        } else {
            res.status(200).send({
                message: "El hilo ha sido eliminado correctamente."
            });
        }
      }
    });
  }


function newPost(req, res) {
    const post = new Post();

    const { id } = req.params;
    const {content, user_id, user_name, user_lastname, user_avatar} = req.body;
    post.content = content;
    post.user.id = user_id;
    post.user.name = user_name;
    post.user.lastname = user_lastname;
    post.user.avatar = user_avatar;
    post.thread = id;

    if(!content){
        res.status(404).send({message:"Todos los campos son obligatorios"});
    } else {
        post.save((err, postStored) => {
            if(err){
                console.log(err)
                res.status(404).send({message: "El Post ya existe"});
            } else {
                if(!postStored){
                    res.status(404).send({message: "Error al crear el Post"});
                }else{
                    res.status(200).send({message: "El Post se creó con éxito"});
                }
            }
        });
    }
}


function getPosts(){
    const { id } = req.params;

    Post.find({thread: id}).then(posts => {
        if(!posts){
            res.status(404).send({message:"No se ha encontrado ningun post"})
          } else {
            res.status(200).send({ posts });
          }
    });
}


function getLastPost(){
    const { id } = req.params;

    Post.findOne({thread: id},{},{sort: {created:'asc'}}).then(posts => {
        if(!posts){
            res.status(404).send({message:"No se ha encontrado ningun post"})
          } else {
            res.status(200).send({ posts });
          }
    });
}


module.exports = {
    newThread,
    newPost,
    getThread,
    deleteThread,
    getPosts,
    getLastPost
}