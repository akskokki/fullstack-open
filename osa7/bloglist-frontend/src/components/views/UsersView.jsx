import { Link } from 'react-router-dom'

const UsersView = ({ users }) => {
  if (!users) return null

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
