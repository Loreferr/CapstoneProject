import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ReviewService } from 'src/app/reviews.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  constructor(private modalService: NgbModal, private http: HttpClient ,private route: ActivatedRoute,private el: ElementRef, private reviewService: ReviewService) {}

  reviews: any[] = [];
  maxDescriptionLength: number = 300;
  currentUsername: string | null = null;
  faStar = faStar;
  showDeleteButton: boolean = false;
  city: string = '';
  selectedReviewId: number = 0 // Inizializzata a null inizialmente
  expandedDescriptions: { [key: number]: boolean } = {};
  author: any = '';
  showScrollToTopButton = false;



  UpdatedReviewData: any = {
    city: '', // string
    description: '', // string
    rating: 0, // numero (puoi inizializzarlo a 0, ad esempio)
  };


  ngOnInit() {


    this.reviewService.reviewUpdated$.subscribe(() => {
      // Quando ricevi una notifica di aggiornamento, ricarica le cards
      this.reviewService.getReviews().subscribe((data) => {
        this.reviews = data.reverse();
      });
    });

    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = data;

      data.sort((a: any, b: any) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());



      this.reviews = data.reverse();

      for (const review of this.reviews) {
        review.displayedDescription = review.description.slice(0, this.maxDescriptionLength);
        review.showFull = false; // Inizialmente nascondi la descrizione completa
      }

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Puoi regolare questa soglia in base alle tue esigenze
          this.showScrollToTopButton = true;
        } else {
          this.showScrollToTopButton = false;
        }
      });
    });




      const storedUsername = localStorage.getItem('username');
  if (storedUsername !== null) {
    this.currentUsername = storedUsername;
  }



}

scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Aggiunge uno scorrimento fluido
  });
}


getReviewsByCity() {
  this.reviewService.getReviewsByCity(this.city).subscribe(
    (data) => {
      // Aggiorna la variabile reviews con le recensioni filtrate
      this.reviews = data;
    },
    (error) => {
      console.error('Errore durante il recupero delle recensioni per città:', error);
    }
  );
}

getReviewsByAuthor() {
  this.reviewService.getReviewsByAuthor(this.author).subscribe(
    (data) => {
      // Aggiorna la variabile reviews con le recensioni filtrate
      this.reviews = data;
    },
    (error) => {
      console.error('Errore durante il recupero delle recensioni per Autore:', error);
    }
  );
}

scrollToCards() {
  // Esegui lo scorrimento animato verso l'elemento del form utilizzando JavaScript puro
  const cardElement = this.el.nativeElement.querySelector('#card');
  if (cardElement) {
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

toggleDescription(event: Event, review: any): void {
  event.preventDefault(); // Prevent the default link behavior (page reload)
  this.expandedDescriptions[review.id] = !this.expandedDescriptions[review.id];
}

filterReviewsByAuthor() {
  // Recupera l'autore dalle informazioni memorizzate nel localStorage
  const author = localStorage.getItem('username');
  console.log(author);
   // Assicurati che la chiave sia corretta

  if (author) {
    // Se è stato trovato un autore nel localStorage
    // Chiamiamo il servizio di recensioni per ottenere solo le recensioni di quell'autore
    this.reviewService.getReviewsByAuthor(author).subscribe(
      (reviews) => {
        // Gestisci le recensioni filtrate qui, ad esempio, aggiorna la tua variabile di reviews
        this.reviews = reviews.reverse()
        this.reviews = reviews;
        this.showDeleteButton = reviews.length > 0;
        this.scrollToCards()
      },
      (error) => {
        console.error('Errore durante il recupero delle recensioni:', error);
      }
    );
  }
}

deleteReview(reviewId: number) {
  const authToken = localStorage.getItem('authToken'); // Assicurati di avere il token corretto

  if (authToken) {
    // Invia una richiesta per eliminare la recensione utilizzando l'ID e il token di autenticazione
    this.reviewService.deleteReview(reviewId, authToken).subscribe(
      () => {
        // La recensione è stata eliminata con successo, ora recupera le recensioni dell'autore

      },
      (error) => {
        console.error("Errore durante l'eliminazione della recensione:", error);
        this.filterReviewsByAuthor();
      }
    );
  }

}

updateReview(selectedReviewId: number, updatedData: any) {
  const authToken = localStorage.getItem('authToken'); // Ottieni il token

  if (authToken) {
    // Invia una richiesta HTTP PUT al server con i dati aggiornati
    this.reviewService.updateReview(selectedReviewId, updatedData, authToken).subscribe(
      (response) => {
        // Gestisci la risposta dal server o aggiorna la vista come necessario
        console.log('Recensione aggiornata con successo:', response);
        this.filterReviewsByAuthor();
        this.closeModal('Review')
      },
      (error) => {
        console.error('Errore durante l\'aggiornamento della recensione:', error);
      }
    );
  }
}


closeModal(modalName: string) {
  // Chiudi la modale utilizzando il nome della modale
  this.modalService.dismissAll(modalName);

}


loadAllReviews() {
  this.reviewService.getReviews().subscribe(
    (data: any[]) => {
      this.reviews = data.reverse()
      this.showDeleteButton = false;
      this.scrollToCards()
    },
    (error) => {
      console.error('Errore durante il recupero di tutte le recensioni:', error);
    }
  );
}


openVerticallyCentered(content: any, reviewId: number) {
  this.selectedReviewId = reviewId; // Imposta l'ID della recensione selezionata
  this.modalService.open(content, { centered: true });

  document.body.classList.add('no-scroll');
}




getStars(rating: number): any[] {
  const stars: any[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(faStar); // Icona stella piena
    } else {
      stars.push(faStar); // Icona stella vuota
    }
  }
  return stars;
}
}
