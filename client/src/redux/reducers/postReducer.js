import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_POST_FAIL,
  GET_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS_POST,
  ADD_COMMENT_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_SUCCESS_USER_POSTS,
  ADD_LIKE_FAIL,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_SUCCESS_USER_POSTS,
  REMOVE_LIKE_FAIL,
  LOGOUT_SUCCESS,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAIL,
  REMOVE_COMMENT_SUCCESS_USER_POST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAIL,
  GET_USER_POSTS_BYID_SUCCESS,
  GET_USER_POSTS_BYID_FAIL,
} from "./../actions/types";

const intial = {
  post: {},
  posts: [],
  userPosts: null,
  loading: true,
};

const postReducer = (state = intial, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,

        loading: false,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        posts: [],
        loading: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        userPosts: [...state.userPosts, action.payload].reverse(),

        // posts: [...state.posts, action.payload],
        loading: false,
      };
    case REMOVE_COMMENT_FAIL:
    case CREATE_POST_FAIL:
    case GET_POST_FAIL:
      return {
        ...state,
        loading: false,
      };

    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: payload.reverse(),
        loading: false,
      };
    case GET_USER_POSTS_FAIL:
      return {
        ...state,
        userPosts: [],
        loading: false,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,

        post: payload,
        loading: false,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        userPosts:
          state.userPosts &&
          state.userPosts !== null &&
          state.userPosts.map((post) =>
            post._id === payload._id
              ? (post = {
                  ...post,
                  comments: [
                    ...post.comments,
                    payload.comments[payload.comments.length - 1],
                  ],
                })
              : post
          ),

        loading: false,
      };

    case ADD_COMMENT_SUCCESS_POST:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [
            state.post[0].comments.unshift(
              payload.comments[payload.comments.length - 1]
            ),
          ],
        },
        loading: false,
      };

    case REMOVE_COMMENT_SUCCESS_USER_POST:
      return {
        ...state,
        userPosts: state.userPosts.map((po) =>
          po._id === payload.postId
            ? (po = {
                ...po,
                comments: po.comments.filter(
                  (comment) => comment._id !== payload.commentId
                ),
              })
            : po
        ),
      };

    case GET_POSTS_FAIL:
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_POSTS_BYID_FAIL:
    case ADD_LIKE_FAIL:
    case REMOVE_LIKE_FAIL:
    case REMOVE_POST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_POST_SUCCESS:
      return {
        post: [],
        ...state,
        userPosts:
          state.userPosts !== null &&
          state.userPosts.filter((post) => post._id !== payload),
        loading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        post: null,
        posts: null,
        userPosts: null,
        loading: false,
      };

    case ADD_LIKE_SUCCESS:
      return {
        post: {
          ...state.post,
          likes: state.post[0].likes.unshift(payload.likes[0]),
        },

        ...state,
      };
    case ADD_LIKE_SUCCESS_USER_POSTS:
      return {
        ...state,
        userPosts: state.userPosts.map((post) =>
          post._id === payload._id
            ? (post = {
                ...post,
                likes: [...post.likes, payload.likes[payload.likes.length - 1]],
              })
            : post
        ),
        loading: false,
      };

    case REMOVE_LIKE_SUCCESS:
      return {
        post: [...state.post, state.post[0].likes.pop()],

        ...state,
        loading: false,
      };
    case REMOVE_LIKE_SUCCESS_USER_POSTS:
      return {
        ...state,
        userPosts:
          state.userPosts === null
            ? null
            : state.userPosts.map((po) =>
                po._id === payload.postId
                  ? (po = {
                      ...po,
                      likes: po.likes.filter(
                        (like) => like.user !== payload.userId
                      ),
                    })
                  : po
              ),
      };

    case REMOVE_COMMENT_SUCCESS:
      return {
        post: {
          ...state.post,
          comments: state.post[0].comments.pop(),
        },
        ...state,
      };

    // case REMOVE_COMMENT_SUCCESS_USER_POST:
    //   return {
    // userPosts:
    //   state.userPosts !== null
    //     ? state.userPosts.map((post) =>
    //         post._id === payload.postId
    //           ? (post = {
    //               ...post,
    //               comments: post.comments.splice(
    //                 post.comments.findIndex(
    //                   (index) => index._id === payload.commentId
    //                 ),
    //                 1
    //               ),
    //             })
    //           : post
    //       )
    //     : [],
    // post: {
    //   ...state.post,
    //   comments: state.post[0].comments.filter(
    //     (comment) => comment._id !== payload.commentId
    //   ),
    // },

    //   userPosts: state.userPosts.map((post) => {
    //     if (post.id === payload.postId) {
    //       return {
    //         comments: post.comments.filter(
    //           (comment) => comment._id !== payload.commentId
    //         ),
    //       };
    //     }
    //   }),

    //   ...state,

    //   loading: false,
    // };

    case GET_USER_POSTS_BYID_SUCCESS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
