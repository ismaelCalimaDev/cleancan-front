import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Api {
  private static token?: string = null;
  protected host: string;
  constructor(private http: HttpClient) {
    if (Api.token === null && localStorage.getItem('CC-token')) {
      Api.token = localStorage.getItem('CC-token');
    }
    this.host = 'http://localhost:8000/api'
  }
  getToken(): string {
    return Api.token || localStorage.getItem('CC-token');
  }
  post<T>(endpoint: string, body: any) {
    return this.pipes(
      this.http.post<T>(this.host + endpoint, body, { headers: this.headers() })
        .pipe(
          shareReplay(),
        )
    );
  }
  get<T>(endpoint: string, params?: HttpParams) {
    return this.pipes(
      this.http.get<T>(this.host + endpoint, { params, headers: this.headers()})
        .pipe(
          shareReplay(),
        )
    );
  }
  put<T>(endpoint: string, body: any) {
    return this.pipes(
      this.http.put<T>(this.host + endpoint, body, { headers: this.headers() })
        .pipe(
          shareReplay(),
        )
    );
  }

  delete<T>(endpoint: string) {
    return this.pipes(
      this.http.delete<T>(this.host + endpoint, { headers: this.headers() })
        .pipe(
          shareReplay(),
        )
    );
  }

  logout() {
    localStorage.removeItem('CC-token');
    Api.token = null;
  }

  private headers(): { [key: string]: string } {
    const headers = {
      'Accept': 'application/json',
    };
    if (Api.token) {
      headers['Authorization'] = `Bearer ${Api.token}`;
    }
    return headers;
  }
  private pipes<T>(observable: Observable<T>): Observable<T> {
    const pipes = [
      this.authenticateIfNeeded,
    ];

    for (const pipe of pipes) {
      pipe(observable);
    }

    return observable;
  }
  private authenticateIfNeeded<T>(observable: Observable<T>): void {
    observable.subscribe(response => {
      if ((response as any).token) {
        Api.token = (response as any).token;
        localStorage.setItem('CC-token', Api.token);
      }
    });
  }
}
