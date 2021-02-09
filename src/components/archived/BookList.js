import React, { Component } from 'react'

import { connect } from 'react-redux'
import Book from './Book.js'

// import { setBook } from './redux/book/book.actions'

const books_api_URL = 'http://localhost:3001/api/v1/books'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.updateBooksList = this.updateBooksList.bind(this)
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    fetch(books_api_URL)
      .then((response) => response.json())
      .then((response_books) => {
        this.setState({
          books: response_books
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.formSubmit(this.props.rText)
  }

  // cBook(){
  //     var currentBook = this.state.books
  //     return currentBook

  // }

  async formSubmit(content) {
    await fetch(books_api_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        book: {
          content: this.props.rText
        }
      })
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log("response",response)
        this.updateBooksList(response)
      })

    //    this.updateBooksList({content:content})
  }

  updateBooksList(book) {
    let books = [...this.state.books]

    books.unshift(book)

    this.setState({
      books
    })
  }

  render() {
    const cBook = this.state.books

    return (
      <div>
        {console.log(cBook)}

        <form onSubmit={this.handleSubmit} id="book_form" autoComplete="off">
          <button submit={this.handleSubmit}>Save</button>
        </form>

        {/* <BookForm  books_api_URL={books_api_URL} updateBooksList={this.updateBooksList}/> */}

        {/*this.state.books.map((book) =>(<li key={book.id}>{book.title}</li>))*/}
        <Book books={this.state.books} />
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//    setBook: book => dispatch()
// })

const mapStateToProps = ({ text }) => {
  return {
    rText: text
  }
}

export default connect(mapStateToProps)(BookList)
