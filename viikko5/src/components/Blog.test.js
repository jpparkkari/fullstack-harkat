import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'tester',
      url: 'www',
      likes: 0
    }
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleDelete={mockHandler} handleLikes={mockHandler}/>
    )
    //component.debug()
  })

  test('at start the children are not displayed', () => {

    //const div = component.container.querySelector('.togglableContent')

    //expect(div).toHaveStyle('display: none')

    expect(component.container).toHaveTextContent(
      'test'
    )
    expect(component.container).toHaveTextContent(
      'tester'
    )
    expect(component.container).not.toHaveTextContent(
      'www'
    )
  })
})