import React from 'react'
import PropTypes from 'prop-types'

import SpeechRecognition from 'react-speech-recognition'
import BookList from './BookList'
import Layout from '../stateless/Layout'

import { setText } from '../../redux/text/text.actions'
import { connect } from 'react-redux'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //      text: "",
  //     //  books: [],
  //     //  api_URL: books_api_URL

  //   }

  // }

  componentDidUpdate(prevProps) {
    // console.log("this.props.transcript",this.props.transcript)
    const { setText } = this.props
    if (prevProps.transcript !== this.props.transcript) {
      setText(this.props.transcript)
    }
  }
  onInputChange = (event) => {
    //console.log("event.target.value",event.target.value)
    //setText(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault() //this stop page from refreshing on submit
    this.formSubmit()
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, stopListening } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <Layout>
        <form onSubmit={this.handleSubmit} className="p-2" id="book_form" autoComplete="off">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={resetTranscript}>
            Reset
          </button>
          <input
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={transcript}
            onChange={(event) => this.onInputChange(event.target.value)}
            /// on change makes Onchange equal to a func with
            // oninputchange and assigns it a value of event.target.value
          />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={stopListening}>
            Stop
          </button>
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
        </form>

        <BookList />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setText: (text) => dispatch(setText(text))
})

App.propTypes = propTypes

export default connect(null, mapDispatchToProps)(SpeechRecognition(App))
