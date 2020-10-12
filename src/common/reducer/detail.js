import comment from "../../../server/schemas/comment";
import createReducer from "../createReducer";

export const types = {
  // CARD 클릭 시
  SET_LOADING: "detial/SET_LOADING", // LOADING
  REQUEST_DETAILS: "detail/REQUEST_DETAILS", // saga 트리거
  SET_IDS: "detail/SET_IDS", // 카드 클릭시 params의 contentid, contentidtype 설정
  SET_PLACE: "detail/SET_PLACE", // DETAIL 화면
  SET_ADDITIONAL: "detail/SET_ADDITIONAL", // 소개 API를 이용한 추가데이터

  // 댓글 관련
  SET_LOADING_COMMENTS: "detail/SET_LOADING_COMMENTS",  // 댓글 로딩
  REQUEST_COMMENTS: "detail/REQUEST_COMMENTS",  // 댓글 목록 요청
  SET_COMMENTS: "detail/SET_COMMENTS", // 댓글목록 REDUX저장

  REQUEST_ADD_COMMENT: "detail/REQUEST_ADD_COMMENT",
  ADD_COMMENT: "detail/ADD_COMMENT", // 댓글 작성

  REQUEST_DELETE_COMMENT: "detail/REQUEST_DELETE_COMMENT", // 선택한 댓글 삭제
  DELETE_COMMENT: "detail/DELETE_COMMENT", 

  REQUEST_UPDATE_COMMENT: "detail/REQUEST_UPDATE_COMMENT",  // 댓글 수정
  UPDATE_COMMENT: "detail/UPDATE_COMMENT",

  ADD_LIKE: "detail/ADD_LIKE", // 댓글 좋아요
  CANCLE_LIKE: "detail/CANCLE_LIKE", // 좋아요 취소

  REQUEST_ADD_REPLY: "detail/REQUEST_ADD_REPLY",
  ADD_REPLY: "detail/ADD_REPLY", // 대댓글 작성

  REQUEST_DELETE_REPLY: "detail/REQUEST_DELETE_REPLY",
  DELETE_REPLY: "detail/REMOVE_REPLY", // 대댓글 삭제
  // 에러
  SET_ERROR: "detail/SET_ERROR",
};

export const actions = {
  setLoading: (isLoading) => ({ type: types.SET_LOADING, isLoading }),
  requestDetails: (contentTypeId, contentId) => ({
    type: types.SET_DETAILS,
    contentTypeId,
    contentId,
  }),
  setIds: (ids) => ({ type: types.SET_IDS, ids }),
  setPlace: (place) => ({ type: types.SET_PLACE, place }),
  setAdditional: (additional) => ({ type: types.SET_ADDITIONAL, additional }),
  setLoadingComments: (isLoadingComments) => ({ type: types.SET_LOADING_COMMENTS, isLoadingComments }),
  
  addLike: (contentId, id) => ({ type: types.ADD_LIKE, contentId, id }),
  cancleLike: (contentId, id) => ({ type: types.CANCLE_LIKE, contentId, id }),

  requestComments: (contentId) => ({ type: types.REQUEST_COMMENTS, contentId }),
  setComments: (comments) => ({ type: types.SET_COMMENTS, comments }),

  requestAddComment: (payload) => ({ type: types.REQUEST_ADD_COMMENT, payload }),
  
  addComment: (comment) => ({ type: types.ADD_COMMENT, comment }),
  
  requestUpdateComment: (_id, content, commenter, contentId) => ({type: types.REQUEST_UPDATE_COMMENT, _id, content, commenter, contentId}),

  requestDeleteComment: (_id, commenter, contentId) => ({type: types.REQUEST_DELETE_COMMENT, _id, commenter, contentId}),
  // deleteComment: (_id, commenter) => ({type: types.DELETE_COMMENT, _id, commenter}),


  requestAddReply: (contentId, commentId, reply) => ({type: types.REQUEST_ADD_REPLY, contentId, commentId, reply}),
  // addReply: (commentId, reply) => ({type: types.ADD_REPLY, commentId, reply}),
  requestDeleteReply: (contentId, commentId, _id, commenter) => ({type: types.REQUEST_DELETE_REPLY, contentId, commentId, _id, commenter}),
  // deleteReply: (_id) => ({ type: types.REMOVE_REPLY, id }),
  setError: (error) => ({ type: types.SET_ERROR, error }),
};

const INITIAL_STATE = {
  isLoading: true,
  isLoadingComments: true,
  ids: {
    contentId: "",
    contentTypeId: "",
  },
  place: {
    title: "",
    firstimage: "",
    date: "",
    addr1: "",
    tel: "",
    dist: "",
    readcount: "",
    destination: "",
    overview: "",
    isInProgress: false,
  },
  additional: {
    destination: { lat: "", lng: "" },
    overview: "",
    inProgress: false,
    additional: [],
  },
  comments: [
    {
      reply: [],
    },
  ],
  error: "",
};

const reducer = createReducer(INITIAL_STATE, {
  [types.SET_LOADING]: (state, action) => {
    state.isLoading = action.isLoading;
  },
  [types.SET_IDS]: (state, action) => {
    state.ids = action.ids;
  },
  [types.SET_PLACE]: (state, action) => {
    state.place = action.place;
  },
  [types.SET_ADDITIONAL]: (state, action) => {
    state.additional = action.additional;
  },
  [types.SET_COMMENTS]: (state, action) => {
    state.comments = action.comments;
  },
  [types.ADD_COMMENT]: (state, action) => {
    state.comments.push(action.comment);
  },
  [types.DELETE_COMMENT]: (state, action) => {
    const index = state.comments.findIndex((item) => item._id === action._id);
    state.comments.splice(index, 1);
  },
  [types.ADD_LIKE]: (state, action) => {
    const comment = state.comments.find((item) => item._id === action._id);
    if (comment) state.comments[index].like += 1;
  },
  [types.CANCLE_LIKE]: (state, action) => {
    const comment = state.comments.find((item) => item._id === action._id);
    if (comment) state.comments[index].like -= 1;
  },
  [types.ADD_REPLY]: (state, action) => {
    const comment = state.comments.find((item) => item._id === action.commentId);
    if (comment) comment.reply.push(action.reply);
  },
  [types.REMOVE_REPLY]: (state, action) => {
    const comment = state.comments.find((item) => item._id === action.commentId);
    if (comment) {
      const idx = comment.reply.findIndex(rep => rep._id === action._id);
      if (idx >= 0) {
        reply.splice(idx, 1);
      }
    }
  },
  [types.SET_ERROR]: (state, action) => {
    state.error = action.error;
  },
});

export default reducer;
