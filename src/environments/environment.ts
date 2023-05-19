export const environment = {
  api: {
    apiBaseUrl: 'https://dummyjson.com',
    registration: '/users/add',
    login: '/auth/login',
    posts: '/posts',
    post: '/post/',
    products: '/products',
    categories: '/products/categories',
    categoryProducts: '/products/category/'
  },
  testData: {
    login: {
      username: 'kminchelle',
      password: '0lelplR',
      isCompany: null,
    },
    registration: {
      firstName: 'Muhammad',
      lastName: 'Ovi',
      age: 250,
    }
  },
  firebaseConfig: {
    apiKey: "AIzaSyAZVITW9EXF2NM2u0MD0iNp-nF3Pk-fPoo",
    authDomain: "tictactoe-693b5.firebaseapp.com",
    projectId: "tictactoe-693b5",
    storageBucket: "tictactoe-693b5.appspot.com",
    messagingSenderId: "1085962626853",
    appId: "1:1085962626853:web:0262a5926bee68c5381ccc"
  }
}
