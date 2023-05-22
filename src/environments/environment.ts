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
    apiKey: "AIzaSyBYbv-GzIGzSJNAaJsKi1E9BZrqZ6Ndt4A",
    authDomain: "tictactoe-b54a0.firebaseapp.com",
    projectId: "tictactoe-b54a0",
    storageBucket: "tictactoe-b54a0.appspot.com",
    messagingSenderId: "582970425739",
    appId: "1:582970425739:web:4663a4696fa9b8eb776f8e",
    measurementId: "G-0VNZ4PKPMZ",
    databaseURL: 'https://tictactoe-b54a0-default-rtdb.europe-west1.firebasedatabase.app'
  }
}
