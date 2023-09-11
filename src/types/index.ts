export interface Location {
  type: String;
  coordinates: number[];
  address: String;
  description: String;
  day?: number;
}
export interface Booking {
  _id: string;
  products: [
    {
      count: number;
      tour: Tour;
    }
  ];
  user: string;
  price: number;
  createdAt: Date;
  paid: boolean;
}
export interface Review {
  _id: string;
  rating: number;
  review: string;
  user: User;
  createdAt: Date;
  tour: Tour;
}
export interface Tour {
  reviews: Review[];
  maxGroupSize: number;
  _id: string;
  imageCover: string;
  difficulty: String;
  durationWeeks: Number;
  name: string;
  price: number;
  ratingsAverage: number;
  summary: String;
  duration: number;
  startDates: Date[];
  images: string[];
  startLocation: Location;
  locations: Location[];
  description?: String;
}
export interface User {
  email: String;
  name: String;
  photo: String;
  role: String;
  _id: string;
  wallet?: number;
  cart?: Cart[];
}

export interface Cart {
  count: number;
  product: Tour;
}
