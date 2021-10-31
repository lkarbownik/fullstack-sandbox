import { BaseAPIClient } from './common'

class ToDoAPI extends BaseAPIClient {
  baseUrl = `${process.env.REACT_APP_API_URL}/todo`

  get({ toDoListId }) {
    const url = new URL(`${this.baseUrl}`)
    url.search = new URLSearchParams({ todoListId: toDoListId })

    return fetch(url, { headers: this.headers }).then((response) =>
      response.json()
    )
  }

  update(toDo) {
    const id = toDo.id

    const url = new URL(`${this.baseUrl}/${id}`)

    return fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(toDo),
    }).then((response) => response.json())
  }

  create(toDo) {
    const url = new URL(`${this.baseUrl}/`)

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(toDo),
    }).then((response) => response.json())
  }

  delete(toDoId) {
    const url = new URL(`${this.baseUrl}/${toDoId}`)

    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    })
  }
}

export default new ToDoAPI()
