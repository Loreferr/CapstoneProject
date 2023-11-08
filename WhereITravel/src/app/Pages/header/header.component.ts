
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
    this.authService.setIsLoggedIn(true);
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
      this.authService.setIsLoggedIn(true);

    }
     }


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
    rating: 0,
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

          console.error('Errore durante il login:', error);
          this.loginError = true;
          this.errorMessage = 'Credenziali errate. Riprova.';

        }
      );
  }



  logout() {

    this.authService.logout();


    this.router.navigate(['/homepage']);
  }

  submitReview(): void {

    if (!this.authService.getIsLoggedIn()) {

      console.log('L\'utente non è loggato. Effettua il login per inviare una recensione.');
      return;
    }

    const author = localStorage.getItem('username');


  if (!author) {
    console.error('Nome dell\'autore non presente nel localStorage.');
    return;
  }


  this.reviewData.author = author;

    const authToken = this.authService.getToken();

    if (authToken !== null) {

      this.reviewService.postReview(this.reviewData, authToken).subscribe(
        (response) => {

          console.log('Recensione inviata con successo:', response);
          this.reviewService.aggiornaHomeReviews();


          this.reviewData = {
            city: '',
            description: '',
            rating: 0,
          };

          console.log('La pagina verrà aggiornata automaticamente.');
          this.closeModal('Review');

        },
        (error) => {

          console.error('Errore durante l\'invio della recensione:', error);


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

    this.modalService.dismissAll();


    this.modalService.open('Login');
  }

  closeModal(modalName: string) {

    this.modalService.dismissAll(modalName);

  }

  get showLoginButton(): boolean {
    return !this.authService.getIsLoggedIn();
  }

  get showRegisterButton(): boolean {
    return !this.authService.getIsLoggedIn();
  }

  fakeLogout() {
    localStorage.removeItem('authToken');
    this.authService.setFakeLoggedIn(false);
    localStorage.removeItem('username');
  }
}
