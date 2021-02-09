import React, { Component } from 'react'
import { Button } from '../stateless/Button'

class Book extends Component {
  state = {
    title: '',
    editing: {}
  }

  enableEdit = (bookId, e) => {
    const editing = { ...this.state.editing }
    editing[bookId] = true
    this.setState({ editing })
  }

  handleContentChange = (e) => {
    console.log(e.target.value)
  }

  saveContent = (bookId, e) => {}

  handleChange = (e) => {
    this.setState({ title: e.target.value })
    console.log(this.state.title)
  }

  render() {
    const { books } = this.props
    const { editing } = this.state
    return (
      <div className="max-w-lg p-2">
        {Boolean(books && books.length) &&
          books.map((book) => (
            <div className="mt-2">
              <Button onClick={(e) => this.enableEdit(book.id, e)} color="gray" text="Edit" />
              <span className="ml-2">{book.title}</span>
              {editing[book.id] && (
                <div className="">
                  <textarea style={{ height: 300 }} className="border block w-full my-2" onChange={this.handleContentChange}>
                    {book.content}
                  </textarea>
                  <Button onClick={(e) => this.saveContent(book.id, e)} color="gray" text="Save" />
                </div>
              )}
            </div>
          ))}
      </div>
    )
  }
}

export default Book
