import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { PerfilPage } from '../pages/perfil/perfil';
import { HistoricoPage } from '../pages/historico/historico';
import { InformacoesPage } from '../pages/informacoes/informacoes';
import { DefinicoesPage } from '../pages/definicoes/definicoes';
import { ContactosPage } from '../pages/contactos/contactos';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsControllerPage } from "../pages/tabs-controller/tabs-controller";
import { MatriculasPage } from "../pages/matriculas/matriculas";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from "@ionic/storage";
import { PerfilService } from "../services/perfil.service";
import { PerfilModel } from "../models/perfil";
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild('nav') navCtrl: NavController;
  rootPage:any;  
  langDefault = '';
  perfil: PerfilModel = new PerfilModel("","","","","",'');
  isAuthenticated = false;
  token:string;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    translate: TranslateService, 
    private storage: Storage, 
    private perfilServ:PerfilService,
    private menuCtrl: MenuController,
    private authServ:AuthService) {
    
    firebase.initializeApp({ //get this from your Firebase console
      apiKey: "##############", 
      authDomain: "##############", 
      databaseURL: "##############",
      projectId:"##############",
      storageBucket: "##############",
      messagingSenderId: "##############",
    });

    firebase.auth().onAuthStateChanged(user => {
      setTimeout(()=>{
        if(user){
          this.isAuthenticated = true;
          this.rootPage = TabsControllerPage;
          this.menuCtrl.enable(true);
          user.getToken()
          .then(
            (token: string) => {
              this.token = token;
              this.perfilServ.fetchPerfil(token).subscribe(
                (perfil: PerfilModel) => {                
                  if(perfil){
                    this.perfil = perfil;
                  }
                  else{
                    this.perfil = new PerfilModel("","","","","","assets/img/avatar.png");
                  }
                }
              );          
            });
        }
        else{
          this.isAuthenticated = false;
          this.rootPage = LoginPage;
          this.menuCtrl.enable(false);
        }
        splashScreen.hide();
      }, 2000);       
    });

    platform.ready().then(() => {      
      this.storage.get('lang')
      .then(
          (lang: string) => {
              this.langDefault = lang != null ? lang : 'pt';
              
              translate.setDefaultLang(this.langDefault);
              translate.currentLang = this.langDefault;             
          }
      )
      .catch();
      statusBar.backgroundColorByHexString("#0D6001");      
    });    
  }

  ngAfterViewInit() {
    this.navCtrl.viewDidEnter.subscribe((data) => {
      this.perfilServ.fetchPerfil(this.token).subscribe(            
        (perfil: PerfilModel) => {          
          if(perfil){
            this.perfil = perfil;
          }
          else{
            this.perfil = new PerfilModel("","","","","","assets/img/avatar.png");
          }
        }
      );       
    });
  }  

  goToFavoritos(params){
    if (!params) params = {};
    this.navCtrl.push(FavoritosPage);
  }
  goToPerfil(params){
    if (!params) params = {};
    this.navCtrl.push(PerfilPage);
  }
  goToMatriculas(params){
    if (!params) params = {};
    this.navCtrl.push(MatriculasPage);
  }
  goToHistorico(params){
    if (!params) params = {};
    this.navCtrl.push(HistoricoPage);
  }
  goToInformacoes(params){
    if (!params) params = {};
    this.navCtrl.push(InformacoesPage);
  }
  goToDefinicoes(params){
    if (!params) params = {};
    this.navCtrl.push(DefinicoesPage);
  }
  goToContactos(params){
    if (!params) params = {};
    this.navCtrl.push(ContactosPage);
  }
  goToInicio(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage);
  }
  logout(){
    this.authServ.logout();
    this.menuCtrl.close();
    this.navCtrl.setRoot(LoginPage,{}, {animate: true, direction: 'back'});
    this.menuCtrl.enable(false);
  }
}
