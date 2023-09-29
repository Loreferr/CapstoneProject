import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private token: string | null = null;// Sostituisci con l'URL del tuo backend

  private isLoggedIn = false;
  private username: string | null = null;
  authStateChanged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}


  // Metodo per la registrazione dell'utente
  register(userData: any): Observable<any> {
    const registerUrl = `${this.baseUrl}/register`;
    return this.http.post(registerUrl, userData);
  }

  // Metodo per l'accesso dell'utente
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post(`${this.baseUrl}/login`, loginData)
      .pipe(
        tap((response: any) => {
          console.log('Risposta dalla richiesta di login:', response); // Aggiungi questo log

          if (response.accessToken) {
            this.token = response.accessToken;
            this.isLoggedIn = true;
            console.log(this.token);

            this.username = response.username;
            console.log('Username estratto con successo:', this.username);
            localStorage.setItem('authToken', response.accessToken);
          } else {
            console.error('Errore durante il login:', response.error);
          }
        }),
        catchError((error) => {
          console.error('Errore durante la richiesta HTTP:', error);
          throw error;
        })
      );
  }


  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    this.isLoggedIn = true;
  }


  // Metodo per il logout dell'utente
  logout(): void {
    // Puoi aggiungere qui la logica necessaria per eseguire il logout
    // Ad esempio, cancellare il token di autenticazione o eseguire una chiamata al backend per invalidare la sessione
    // Dopo il logout, reimposta isLoggedIn su false e username su null
    this.isLoggedIn = false;

  }
  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
    this.authStateChanged.next(value); // Aggiorna il BehaviorSubject
  }
  // Metodo per verificare se l'utente è loggato
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Metodo per ottenere il nome dell'utente loggato
  getUsername(): string | null {
    return this.username;
  }


  setFakeLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
    // Aggiungi qui altre operazioni necessarie
  }
}
