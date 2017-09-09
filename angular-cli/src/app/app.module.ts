import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import {RouterModule,Route  } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductItemComponent } from './product/product-list/product-item/product-item.component';
import {ProductDatabaseService  } from "./product/services/product-database.service";
import { ProductService } from "./product/services/product.service";
import { SigninComponent } from './Auth/signin/signin.component';
import { SignupComponent } from './Auth/signup/signup.component';

const appRoute:Route[]=[
 {path:"products",component:ProductComponent,children:[
  {path:":category",component:ProductListComponent},
    {path:":category/:id",component:ProductDetailComponent}
 ]},
 {path:"", redirectTo:"products",pathMatch:"full"},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},

  {path:"**",redirectTo:"/products"}

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [ProductDatabaseService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
