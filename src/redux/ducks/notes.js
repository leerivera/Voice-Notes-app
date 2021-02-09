import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

import { API_BASE } from '../../config'

const NOTE_FETCH_PENDING = 'NOTE_FETCH_PENDING'
const NOTE_FETCH_SUCCESS = 'NOTE_FETCH_SUCCESS'
const NOTE_FETCH_ERROR = 'NOTE_FETCH_ERROR'

const NOTE_ADD_PENDING = 'NOTE_ADD_PENDING'
const NOTE_ADD_SUCCESS = 'NOTE_ADD_SUCCESS'
const NOTE_ADD_ERROR = 'NOTE_ADD_ERROR'

const NOTE_REMOVE_PENDING = 'NOTE_REMOVE_PENDING'
const NOTE_REMOVE_SUCCESS = 'NOTE_REMOVE_SUCCESS'
const NOTE_REMOVE_ERROR = 'NOTE_REMOVE_ERROR'

const NOTE_DETAIL_PENDING = 'NOTE_DETAIL_PENDING'
const NOTE_DETAIL_SUCCESS = 'NOTE_DETAIL_SUCCESS'
const NOTE_DETAIL_ERROR = 'NOTE_DETAIL_ERROR'

const NOTE_UPDATE_PENDING = 'NOTE_UPDATE_PENDING'
const NOTE_UPDATE_SUCCESS = 'NOTE_UPDATE_SUCCESS'
const NOTE_UPDATE_ERROR = 'NOTE_UPDATE_ERROR'

const noteUpdatePending = createAction(NOTE_UPDATE_PENDING)
const noteUpdateError = createAction(NOTE_UPDATE_ERROR)
const noteUpdateSuccess = createAction(NOTE_UPDATE_SUCCESS)

const noteRemovePending = createAction(NOTE_REMOVE_PENDING)
const noteRemoveError = createAction(NOTE_REMOVE_ERROR)
const noteRemoveSuccess = createAction(NOTE_REMOVE_SUCCESS)

const noteFetchPending = createAction(NOTE_FETCH_PENDING)
const noteFetchError = createAction(NOTE_FETCH_ERROR)
const noteFetchSuccess = createAction(NOTE_FETCH_SUCCESS)

const noteAddPending = createAction(NOTE_ADD_PENDING)
const noteAddError = createAction(NOTE_ADD_ERROR)
const noteAddSuccess = createAction(NOTE_ADD_SUCCESS)

const noteDetailPending = createAction(NOTE_DETAIL_PENDING)
const noteDetailError = createAction(NOTE_DETAIL_ERROR)
const noteDetailSuccess = createAction(NOTE_DETAIL_SUCCESS)

export const removeNote = (noteId) => {
  return async (dispatch) => {
    dispatch(noteRemovePending())

    try {
      const res = await axios.delete(API_BASE + '/notes/' + noteId)
      dispatch(noteRemoveSuccess(res.data))
      dispatch(fetchNotes())
      return Promise.resolve(res.data)
    } catch (err) {
      dispatch(noteRemoveError(err))
      return Promise.reject(err)
    }
  }
}

export const addNote = (note) => {
  return async (dispatch) => {
    dispatch(noteAddPending())

    try {
      const res = await axios.post(API_BASE + '/notes', note)
      dispatch(noteAddSuccess(res.data))

      return Promise.resolve(res.data)
    } catch (err) {
      dispatch(noteAddError(err))
      return Promise.reject(err)
    }
  }
}

export const updateNote = (note) => {
  return async (dispatch) => {
    dispatch(noteUpdatePending())

    try {
      const res = await axios.put(API_BASE + '/notes/' + note.id, note)
      dispatch(noteUpdateSuccess(res.data))

      return Promise.resolve(res.data)
    } catch (err) {
      dispatch(noteUpdateError(err))
      return Promise.reject(err)
    }
  }
}

export const fetchNotes = () => {
  return async (dispatch) => {
    dispatch(noteFetchPending())

    try {
      const res = await axios.get(API_BASE + '/notes')
      dispatch(noteFetchSuccess(res.data))
      return Promise.resolve(res.data)
    } catch (err) {
      dispatch(noteFetchError(err))
      return Promise.reject(err)
    }
  }
}

export const fetchNoteDetail = (noteId) => {
  return async (dispatch) => {
    dispatch(noteDetailPending())

    try {
      const res = await axios.get(API_BASE + '/notes/' + noteId)
      dispatch(noteDetailSuccess(res.data))
      return Promise.resolve(res.data)
    } catch (err) {
      dispatch(noteDetailError(err))
      return Promise.reject(err)
    }
  }
}

const initialFlags = {
  removing: false,
  removed: false,
  created: false,
  creating: false,
  updated: false,
  updating: false,
  fetching: false
}

const initialState = {
  ...initialFlags,
  list: null,
  active: null
}

const reducer = handleActions(
  {
    [NOTE_FETCH_PENDING]: (state) => ({ ...state, ...initialFlags, fetching: true }),
    [NOTE_ADD_PENDING]: (state) => ({ ...state, creating: true, created: false }),
    [NOTE_UPDATE_PENDING]: (state) => ({ ...state, updating: true, updated: false }),
    [NOTE_REMOVE_PENDING]: (state) => ({ ...state, removing: true, removed: false }),
    [NOTE_DETAIL_PENDING]: (state) => ({ ...state, active: null }),

    [NOTE_ADD_SUCCESS]: (state) => ({ ...state, creating: false, created: true }),
    [NOTE_UPDATE_SUCCESS]: (state) => ({ ...state, updating: false, updated: true }),
    [NOTE_REMOVE_SUCCESS]: (state) => ({ ...state, removing: false, removed: true }),
    [NOTE_FETCH_SUCCESS]: (state, { payload }) => ({ ...state, fetching: false, list: payload && payload.reverse() }),
    [NOTE_DETAIL_SUCCESS]: (state, { payload }) => ({ ...state, active: payload }),

    [NOTE_FETCH_ERROR]: (state, { payload }) => ({ ...state, error: { op: 'read', stack: payload } }),
    [NOTE_UPDATE_ERROR]: (state, { payload }) => ({ ...state, error: { op: 'update', stack: payload } }),
    [NOTE_REMOVE_ERROR]: (state, { payload }) => ({ ...state, error: { op: 'delete', stack: payload } }),
    [NOTE_ADD_ERROR]: (state, { payload }) => ({ ...state, error: { op: 'create', stack: payload } }),
    [NOTE_DETAIL_ERROR]: (state, { payload }) => ({ ...state, error: { op: 'detail', stack: payload } })
  },
  initialState
)

export default reducer
