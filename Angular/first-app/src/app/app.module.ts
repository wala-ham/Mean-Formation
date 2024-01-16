import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExerciceComponent } from './exercice/exercice.component';
import { DirectiveComponent } from './directive/directive.component';
import { HeroComponent } from './hero/hero.component';
import { AjoutComponent } from './ajout/ajout.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { NotfoundComponent } from './notfound/notfound.component';
import { UpdateComponent } from './update/update.component'
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciceComponent,
    DirectiveComponent,
    HeroComponent,
    AjoutComponent,
    ListComponent,
    HeaderComponent,
    NotfoundComponent,
    UpdateComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
