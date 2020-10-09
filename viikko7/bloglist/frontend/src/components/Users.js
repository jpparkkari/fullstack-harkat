import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch
} from "react-router-dom"
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'



const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h3>Users</h3>
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell></TableCell><TableCell>blogs created</TableCell>
        </TableHead>
        <TableBody>
          {users.map(user => 
            <TableRow key={user.id}>
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell> 
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>
    </div>
  )
}

export default Users