import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.verificarConexion();
  }

  async verificarConexion() {
    const status = await Network.getStatus();
    console.log('Estado de la conexión:', status);
    this.mostrarAlerta(status.connected);
  }

  async mostrarAlerta(conectado: boolean) {
    const alert = await this.alertController.create({
      header: 'Estado de Conexión',
      message: conectado ? 'Estás conectado a Internet.' : 'No hay conexión a Internet.',
      buttons: ['OK']
    });
    await alert.present();
  }

  irvehiculos() {
    this.router.navigateByUrl("/vehiculos");
  }

  irviajes() {
    this.router.navigateByUrl("/viajes");
  }

  cerrarsesion() {
    this.router.navigateByUrl("/login");
  }

  irPerfilUsuario() {
    this.router.navigate(['/perfilusuario']);
  }
}

