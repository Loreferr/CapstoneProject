import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { ImageData } from '../../Interfaces/image-data';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/reviews.service';
import { faStar,  } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';





@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {



  faStar = faStar;


maxDescriptionLength: number = 280;
currentUsername: string | null = null;
  backgroundImages: string[] = [];
  reviews: any[] = [];
  expandedDescriptions: { [key: number]: boolean } = {};



  constructor(private http: HttpClient ,private route: ActivatedRoute,private el: ElementRef, private reviewService: ReviewService) {}



  ngOnInit() {
    const apiKey = 'WWhWpB_gDB34rU2Nzj2XJKLoaGrSCgfIfqeCSsjIjgs';
    const apiUrl = `https://api.unsplash.com/photos/random?count=1&client_id=${apiKey}&query=travel&orientation=landscape&width=2500`;


    this.reviewService.reviewUpdated$.subscribe(() => {

      this.reviewService.getReviews().subscribe((data) => {
        this.reviews = data.reverse().slice(0,6);
      });
    });



    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = data;



      this.reviews = data.reverse().slice(0,6);

      for (const review of this.reviews) {
        review.displayedDescription = review.description.slice(0, this.maxDescriptionLength);
        review.showFull = false;
      }
    });



    this.http.get<ImageData[]>(apiUrl)
      .subscribe((data: ImageData[]) => {

        this.backgroundImages = data.map(image => image.urls.regular);
      });


      const storedUsername = localStorage.getItem('username');
  if (storedUsername !== null) {
    this.currentUsername = storedUsername;
  }



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


showFullDescription(review: any): void {
  review.showFull = !review.showFull;

  if (review.showFull) {
    review.displayedDescription = review.description;
  } else {
    review.displayedDescription = review.description.slice(0, this.maxDescriptionLength);
  }
}

scrollToForm() {

  const formElement = this.el.nativeElement.querySelector('#form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}



}
