import {AgmCoreModule} from 'angular2-google-maps/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { ProcurarZonasPage } from '../pages/procurar-zonas/procurar-zonas';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { InformacoesPage } from '../pages/informacoes/informacoes';
import { HistoricoPage } from '../pages/historico/historico';
import { ContactosPage } from '../pages/contactos/contactos';
import { DefinicoesPage } from '../pages/definicoes/definicoes';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { Zona1Page } from '../pages/zona1/zona1';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { Storage } from '@ionic/storage';
import { FavoritosService } from "../services/favoritos.service";
import { MatriculasPage } from "../pages/matriculas/matriculas";
import { Network } from '@ionic-native/network';
import { NetworkService } from "../services/network.service";
import { MatriculasService } from "../services/matriculas.service";
import { DirectionsMapDirective } from "../directives/mapdirections.directive";
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { AddEditMatricula } from "../pages/add-edit-matricula/add-edit-matricula";
import { HistoricoService } from "../services/historico.service";
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DefinicoesService } from "../services/definicoes.service";
import { Signup } from "../pages/signup/signup";
import { PerfilService } from "../services/perfil.service";
import { DatePipe } from "@angular/common";
import { DataBaseService } from "../services/database.service";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
import { Keyboard } from '@ionic-native/keyboard';

export const firebaseConfig = { //get this from your firebase console
apiKey: "",
authDomain: "",
databaseURL: "",
projectId: "",
storageBucket: "",
messagingSenderId: ""
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavoritosPage,
    ProcurarZonasPage,
    TabsControllerPage,
    InformacoesPage,
    HistoricoPage,
    ContactosPage,
    DefinicoesPage,
    PerfilPage,
    MatriculasPage,
    LoginPage,
    Zona1Page,
    Signup,
    DirectionsMapDirective,
    AddEditMatricula
  ],
  imports: [
    BrowserModule,    
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: '', // your Google Maps API key
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FavoritosPage,
    ProcurarZonasPage,
    TabsControllerPage,
    InformacoesPage,
    HistoricoPage,
    ContactosPage,
    DefinicoesPage,
    PerfilPage,
    MatriculasPage,
    LoginPage,
    Zona1Page,
    Signup,
    AddEditMatricula
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LaunchNavigator,
    FavoritosService,
    NetworkService,
    MatriculasService,
    HistoricoService,
    DefinicoesService,
    PerfilService,
    DataBaseService,
    AuthService,
    UtilsService,
    GoogleMapsAPIWrapper,
    Storage,
    File,
    Camera,
    Keyboard,
    AngularFireDatabase,
    Network,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}