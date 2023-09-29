
import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth-service.service';
import { ReviewService } from 'src/app/reviews.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('registerModal') registerModal: any;
@ViewChild('loginModal') loginModal: any;
  closeResult = '';
// Nel tuo componente
// Imposta il valore iniziale in base alla pagina corrente

  password: string = '';

  headerfixed:boolean = false;

  loginError: boolean = false;
errorMessage: string = '';


username: string = '';
  constructor(private modalService: NgbModal, private authService: AuthService,private router: Router,private reviewService: ReviewService) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== null) {
      this.username = storedUsername;
    }
    this.authService.setFakeLoggedIn(true);
    const storedAuthToken = localStorage.getItem('authToken');
  if (storedAuthToken !== null) {
    this.authService.setIsLoggedIn(true); // Imposta l'utente come "loggato"
  }
  }


  @HostListener(  'window:scroll', ['$event']) onscroll(){

    if (window.scrollY > 100) {
      this.headerfixed = true
    }
    else {
      this.headerfixed = false
    }
  }

  ngOnInit() {


    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken !== null) {
      this.authService.setIsLoggedIn(true); // Imposta l'utente come "loggato"

    }
    /*let header = document.getElementById('site-header');
if (this.router.url.startsWith('/results')) {

      header!.style.backgroundColor = "purple"
    } else {
      header!.style.backgroundColor = "none"



  }*/ }


  open(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  openVerticallyCentered(content: any) {
		this.modalService.open(content, { centered: true });

    document.body.classList.add('no-scroll');
	}


  registrationData: any = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  reviewData: any = {
    city: '', // string
    description: '', // string
    rating: 0, // numero (puoi inizializzarlo a 0, ad esempio)
  };




  registerUser() {
    this.authService.register(this.registrationData).subscribe(
      (response) => {
        // Gestisci la risposta di successo qui
        console.log('Registrazione avvenuta con successo', response);
        // Chiudi la modale qui

      },
      (error) => {
        // Gestisci l'errore qui
        this.closeModal('Register');
        console.error('Errore durante la registrazione', error);
        // Mostra un messaggio di errore o esegui azioni appropriate
      }
    );
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          // Login avvenuto con successo
          console.log('Login avvenuto');
          this.authService.setIsLoggedIn(true);
          // Nascondi il bottone di registrazione

          localStorage.setItem('username', this.username);

          // Imposta loginSuccess su true
          this.closeModal('Login');


        },
        (error) => {
          // Gestisci gli errori del login
          console.error('Errore durante il login:', error);
          this.loginError = true; // Imposta la variabile di errore su true
          this.errorMessage = 'Credenziali errate. Riprova.'; // Imposta il messaggio di errore
          // Non chiudere la modale in caso di errore
        }
      );
  }



  logout() {
    // Esegui il logout dell'utente, ad esempio rimuovendo il token JWT o cancellando la sessione

    // Aggiungi qui la logica per visualizzare le modali
    // Ad esempio, imposta una variabile per mostrare le modali
    // E reimposta isLoggedIn a false
    this.authService.logout();

    // Dopodiché reindirizza l'utente alla pagina di accesso o a un'altra pagina
    this.router.navigate(['/homepage']); // Sostituisci '/login' con il percorso desiderato
  }

  submitReview(): void {
    // Verifica se l'utente è loggato prima di inviare una recensione (se necessario)
    if (!this.authService.getIsLoggedIn()) {
      // L'utente non è loggato, puoi gestire questo caso come preferisci, ad esempio reindirizzandolo alla pagina di login o mostrando un messaggio di errore.
      console.log('L\'utente non è loggato. Effettua il login per inviare una recensione.');
      return;
    }

    const author = localStorage.getItem('username');

  // Verifica se l'autore è presente nel localStorage
  if (!author) {
    console.error('Nome dell\'autore non presente nel localStorage.');
    return;
  }

  // Imposta l'autore nei dati della recensione
  this.reviewData.author = author;

    const authToken = this.authService.getToken();

    if (authToken !== null) {
      // Invia la recensione al servizio includendo il token nelle intestazioni
      this.reviewService.postReview(this.reviewData, authToken).subscribe(
        (response) => {
          // La recensione è stata inviata con successo, puoi gestire la risposta qui
          console.log('Recensione inviata con successo:', response);
          this.reviewService.aggiornaHomeReviews();

          // Puoi anche reimpostare i campi del form o fare altre azioni necessarie dopo l'invio della recensione.
          this.reviewData = {
            city: '',
            description: '',
            rating: 0,
          };

          console.log('La pagina verrà aggiornata automaticamente.');
          this.closeModal('Review');
          // Ricarica la pagina automaticamente
        },
        (error) => {
          // Gestisci eventuali errori durante l'invio della recensione
          console.error('Errore durante l\'invio della recensione:', error);

          // Mostra un messaggio di errore all'utente
        }
      );
    } else {
      console.error('Il token di autenticazione è nullo. Effettua il login per ottenere un token valido.');
    }
  }



  get isLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  switchToLogin() {
    // Chiudi la modale di registrazione
    this.modalService.dismissAll();

    // Apri la modale di accesso
    this.modalService.open('Login'); // Sostituisci 'modalLogin' con l'ID della modale di accesso
  }

  closeModal(modalName: string) {
    // Chiudi la modale utilizzando il nome della modale
    this.modalService.dismissAll(modalName);

  }

  get showLoginButton(): boolean {
    return !this.authService.getIsLoggedIn(); // Torna true quando l'utente non è "loggato"
  }

  get showRegisterButton(): boolean {
    return !this.authService.getIsLoggedIn(); // Torna true quando l'utente non è "loggato"
  }

  fakeLogout() {
    localStorage.removeItem('authToken');
    this.authService.setFakeLoggedIn(false); // Imposta "loggato" a false
    localStorage.removeItem('username'); // Rimuovi l'username memorizzato
  }
}
