import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS } from '../constants';
import { Record, OrderedMap } from 'immutable';
import { arrToMap } from './utils';

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
});

const ReducerRecord = Record({
    entities: new OrderedMap({})
});

export default (state = new ReducerRecord(), action) => {

  const { type, payload, response } = action;

  switch (type) {

    case ADD_COMMENT + SUCCESS:
        return state.setIn(
            ['entities', response.id],
            new CommentRecord({...payload.comment, ...response})
        );

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(response, CommentRecord));

    default:
      return state;
  }
}
