import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import Input from '../stateless/Input'
import { Button } from '../stateless/Button'
import TextArea from '../stateless/TextArea'
import Flash from '../stateless/Flash'
import { ButtonIcon } from '../stateless/ButtonIcon'

const NoteForm = ({ onSave, preTitle, preContent, ctaLabel, noteId, ...props }) => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  const [title, setTitle] = useState(preTitle || '')
  const [content, setContent] = useState(preContent || '')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState(0)

  useEffect(() => {
    setContent(transcript)
  }, [transcript])

  const toggleRecording = (evt) => {
    let requestedMode = !mode
    setMode(requestedMode)
    if (requestedMode) {
      SpeechRecognition.startListening()
    } else {
      SpeechRecognition.stopListening()
    }
  }

  const handleSubmit = (evt) => {
    setMessage('')
    evt.preventDefault()
    let err = ''
    if (!title) err = 'Title is required'
    else if (!content) err = 'Content is required'
    if (err) return setMessage(err)
    const objNote = { title, content }
    if (noteId) objNote.id = noteId
    onSave(objNote)
    setTitle('')
    setContent('')
    resetTranscript()
  }

  console.log(props)

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {message && <Flash message={message} />}
      <Input placeholder={'Enter Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="relative my-1">
        <TextArea placeholder="Take a note" value={content} onChange={(e) => setContent(e.target.value)} />

        <ButtonIcon onClick={toggleRecording} icon={mode ? 'mic' : 'mic_off'} className={'absolute top-0 right-0 m-1'} />
      </div>

      <div className="flex items-center justify-between">
        <Button text={ctaLabel || 'Save'} type={'submit'} />
      </div>
    </form>
  )
}

export default NoteForm
