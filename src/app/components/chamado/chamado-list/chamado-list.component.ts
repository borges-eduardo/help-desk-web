import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { Page } from 'src/app/models/page';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(page?: number, size?: number) {
    this.chamadoService.findAll(page, size).subscribe((resposta: Page<Chamado>) => {
      this.ELEMENT_DATA = resposta.content; 
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if(status == 0) {
      return 'ABERTO';
    } else if (status == 1) {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == 0) {
      return 'BAIXA';
    } else if (prioridade == 1) {
      return 'MÉDIA';
    } else {
      return 'ALTA'
    }
  }

  ordenarPorStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
