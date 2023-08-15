export interface Location {
  type: String;
  coordinates: number[];
  address: String;
  description: String;
  day?: Number;
}

export interface Review {
  id: string;
  rating: number;
  review: string;
  user: User;
}
export interface Tour {
  reviews: Review[];
  maxGroupSize: number;
  id: String;
  imageCover: String;
  difficulty: String;
  durationWeeks: Number;
  name: String;
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
  _id: String;
  wallet?: Number;
  cart?: Cart[];
}

export interface Cart {
  count: number;
  product: Tour;
}
