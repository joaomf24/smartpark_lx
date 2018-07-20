import {LatLngLiteral} from 'angular2-google-maps/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { AlertController, Animation } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})

export class DirectionsMapDirective {
  @Input() origin;
  @Input() destination;
  directionsDisplay:any;
  directionsService:any;
  start_marker:any;
  end_marker:any;
  
  icons = {
    start: new google.maps.MarkerImage(
    // URL
    'assets/img/pin.png',
    // (width,height)
    new google.maps.Size(0, 0),
    // The origin point (x,y)
    new google.maps.Point(0, 0),
    // The anchor point (x,y)
    new google.maps.Point(0, 0)),
    end: new google.maps.MarkerImage(
    // URL
    'assets/img/finish.png',
    // (width,height)
    new google.maps.Size(40, 40),
    // The origin point (x,y)
    new google.maps.Point(0, 0),
    // The anchor point (x,y)
    new google.maps.Point(5, 40))
};
  constructor (private gmapsApi: GoogleMapsAPIWrapper, 
    private alertCtrl: AlertController, private translate: TranslateService) {}
  ngOnInit(){
    console.log("directions init");
    
    
    this.gmapsApi.getNativeMap().then(map => {
              
              this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
              this.directionsService = new google.maps.DirectionsService;
              var  directionsRenderer = this.directionsDisplay;
              var directionsService = this.directionsService;
              var error_title = this.translate.currentLang == 'pt'? "Erro" : "Error";
              var error_message = this.translate.currentLang == 'pt'? 'Não foi possível apresentar o trajeto até ao seu destino.\nPressione o botão em baixo para redireccioná-lo até à aplicação \'Google Maps\'.':
                    'Couldn\'t show the directions to your destination.\nPress the button below to redirect you to the \'Google Maps\' application.'
              var end_marker;
              directionsService.route({
                  origin: {lat: this.origin.lat, lng: this.origin.lng},
                  destination: {lat: this.destination.lat, lng: this.destination.lng},
                  waypoints: [],
                  optimizeWaypoints: true,
                  travelMode: 'DRIVING'
                }, function(response, status) {
                      if (status === 'OK') {
                        directionsRenderer.setDirections(response);                                 
                      } else {
                        if(this.navigator.notification != undefined)                              
                          this.navigator.notification.alert(error_message, null,error_title , "OK");                                 
                      }                               
                            
              });
                            
              this.start_marker = new google.maps.Marker({
                position: {lat: this.origin.lat, lng: this.origin.lng}, 
                icon: this.icons.start, 
                title:"", 
                map: map});

              this.end_marker = new google.maps.Marker({
                position: {lat: this.destination.lat, lng: this.destination.lng}, 
                icon: this.icons.end, 
                title:"",
                animation: google.maps.Animation.DROP,
                zIndex:99999999,
                optimized: false,
                map: map});
              
              this.directionsDisplay.setMap(map);
              
    });
  }

  ngOnDestroy() {    
    this.end_marker.setIcon(this.icons.start);
    this.directionsDisplay.setMap(null);
    this.directionsDisplay = null;
  }

}