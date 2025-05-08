export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    images: string[];
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    ratingsQuantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
  }
  export interface ProductResponse {
    data: Product;
  }
  

export interface AllProductsResponse {
  data: Product[];
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
}

  

