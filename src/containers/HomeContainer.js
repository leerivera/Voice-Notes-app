import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/stateless/Layout'
import NoteForm from '../components/stateful/NoteForm'
import NotesList from '../components/stateless/NotesList'
import { fetchNotes, addNote, removeNote } from '../redux/ducks/notes'

export const HomeContainer = ({ created, notes, fetchNotes, addNote, removeNote }) => {
  useEffect(() => {
    fetchNotes()
  }, [created])

  return (
    <Layout>
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <NoteForm onSave={addNote} />
      </div>
      <NotesList notes={notes.list} onRemove={removeNote} />
    </Layout>
  )
}

const mapStateToProps = ({ notes }) => {
  return {
    notes,
    created: notes && notes.created
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeNote: (noteId) => dispatch(removeNote(noteId)),
  addNote: (note) => dispatch(addNote(note)),
  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
