import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/stateless/Layout'
import { fetchNoteDetail } from '../redux/ducks/notes'

export const NoteDetailContainer = ({ fetchNoteDetail, match, activeNote }) => {
  useEffect(() => {
    const noteId = match.params.id
    fetchNoteDetail(noteId)
  }, [])
  return (
    <Layout>
      {activeNote && (
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{activeNote.title}</h2>
            <p className="mt-2 text-gray-600">{activeNote.content}</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

const mapStateToProps = ({ notes }) => ({
  activeNote: notes && notes.active
})

const mapDispatchToProps = (dispatch) => ({
  fetchNoteDetail: (noteId) => dispatch(fetchNoteDetail(noteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailContainer)
