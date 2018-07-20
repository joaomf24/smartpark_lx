import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})

export class ContactosPage {

  private phone_num = '+351210000000';
  private email = 'smartparklx@gmail.com';

  constructor(public navCtrl: NavController){}
  
  onPhone(){
    document.location.href = "tel:" + this.phone_num;    
  }

  onEmail(){
    document.location.href = "mailto:" + this.email;    
  }
  
}
