import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('Correct parameters are returned with props function', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(author, {
    target: { value: 'tstAuthor' }
  })
  fireEvent.change(url, {
    target: { value: 'www.te.st' }
  })
  fireEvent.submit(form)

  console.log(mockHandler.mock.calls[0][0])
  expect(mockHandler.mock.calls[0][0]).toEqual({ title: 'test title', author: 'tstAuthor', url: 'www.te.st' })
})