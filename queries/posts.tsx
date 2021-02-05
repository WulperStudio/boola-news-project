import axios from "axios"

export const getPostById = (id:any) =>
  axios
    .post(`${process.env.strapiServer}/graphql`, {
      query: `query {
        posts(where: { id: "${id}" }) {
          id
          title
          content
          image {
            url
          }
        }
      }`,
    })
    .then(response => response.data.data.posts[0])
    .catch(error => error.response)
