import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
//import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {

  /*
 @ViewChild('mapp') mapView!: ElementRef;
 mapp!: typeof  CapacitorGoogleMaps;

 async mapaa(){
   await this.ionViewDidEnter();
 }

 
 async ionViewDidEnter() {
     const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
 
     this.mapp = await CapacitorGoogleMaps.create({
       width: Math.round(boundingRect.width),
       height: Math.round(boundingRect.height),
       x: Math.round(boundingRect.x),
       y: Math.round(boundingRect.y),
       latitude: -33.86,
       longitude: 151.20,
       zoom: 12
     });
 
     this.mapp.addListener("onMapReady", async function() {
 
      
 
       CapacitorGoogleMaps.addMarker({
         latitude: -33.86,
         longitude: 151.20,
         title: "Custom Title",
         snippet: "Custom Snippet",
       });
 
       CapacitorGoogleMaps.setMapType({
         "type": "normal"
       })
     })
 }

 
 ionViewDidLeave() {
     CapacitorGoogleMaps.close();
 }*/

  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;


  formData = {
    lugar: '',
    descripcion: '',
    titulo: ''
  };

  ubicacion = {
    latitud: 0,
    longitude: 0
  }


  async obtenerPosicionActual() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacion.latitud = coordinates.coords.latitude;
      this.ubicacion.longitude = coordinates.coords.longitude;
      console.log('Posición actual:', this.ubicacion);
    } catch (error) {
      console.error('Error al obtener la posición:', error);
    }
  }

  guardar() {
    // Aquí puedes usar this.formData.nombre y this.formData.correo para acceder a los datos ingresados
    console.log('Nombre:', this.formData.lugar);
    console.log('Correo:', this.formData.descripcion);
    console.log('Titulo:', this.formData.titulo);
    // Puedes enviar los datos a un servicio, guardar en una base de datos, etc.
  }

  async ubicacionUsuario() {
    await this.obtenerPosicionActual();
    await this.createMap();
  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }



  /*iniciar(){
    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey
     });
  }*/
  constructor(public photoService: PhotoService) {

    /*CapacitorGoogleMaps.initialize({
     key: environment.mapsKey
    });*/
  }

  async ngOnInit() {
    await this.obtenerPosicionActual();
    //await this.ubicacionUsuario();
    await this.photoService.loadSaved();
    //this.iniciar()
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: this.ubicacion.latitud,
          lng: this.ubicacion.longitude,
        },
        zoom: 15,
      },
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
