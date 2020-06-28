import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { UserDetail } from "../../admin/user-detail.model";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { Movie } from "../../movies/movie.model";
import { ShowTimeFilm } from "../showTimeFilm.model";
import { Room } from "../room.model";
import { Genre } from "../genre.model";
import { Seat } from "../seat.model";
import { Reservation } from "../reservation.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  // Customer
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

  // Staff
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

  // Movie
  fetchMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl + "/films");
  }

  fetchMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.baseUrl + "/films" + "/" + id);
  }

  newMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.baseUrl + "/films", movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(
      this.baseUrl + "/films" + "/" + id,
      movie
    );
  }

  deleteMovie(id: number): Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/films/${id}`);
  }

  // Room
  fetchRooms() {
    return this.httpClient.get<Room[]>(this.baseUrl + "/rooms");
  }

  // Show Time Film
  fetchShowTimeFilmListById(id: number): Observable<ShowTimeFilm[]> {
    return this.httpClient.get<ShowTimeFilm[]>(
      this.baseUrl + "/showtimefilms" + "/films" + "/" + id
    );
  }

  fetchShowTimeFilm(id: number): Observable<ShowTimeFilm> {
    return this.httpClient.get<ShowTimeFilm>(
      this.baseUrl + "/showtimefilms" + "/" + id
    );
  }

  newShowTimeFilm(
    id: number,
    showTimeFilm: ShowTimeFilm
  ): Observable<ShowTimeFilm> {
    return this.httpClient.post<ShowTimeFilm>(
      this.baseUrl + "/showtimefilms" + "/" + id,
      showTimeFilm
    );
  }

  updateShowTimeFilm(
    id: number,
    showTimeFilm: ShowTimeFilm
  ): Observable<ShowTimeFilm> {
    return this.httpClient.put<ShowTimeFilm>(
      this.baseUrl + "/showtimefilms" + "/" + id,
      showTimeFilm
    );
  }

  deleteShowTimeFilm(id: number) {
    return this.httpClient.delete(this.baseUrl + "/showtimefilms" + "/" + id);
  }

  // Genre
  fetchGenre(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.baseUrl + "/genres");
  }

  postFileUpLoad(fileToUpLoad: File) {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpLoad, fileToUpLoad.name);
    return this.httpClient.post(this.baseUrl + "/images", formData);
  }

  getSeats(id: number): Observable<Seat[]> {
    return this.httpClient.get<Seat[]>(
      this.baseUrl + "/seats" + "/showTimeFilm" + "/" + id
    );
  }

  getInforReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(
      this.baseUrl + "/reservations" + "/" + id
    );
  }

  updateStatus(id: number, movie: Movie): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.baseUrl + "/films" + "/update-status" + "/" + id,
      movie
    );
  }

  searchMovies(keyword: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.baseUrl + "/films" + "/search", {
      params: new HttpParams().set("keyword", keyword),
    });
  }
}
