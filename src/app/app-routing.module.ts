import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const RedireccionarLogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirige a la página de login por defecto
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./inicio/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./inicio/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'restcontrasena',
    loadChildren: () => import('./inicio/restcontrasena/restcontrasena.module').then( m => m.RestcontrasenaPageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./inicio/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./paginas/vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./paginas/viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'inicio', 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: RedireccionarLogin },       
    loadChildren: () => import('./inicio/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'error404',
    loadChildren: () => import('./error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: '**', 
    redirectTo: 'error404'  // Ruta comodín para manejar páginas no encontradas
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
