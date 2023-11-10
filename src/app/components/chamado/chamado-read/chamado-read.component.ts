import { ChamadoService } from './../../../services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Page } from 'src/app/models/page';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ){}

  findById(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.chamado.status = resposta.status.toString();
      this.chamado.prioridade = resposta.prioridade.toString();
      this.chamado.tecnico = resposta.tecnico.toString();
      this.chamado.cliente = resposta.cliente.toString();
    }, ex => {
      this.toast.error(ex.error.message);
    });
  }
 
  findAllClientes(page?: number, size?: number): void {
    this.clienteService.findAll(page, size).subscribe((resposta: Page<Cliente>) => {
      this.clientes = resposta.content;
    });
  }

  findAllTecnicos(page?: number, size?: number): void {
    this.tecnicoService.findAll(page, size).subscribe((resposta: Page<Tecnico>) => {
      this.tecnicos = resposta.content;
    });
  }
}
