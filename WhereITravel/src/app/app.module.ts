import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FormComponent } from './Pages/form/form.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './Pages/result/result.component';
import { ReviewsComponent } from './Pages/reviews/reviews.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './Pages/footer/footer.component';
import { StarRatingPipe } from './star-rating.pipe';


@NgModule({
  declarations: [

    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FormComponent,
    ResultComponent,

    ReviewsComponent,
     FooterComponent,
     StarRatingPipe
  ],
  imports: [
    NgbDropdownModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
