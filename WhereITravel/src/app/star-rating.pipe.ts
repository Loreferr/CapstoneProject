import { Pipe, PipeTransform } from '@angular/core';
import { faStar,  } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {
  transform(rating: number): string {
    // Calcola il numero di stelle piene e mezze
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 === 0.5 ? 1 : 0;

    // Crea una stringa HTML con le stelle
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    }
    if (halfStars === 1) {
      starsHtml += '<i class="fa-regular fa-star"></i> ';
    }

    return starsHtml;
  }
}
