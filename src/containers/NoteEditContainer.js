import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Layout from '../components/stateless/Layout'
import { updateNote, fetchNoteDetail } from '../redux/ducks/notes'
import NoteForm from '../components/stateful/NoteForm'

export const NoteEditContainer = ({ fetchNoteDetail, match, activeNote, updateNote, updated }) => {
  useEffect(() => {
    const noteId = match.params.id
    fetchNoteDetail(noteId)
  }, [])
  console.log('updated', updated)
  if (updated) return <Redirect push to="/" />
  return (
    <Layout>
      {activeNote && (
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <NoteForm onSave={updateNote} ctaLabel="Update" noteId={activeNote.id} preTitle={activeNote.title} preContent={activeNote.content} />
        </div>
      )}
    </Layout>
  )
}

const mapStateToProps = ({ notes }) => ({
  activeNote: notes && notes.active,
  updated: notes && notes.updated
})

const mapDispatchToProps = (dispatch) => ({
  fetchNoteDetail: (noteId) => dispatch(fetchNoteDetail(noteId)),
  updateNote: (note) => dispatch(updateNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditContainer)
