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
  maxGroupSize: Number;
  id: String;
  imageCover: String;
  difficulty: String;
  durationWeeks: Number;
  name: String;
  price: Number;
  ratingsAverage: Number;
  summary: String;
  duration: Number;
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
}
