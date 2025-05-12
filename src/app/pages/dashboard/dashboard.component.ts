import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../componente/card/card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Vehicle {
  id: number,
  vehicle: string,
  volumetotal: number,
  connected: number,
  softwareUpdates: number,
  img: string
}

interface VehicleData {
  id: number,
  odometro: number,
  nivelCombustivel: number,
  status: string,
  lat: number,
  long: number
}

interface Vehicles extends Array<Vehicle> {}
interface ApiVehicle {
  vehicles: Vehicles
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = [];
  selectedVehicle: any = null;
  vehicleData: VehicleData | null = null;
  searchTerm: string = '';
  dataSearchTerm: string = '';
  carrosList: Vehicles = [];
  apiRes!: ApiVehicle;
  totalvenda!: number;
  connected!: number;
  softwareUpdates!: number;
  vehicleImage: string = '';
  vinCode: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  selecionarCarro = new FormGroup({
    lista: new FormControl()
  });

  buscarVeiculo = new FormGroup({
    vin: new FormControl('')
  });

  chamarApiCarro() {
    fetch("http://localhost:3001/vehicles").then(
      async (resp) => {
        const carJson = await resp.json();
        this.carrosList = carJson.vehicles;
      }
    );
  }

  retornarHome() {
    this.router.navigate(['/home']);
  }
   logout() {
    this.router.navigate(['/login']);
  }

  buscarPorVin() {
    const vin = this.buscarVeiculo.get('vin')?.value;
    if (!vin) return;

    this.isLoading = true;
    this.errorMessage = '';
    
    fetch("http://localhost:3001/vehicleData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vin })
    })
    .then(async (resp) => {
      if (!resp.ok) {
        const error = await resp.json();
        throw new Error(error.message || 'Erro ao buscar dados do veículo');
      }
      return resp.json();
    })
    .then(data => {
      this.vehicleData = data;
      this.isLoading = false;
    })
    .catch(error => {
      this.errorMessage = error.message;
      this.vehicleData = null;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.chamarApiCarro();

    this.selecionarCarro.get('lista')?.valueChanges.subscribe((idSelecionado) => {
      const veiculoSelecionado = this.carrosList.find(c => c.id == idSelecionado);
      if (veiculoSelecionado) {
        this.selectedVehicle = veiculoSelecionado;
        this.totalvenda = veiculoSelecionado.volumetotal;
        this.connected = veiculoSelecionado.connected;
        this.softwareUpdates = veiculoSelecionado.softwareUpdates;
        this.vehicleImage = veiculoSelecionado.img;
      }
    });
  }
}