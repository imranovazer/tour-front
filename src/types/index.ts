export interface Location {
  type: String;
  coordinates: Number[];
  address: String;
  description: String;
  day: Number;
}
export interface Tour {
  id: String;
  imageCover: String;
  difficulty: String;
  durationWeeks: Number;
  name: String;
  price: Number;
  ratingsAverage: Number;
  summary: String;
  duration: Number;
  startLocation: Location;
}
export interface User {
  email: String;
  name: String;
  photo: String;
  role: String;
  _id: String;
  wallet?: Number;
}
