import {
  DELETE_ARTICLE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE_COMMENTS,
  SUCCESS,
  START,
  LOAD_ARTICLE
} from '../constants';
import { arrToMap } from './utils';
import { Record } from 'immutable';

const ArticleRecord = Record({
  id: null,
  text: null,
  title: null,
  date: null,
  loading: false,
  deleting: false,
  commentsLoading: false,
  commentsLoaded: false,
  commentIsAdding: false,
  comments: []
});

const ReducerRecord = new Record({
    entities: arrToMap([], ArticleRecord),
    loading: false,
    loaded: false,
    error: null
});

export default (state = new ReducerRecord(), action) => {
  const { type, payload, response } = action;

  switch (type) {

    case DELETE_ARTICLE + START:
      return state.setIn(['entities', payload.id, 'deleting'], true);

    case DELETE_ARTICLE + SUCCESS:
        return state.deleteIn(['entities', payload.id]);

    case ADD_COMMENT + START:
        return state.setIn(['entities', payload.articleId, 'commentIsAdding'], true);


    case ADD_COMMENT + SUCCESS: {
      return state
          .setIn(['entities', payload.articleId, 'commentIsAdding'], false)
          .updateIn(
          ['entities', payload.articleId, 'comments'],
          (comments) => comments.concat(response.id)
      );
    }

    case LOAD_ALL_ARTICLES + START:
      return state.set('loading', true);

    case LOAD_ALL_ARTICLES + SUCCESS:
      return state
        .set('entities', arrToMap(response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true);

    case LOAD_ARTICLE + START:
      return state.setIn(['entities', payload.id, 'loading'], true);

    case LOAD_ARTICLE + SUCCESS:
      return state.setIn(['entities', payload.id], new ArticleRecord(response));

    case LOAD_ARTICLE_COMMENTS + START:
        return state.setIn(['entities', payload.articleId, 'commentsLoading'], true);

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
        return state
            .setIn(['entities', payload.articleId, 'commentsLoading'], false)
            .setIn(['entities', payload.articleId, 'commentsLoaded'], true);

    default:
      return state;
  }
}