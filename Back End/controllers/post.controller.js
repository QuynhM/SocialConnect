const { sendResponse, AppError, catchAsync } = require('../helpers/utils');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');

const postController = {};

const calculatePostCount = async (userId) => {
    const postCount = await Post.countDocuments({
        author: userId,
        isDeleted: false,
    })
    await User.findByIdAndUpdate(userId, { postCount })
};

postController.getPosts = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const userId = req.params.userId;
    let { page, limit, ...filter } = { ...req.query };

    let user = await User.findById(userId);
    if(!user) throw new AppError (400, "User not found", "Get Posts Error");

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let userFriendIds = await Friend.find({
        $or: [{ from: userId }, { to: userId }],
        status: "accepted",
    })

    if (userFriendIds && userFriendIds.length) {
        userFriendIds = userFriendIds.map((friend) => {
            if (friend.from._id.equals(userId)) return friend.to;
            return friend.from;
        })
    } else {
        userFriendIds = [];
    }
    userFriendIds = [...userFriendIds, userId]

    const filterCondition = [ { isDeleted: false }, { author: { $in: userFriendIds } }];
    const filterCriteria = filterCondition.length 
        ? { $and: filterCondition }
        : {};

    const count = await Post.countDocuments(filterCriteria);
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1);

    let posts = await Post.find(filterCriteria)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author");

    return sendResponse(res, 200, true, { posts, totalPages, count }, null, "Get posts successful")
});

postController.getSinglePost = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const postId = req.params.id;

    let post = await Post.findById(postId);
    if(!post) throw new AppError (400, "Post not found", "Get Single Post Error");

    post = post.toJSON();
    post.comments = await Comment.find({post: post._id}).populate("author");

    return sendResponse(res, 200, true, post, null, "Get single post successful")
});

postController.createPost = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const { content, image } = req.body;

    let post = await Post.create({
        content, 
        image,
        author: currentUserId,
    });
    await calculatePostCount(currentUserId);
    post = await post.populate("author");

    return sendResponse(res, 200, true, post, null, "Create a new post successful")
});

postController.updatePost = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const postId = req.params.id;

    let post = await Post.findById(postId);
    if(!post) throw new AppError (400, "User not found", "Update Post Error");
    if(!post.author.equals(currentUserId)) {
        throw new AppError(400, "Only author can edit post", "Update Post Error");
    };

    const allowToUpdate = [
        "content",
        "image",
    ];

    allowToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
            post[field] = req.body[field];
        }
    });
    await post.save();

    return sendResponse(res, 200, true, post, null, "Update post successful")
});

postController.deleteSinglePost = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const postId = req.params.id;

    const post = await Post.findOneAndUpdate(
        { _id: postId, author: currentUserId },
        { isDeleted: true },
        { new: true },
    );

    if (!post) {
        throw new AppError (400, "Post not found or User not authorized", "Delete Post Error")
    }
    await calculatePostCount(currentUserId);

    return sendResponse(res, 200, true, post, null, "Update post successful")
});

postController.getCommentsOfPost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate post exists
    const post = await Post.findById(postId);
    if (!post) {
        throw new AppError (400, "Post not found", "Get Comments Error")
    };

    // Get comments
    const count = await Comment.countDocuments({ post: postId });
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page-1);

    const comments = await Comment.find({ post: postId })
        .sort({ createdAt : -1 })
        .skip(offset)
        .limit(limit)
        .populate("author");

    return sendResponse(res, 200, true, { comments, totalPages, count }, null, "Get comments successful");
});

module.exports = postController;