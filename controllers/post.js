const Post = require('../models/post');

const addPost = async(req, res) => {

    const post = new Post( req.body );

    try {
        post.user = req.user.id;
        post.thread = req.params.id;

        const postDB = await post.save();

        res.json({
            ok: true,
            post: postDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const getPosts = async(req, res) => {
    const idThread = req.params.id;

    const posts = await Post.find({thread: idThread}).populate('user', 'name lastname avatar');
    res.json({
        ok: true,
        posts
    });

}


const getLastPost = async(req, res) => {
    const idThread = req.params.id;
    const posts = await Post.findOne({thread: idThread}).sort({ created: -1 }).populate('user', 'name lastname avatar');
    res.json({
        ok: true,
        posts
    });
}


const getPostById = async(req, res) => {
    const { idPost } = req.params;
    const post = await Post.findById(idPost);
    res.json({
        ok: true,
        post
    });

}


const getPostsByUser = async(req, res) => {
    const { idUser } = req.params;
    const posts = await Post.find({ user: idUser });
    res.json({
        ok: true,
        posts
    });

}


const updatePost = async(req, res) => {
    const postId = req.params.idPost;
    const threadId = req.params.id;

    try {
        const post = await Post.findById( postId );
        if(!post){
           return res.status(404).json({
                ok: false,
                msg: 'Post no existe por ese id'
            });
        }

        // Verifica que solo el usuario que creó el hilo pueda actualizarlo
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este post'
            });
        }

        // En el body de la petición no viene el id del user
        const newPost = {
            ...req.body,
            user: req.user.id,
            thread: threadId
        }

        // new : true es para que me devuelve el post con los datos actualizados
        const updatePost = await Post.findByIdAndUpdate( postId, newPost, { new: true });

        res.json({
            ok: true,
            post: updatePost
        })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const deletePost = async(req, res) => {
    const { idPost } = req.params;
  
    try {
        const post = await Post.findById( idPost );
        if(!post){
           return res.status(404).json({
                ok: false,
                msg: 'Post no existe por ese id'
            });
        }
    // Verifica que solo el usuario que creó el post pueda actualizarlo
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este post'
            });
        }

        await Post.findByIdAndDelete( idPost );
        res.json({ ok: true });

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    addPost,
    getPosts,
    getLastPost,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost
}