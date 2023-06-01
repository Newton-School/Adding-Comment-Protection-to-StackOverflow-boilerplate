const Blog   = require("../models/blog.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';


const getAllBlog =async (req, res) => {

    const allBlog = await Blog.find({});
    res.status(200).json({
        status: "success",
        data: allBlog
    })
   
}

const createBlog = async (req, res) => {

    const {heading, body, tags, token } = req.body;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const newBlog = {
            heading,
            body,
            tags,
            creator_id : decodedToken.userId
        };
        const blog = await Blog.create(newBlog);
        res.status(200).json({
            message: 'Blog added successfully',
            blog_id: blog._id,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}


const deleteBlog = async (req, res) => {

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Blog doesn't exist"
        })
    }

    try{
        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

const updateBlog = async (req, res) => {

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Blog doesn't exist"
        })
    }

    try{
        await Blog.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully'
        })
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    };

}

const getBlog = async (req, res) => {

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Blog doesn't exist"
        })
    }

    res.status(200).json({
        status: 'success',
        data: blog
    })

}

module.exports = { getAllBlog, getBlog, createBlog, deleteBlog, updateBlog };
