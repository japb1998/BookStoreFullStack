import { gql} from '@apollo/client';
export const LOGIN = gql`mutation login($username:String!,$password:String!){
    login(username:$username,password:$password){
        token
  user {
    _id
    username
    email
    savedBooks {
       bookId
       authors
       description
       image
       link
       title
    }
  }
    }
}`

export const SIGN_UP = gql`mutation signUp($input:signUpInput!){
    signUp(input:$input){
        token
        user {
            _id
            username
            email
            savedBooks {
               bookId
               authors
               description
               image
               link
               title
            }
          }
        }
    }`

export const GET_ME = gql`query getMe {
    getMe{
        _id
        username
        email
        bookCount
        savedBooks{
                bookId
               authors
               description
               image
               link
               title
        }
    }
}`

export const SAVE_BOOK = gql`
  mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(bookId: $id) {
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;