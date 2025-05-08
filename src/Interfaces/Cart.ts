export interface CartItem {
    _id: string;
    product: {
      _id: string;
      title: string;
      price: number;
      imageCover: string;
    };
    count: number;
    price: number;
  }
  
  export interface CartResponse {
    status: string;
    numOfCartItems: number;
    data: {
      _id: string;
      cartOwner: string;
      products: CartItem[];
      totalCartPrice: number;
    };
  }
  