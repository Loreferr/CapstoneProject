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
  selectedReviewId: number = 0
  expandedDescriptions: { [key: number]: boolean } = {};
  author: any = '';
  showScrollToTopButton = false;



  UpdatedReviewData: any = {
    city: '', // string
    description: '', // string
    rating: 0,
  };


  ngOnInit() {


    this.reviewService.reviewUpdated$.subscribe(() => {

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
        review.showFull = false;
      }

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
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
    behavior: 'smooth'
  });
}


getReviewsByCity() {
  this.reviewService.getReviewsByCity(this.city).subscribe(
    (data) => {

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

      this.reviews = data;
    },
    (error) => {
      console.error('Errore durante il recupero delle recensioni per Autore:', error);
    }
  );
}

scrollToCards() {

  const cardElement = this.el.nativeElement.querySelector('#card');
  if (cardElement) {
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

toggleDescription(event: Event, review: any): void {
  event.preventDefault();
  this.expandedDescriptions[review.id] = !this.expandedDescriptions[review.id];
}

filterReviewsByAuthor() {

  const author = localStorage.getItem('username');
  console.log(author);
   // Assicurati che la chiave sia corretta

  if (author) {

    this.reviewService.getReviewsByAuthor(author).subscribe(
      (reviews) => {

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
  const authToken = localStorage.getItem('authToken');

  if (authToken) {

    this.reviewService.deleteReview(reviewId, authToken).subscribe(
      () => {


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

    this.reviewService.updateReview(selectedReviewId, updatedData, authToken).subscribe(
      (response) => {

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
  this.selectedReviewId = reviewId;
  this.modalService.open(content, { centered: true });

  document.body.classList.add('no-scroll');
}




getStars(rating: number): any[] {
  const stars: any[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(faStar);
    } else {
      stars.push(faStar);
    }
  }
  return stars;
}
}
