const { update } = require('../models/Post')
const Post = require('../models/Post')

module.exports = {

    async index(req, res) {
        try {
            const posts = await Post.findAll()
            return res.status(200).json(posts)
        } catch (exception) {
            return res.status(500).send(exception.message)
        }
    },

    async select(req, res) {
        try {
            console.debug("GET post by id")
            const { postId } = req.params
            const post = await Post.findOne({ where: { id: postId } })
            if (post) {
                return res.status(200).json({ post })
            }
            return res.status(404).send("Post with the specified ID does not exist")
        } catch (exception) {
            return res.status(500).send(exception.message)
        }
    },

    async store(req, res) {
        const { author, title, subtitle, content } = req.body
        const post = await Post.create(
            {
                author: author,
                title: title,
                subtitle: subtitle,
                content: content
            })

        return res.json(post)
    },

    async update(req, res) {
        try {
            const { postId } = req.params

            const updated = await Post.update(req.body, {
                where: { id: postId }
            })

            if (updated) {
                const updatedPost = await Post.findOne({ where: { id: postId } })
                return res.status(200).json({ post: updatedPost })
            }
            throw new Error("Post not found")

        } catch (exception) {
            return res.status(500).send(exception.message)
        }
    },

    async remove(req, res) {
        console.debug('DELETE method for posts')
        try {
            const { postId } = req.params
            const deleted = await Post.destroy({
                where: { id: postId }
            })
            if (deleted) {
                return res.status(204).send("Post deleted")
            }
            throw new Error("Post not found")

        } catch (exception) {
            return res.status(500).send(error.message)
        }

    }
}