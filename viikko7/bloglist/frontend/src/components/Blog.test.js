import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blogtests', () => {
  let component
  let mockLikeHandler
  beforeEach(() => {
    const blog = {
      title: 'testtitle',
      author: 'tester',
      url: 'www',
      likes: 0,
      user: { name: 'noname' }
    }
    const mockHandler = jest.fn()
    mockLikeHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleDelete={mockHandler} handleLikes={mockLikeHandler}/>
    )
  })

  test('at start only the author and title are shown', () => {

    expect(component.container).toHaveTextContent(
      'testtitle'
    )
    expect(component.container).toHaveTextContent(
      'tester'
    )
    expect(component.container).not.toHaveTextContent(
      'www'
    )
  })

  test('clicking the show button shows the other information', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

  test('if like button is pressed twice, the event handler gets called two times', () => {


    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like').closest('button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})
