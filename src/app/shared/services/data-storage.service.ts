import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserDetail } from "../../admin/user-detail.model";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Movie } from "../../movies/movie.model";
import { ShowTimeFilm } from "../showTimeFilm.model";
import { Room } from "../room.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchCustomers() {
    return this.httpClient.get<UserDetail[]>(
      this.baseUrl + "/users" + "/customers"
    );
  }
  fetchUser(id: number) {
    return this.httpClient.get<UserDetail>(`${this.baseUrl}/users/${id}`);
  }

  updateCustomer(customer: UserDetail) {
    return this.httpClient.put<UserDetail>(
      `${this.baseUrl}/users/${customer.id}`,
      customer
    );
  }

  newCustomer(customer: UserDetail) {
    return this.httpClient.post<UserDetail>(
      this.baseUrl + "/register",
      customer
    );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/users/${id}`);
  }

  searchCustomer() {}

  fetchStaffs() {
    return this.httpClient.get<UserDetail[]>(
      this.baseUrl + "/users" + "/staffs"
    );
  }

  updateStaff(staff: UserDetail) {
    return this.httpClient.put<UserDetail>(
      `${this.baseUrl}/users/${staff.id}`,
      staff
    );
  }

  newStaff(staff: UserDetail) {
    return this.httpClient.post<UserDetail>(
      this.baseUrl + "/staffs/register",
      staff
    );
  }

  deleteStaff(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/users/${id}`);
  }

  fetchMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl + "/films");
  }

  fetchMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.baseUrl + "/films" + "/" + id);
  }

  fetchRooms() {
    return this.httpClient.get<Room[]>(this.baseUrl + "/rooms");
  }

  fetchShowTimeFilmById(id: number): Observable<ShowTimeFilm[]> {
    return this.httpClient.get<ShowTimeFilm[]>(
      this.baseUrl + "/showtimefilms" + "/" + id
    );
  }

  newMovie(fileToUpLoad: File, movie: Movie): Observable<Movie> {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpLoad, fileToUpLoad.name);
    return this.httpClient.post<Movie>(this.baseUrl + "/films", {
      formData: formData,
      movie: movie,
    });
  }

  // editMovie(id:number, movie:Movie):Observable<Movie>{
  //   return this.httpClient.put<Movie>(this.baseUrl + "");
  // }

  newShowTimeFilm(
    id: number,
    showTimeFilm: ShowTimeFilm
  ): Observable<ShowTimeFilm> {
    return this.httpClient.post<ShowTimeFilm>(
      this.baseUrl + "/api" + "/showtimefilms" + "/" + id,
      showTimeFilm
    );
  }
}
