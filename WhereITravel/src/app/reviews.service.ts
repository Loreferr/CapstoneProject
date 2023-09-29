import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api/reviews';

  private reviewUpdatedSource = new BehaviorSubject<boolean>(false);
  reviewUpdated$ = this.reviewUpdatedSource.asObservable();

  constructor(private http: HttpClient) {}

  aggiornaHomeReviews() {
    this.reviewUpdatedSource.next(true);
  }

  getReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  getReviewsByCity(city: string): Observable<any[]> {
    // Crea l'URL completo per la richiesta di recensioni filtrate per città
    const apiUrlWithCity = `${this.apiUrl}/${city}`;

    // Esegui la richiesta HTTP GET all'endpoint API
    return this.http.get<any[]>(apiUrlWithCity);
  }

  postReview(reviewData: any, authToken: string): Observable<any> {
    // Configura le intestazioni per includere il token di autenticazione
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    // Esegui la richiesta POST all'endpoint API corretto
    const addReviewUrl = `${this.apiUrl}/add`; // Aggiungi '/add' all'URL
    return this.http.post(addReviewUrl, reviewData, httpOptions);
  }



  deleteReview(reviewId: number, authToken: string): Observable<any> {
    // Configura le intestazioni per includere il token di autenticazione
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };

    // Crea l'URL completo per l'eliminazione della recensione specifica utilizzando l'ID
    const deleteReviewUrl = `${this.apiUrl}/${reviewId}`;

    // Esegui la richiesta HTTP DELETE all'endpoint API per eliminare la recensione specifica
    return this.http.delete(deleteReviewUrl, httpOptions);
  }


  // Aggiungi il metodo deleteReview al tuo servizio ReviewService


  updateReview(reviewId: number, reviewData: any, authToken: string): Observable<any> {
    // Configura le intestazioni per includere il token di autenticazione
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    // Crea l'URL completo per l'aggiornamento della recensione specifica
    const updateReviewUrl = `${this.apiUrl}/${reviewId}`;

    // Esegui la richiesta HTTP PUT all'endpoint API
    return this.http.put(updateReviewUrl, reviewData, httpOptions);
  }

getReviewsByAuthor(author: string): Observable<any[]> {
  // Esegui una richiesta HTTP GET all'endpoint API per ottenere le recensioni di un autore specifico
  const apiUrl = `${this.apiUrl}/byAuthor/${author}`;
  return this.http.get<any[]>(apiUrl);
}


  convertRatingToStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  }
}

