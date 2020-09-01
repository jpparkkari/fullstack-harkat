import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testtitle',
      author: 'tester',
      url: 'www',
      likes: 0,
      user: {name: 'noname'}
    }
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleDelete={mockHandler} handleLikes={mockHandler}/>
    )
    //component.debug()
  })

  test('at start only the author and title are shown', () => {

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
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

})