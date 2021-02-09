import React from 'react'
import Flash from './Flash'
import { Link } from 'react-router-dom'

import { ButtonIcon } from './ButtonIcon'

const NotesList = ({ notes, onRemove }) => {
  const confirmRemove = (noteId) => {
    if (window.confirm('Are you sure you wish to delete this note?')) {
      onRemove(noteId)
    }
  }

  return (
    <div className={'mt-2'}>
      {notes && notes.length ? (
        <>
          {notes.map((note) => {
            return (
              <div key={`note${note.id}`} className="flex mb-4 items-center flex bg-white shadow-lg rounded-lg p-2 ">
                <p className="w-full text-grey-darkest">{note.title}</p>
                <Link to={'/notes/edit/' + note.id}>
                  <ButtonIcon color="yellow" icon={'edit'} />
                </Link>
                <ButtonIcon onClick={() => confirmRemove(note.id)} color="red" icon={'delete'} />

                <Link to={'/notes/' + note.id}>
                  <ButtonIcon icon={'chevron_right'} />
                </Link>
              </div>
            )
          })}
        </>
      ) : (
        <Flash message={'No notes have been added yet'} />
      )}
    </div>
  )
}

export default NotesList
