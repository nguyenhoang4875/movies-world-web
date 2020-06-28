import { environment as common } from './environment';
export const environment = {
  ...common,
  production: true,
  //baseUrl: "https://moviesworldbe.herokuapp.com/api",
  baseUrl: "http://localhost:9000/api",
};
