import { Component } from '@angular/core';
import { Proposta } from '../../proposta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropostaService } from '../../services/proposta/proposta.service';
import { vendedores } from '../../vendedores';
import { escopos } from '../../escopo';
import { status } from '../../status';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent {

  proposta : Proposta[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  PropostaService: any;
  submitted: boolean = false;
  vendedores = vendedores;
  escopos = escopos;
  status = status;

  constructor (private propostaService : PropostaService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      empresa : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      type : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      date : ['', Validators.required],
      valor : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      status : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      vendedor : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      comentario : ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]]
    });
  }

  ngOnInit(): void {
    this.loadProposta();
  }

  loadProposta() {
    this.propostaService.getProposta().subscribe(
      {
        next : data => this.proposta = data
      }
      );
  }

  save(){
    this.submitted = true;

    if(this.isEditing)
    {
      this.propostaService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadProposta();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
            this.setEscolhaUmVendedor();
            this.setEscolhaUmTipo();
            this.setEscolhaUmStatus();
          }
        }
      )
    }
    else{
      this.propostaService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.proposta.push(data);
            this.formGroupClient.reset();
            this.submitted = false;
            this.setEscolhaUmVendedor();
            this.setEscolhaUmTipo();
            this.setEscolhaUmStatus();
          }
        }
        );
    }
 }
  setEscolhaUmTipo() {
    const escopoControl = this.formGroupClient.get('type');
    if (escopoControl) {
        escopoControl.setValue('');
    }
  }

  setEscolhaUmVendedor(){
    const vendedorControl = this.formGroupClient.get('vendedor');
    if(vendedorControl){
      vendedorControl.setValue('');
    }
  }

  setEscolhaUmStatus(){
    const statusControl = this.formGroupClient.get('status');
    if(statusControl){
      statusControl.setValue('');
    }
  }
  

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
    this.setEscolhaUmVendedor();
    this.setEscolhaUmTipo();
    this.setEscolhaUmStatus();
  }

  edit(proposta : Proposta){
    this.formGroupClient.setValue(proposta);
    this.isEditing = true;
  }

  delete(proposta : Proposta){
    this.propostaService.delete(proposta).subscribe({
      next: () => this.loadProposta()
    })
  }

  

}