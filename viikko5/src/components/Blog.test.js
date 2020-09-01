import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



  test('at start only the author and title are shown', () => {
    const blog = {
      title: 'testtitle',
      author: 'tester',
      url: 'www',
      likes: 0,
      user: {name: 'noname'}
    }
    const mockHandler = jest.fn()
    const mockLikeHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handleDelete={mockHandler} handleLikes={mockLikeHandler}/>
    )
    //const div = component.container.querySelector('.togglableContent')

    //expect(div).toHaveStyle('display: none')

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
    const blog = {
      title: 'testtitle',
      author: 'tester',
      url: 'www',
      likes: 0,
      user: {name: 'noname'}
    }
    const mockHandler = jest.fn()
    const mockLikeHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handleDelete={mockHandler} handleLikes={mockLikeHandler}/>
    )

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
    const blog2 = {
      title: 'testtitle2',
      author: 'tester2',
      url: 'www2',
      likes: 3,
      user: {name: 'noname2'}
    }
    const mockHandler2 = jest.fn()
    const mockLikeHandler2 = jest.fn()
    const component = render(
      <Blog blog={blog2} handleDelete={mockHandler2} handleLikes={mockLikeHandler2}/>
    )

    const showButton = component.getByText('view')
    fireEvent.click(showButton)
    
    const likeButton = component.getByText('like').closest('button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler2.mock.calls).toHaveLength(2)
  })


