import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res){
  // const { name, email, comment, slug } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  });

  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }
  `;

  const result = await graphQLClient.request(query, req.body);
  // {
  //   name: req.body.name,
  //   email: req.body.email,
  //   comment: req.body.comment,
  //   slug: req.body.slug,
  // });
  // console.log(">comments.js : END<LOOK @ SLUG :: ");
  // console.log(slug);
  return res.status(200).send(result);
}