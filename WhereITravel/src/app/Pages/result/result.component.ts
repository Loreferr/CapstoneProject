import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Review } from 'src/app/Interfaces/reviews';
import { ReviewService } from 'src/app/reviews.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient, private reviewService: ReviewService) {}


destination: string = '' ;
description: string = '' ;
interests: string[] = [];
images: string[] = [];
interestImages: Record<string, string> = {};
maxDescriptionLength: number = 300;
currentUsername: string | null = null;
expandedDescriptions: { [key: number]: boolean } = {};



reviews: any[] = [];



ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.destination = params['destination'];
    this.description = params['description'];
    this.interests = params['interests']
    if (this.destination) {

      this.getImagesFromUnsplash(this.destination);
    }
    if (this.interests && this.interests.length > 0) {
      // Carica le immagini dai luoghi di interesse
      this.getInterestFromUnsplash(this.interests);
    }
  });

  this.reviewService.getReviews().subscribe((data: { city: string }[]) => {

    const destinationLower = this.destination.toLowerCase();


    this.reviews = data.filter((review) => destinationLower.includes(review.city.toLowerCase()));
  });




}

toggleDescription(event: Event, review: any): void {
  event.preventDefault();
  this.expandedDescriptions[review.id] = !this.expandedDescriptions[review.id];
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

paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

togglePaused() {
  if (this.paused) {
    this.carousel.cycle();
  } else {
    this.carousel.pause();
  }
  this.paused = !this.paused;
}

onSlide(slideEvent: NgbSlideEvent) {
  if (
    this.unpauseOnArrow &&
    slideEvent.paused &&
    (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
  ) {
    this.togglePaused();
  }
  if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
    this.togglePaused();
  }
}






// Funzione per ottenere le immagini da Unsplash
getImagesFromUnsplash(destination: string) {

  const apiKey = 'WWhWpB_gDB34rU2Nzj2XJKLoaGrSCgfIfqeCSsjIjgs';
  const apiUrl = `https://api.unsplash.com/photos/random?count=5&client_id=${apiKey}&query=${destination}&orientation=landscape`;

  this.http.get<any[]>(apiUrl).subscribe(
    (data: any[]) => {
      this.images = data.map(image => image.urls.regular);


    },
    (error) => {
      console.error('Errore durante il recupero delle immagini:', error);
    }
  );

}

getInterestFromUnsplash(placesOfInterest: string[]) {
  const apiKey = 'WWhWpB_gDB34rU2Nzj2XJKLoaGrSCgfIfqeCSsjIjgs';

  placesOfInterest.forEach((place) => {
    const apiUrl = `https://api.unsplash.com/photos/random?count=1&client_id=${apiKey}&query=${place}&orientation=landscape`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        const imageUrl = data[0].urls.regular;
        this.interestImages[place] = imageUrl;
      },
      (error) => {
        console.error(`Errore durante il recupero delle immagini per ${place}:`, error);
      }
    );
  });
}

openImageInDetail(imageUrl: string) {
  window.open(imageUrl, '_blank');
}








}
