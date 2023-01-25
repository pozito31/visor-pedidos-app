import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { SeeOrdersClientComponent } from './components/see-orders-client/see-orders-client.component';
import { SeeOrdersEmployeeComponent } from './components/see-orders-employee/see-orders-employee.component';
import { FilterArrayPipe } from './pipes/filter-array.pipe';

export function translateFactory(provider: TranslateService){
  return () => provider.getData();
}

export function configFactory(provider: ConfigService){
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    TranslatePipe,
    HomeComponent,
    SeeOrdersClientComponent,
    SeeOrdersEmployeeComponent,
    FilterArrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
     TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps:[TranslateService],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps:[ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
