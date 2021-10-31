import { BaseAPIClient } from './common'

class ToDoListAPI extends BaseAPIClient {
  baseUrl = `${process.env.REACT_APP_API_URL}/todo-list`

  fetch() {
    return fetch(this.baseUrl, { headers: this.headers }).then((response) =>
      response.json()
    )
  }
}

export default new ToDoListAPI()
