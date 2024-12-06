import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculosPage } from './vehiculos.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('VehiculosPage', () => {
  let component: VehiculosPage;
  let fixture: ComponentFixture<VehiculosPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculosPage],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy('navigateByUrl')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar vehículos desde localStorage en ngOnInit', () => {
    const mockVehiculos = ['Ford Mustang', 'Chevrolet Camaro'];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockVehiculos));

    component.ngOnInit();

    expect(component.vehiculos).toEqual(mockVehiculos);
  });

  it('debería agregar un nuevo vehículo', () => {
    component.nuevoVehiculo = 'Honda Civic';
    component.agregarVehiculo();

    expect(component.vehiculos).toContain('Honda Civic');
    expect(component.nuevoVehiculo).toBe('');
    expect(localStorage.setItem).toHaveBeenCalledWith('vehiculos', JSON.stringify(component.vehiculos));
  });

  it('no debería agregar un vehículo vacío', () => {
    component.nuevoVehiculo = '';
    component.agregarVehiculo();

    expect(component.vehiculos.length).toBe(3); // Asegúrate de que la longitud inicial sea 3
  });

  it('debería navegar al inicio', () => {
    component.irlogin();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio');
  });
});
