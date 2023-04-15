export type Category = []

export type CategoryResponse = []

export type CategoryWithProducts = {
  [key: string]: Product[]
}

export type CategoryProductResponse = {
  products: {
    id: number,
    title: string,
    category: string,
  },
  total: number,
  skip: number,
  limit: number
}

export type ProductsResponse = {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}

export type Product = {
  "id": number,
  "title": string,
  "description": string,
  "price": number,
  "discountPercentage": any,
  "rating": any,
  "stock": any,
  "brand": string,
  "category": string,
  "thumbnail": string,
  "images": string []
}
