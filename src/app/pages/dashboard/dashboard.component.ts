import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../componente/card/card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Vehicle {
  id: number,
  vehicle: string,
  volumetotal: number,
  connected: number,
  softwareUpdates: number,
  img: string
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
  vehicleData: any[] = [];
  searchTerm: string = '';
  dataSearchTerm: string = '';
  carrosList: Vehicles = [];
  apiRes!: ApiVehicle;
  totalvenda!: number;
  connected!: number;
  softwareUpdates!: number;
  vehicleImage: string = '';

  constructor(private apiService: ApiService) {}

  selecionarCarro = new FormGroup({
    lista: new FormControl()
  });

  chamarApiCarro() {
    fetch("http://localhost:3001/vehicles").then(
      async (resp) => {
        const carJson = await resp.json();
        this.carrosList = carJson.vehicles;
      }
    );
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

  onVehicleSelect(vehicle: any): void {
    this.selectedVehicle = vehicle;
  }

  get filteredData(): any[] {
    if (!this.dataSearchTerm) return this.vehicleData;
    return this.vehicleData.filter(item =>
      item.codigo.toLowerCase().includes(this.dataSearchTerm.toLowerCase())
    );
  }
  
}