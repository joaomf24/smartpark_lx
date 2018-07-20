import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatriculasService } from "../../services/matriculas.service";
import { MatriculaModel } from "../../models/matricula";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-add-edit-matricula',
  templateUrl: 'add-edit-matricula.html',
})
export class AddEditMatricula implements OnInit {

  mode = '\'ADICIONAR\'';
  mode_text = 'Adicionar';
  matriculaForm: FormGroup;
  matricula_model: MatriculaModel;
  index: number;
  token:string;

  constructor(private navParams: NavParams,    
    private matriculasService: MatriculasService,
    private navCtrl: NavController,
    public translationServ:TranslateService,
    private authServ:AuthService){}

  ngOnInit(){
    this.authServ.getActiveUser().getToken()
    .then(
      (token: string) => {
        this.token = token;
      }
    );
    this.mode = this.navParams.get('mode');
    if(this.mode == '\'EDITAR\''){
      this.mode_text = 'Editar';
      this.matricula_model = this.navParams.get('matricula_model');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  ionViewWillEnter(){        
    if(this.mode == '\'ADICIONAR\'')
      this.mode_text = this.translationServ.currentLang == 'pt' ? 'Adicionar':'Add';
    else this.mode_text = this.translationServ.currentLang == 'pt'?'Editar':'Edit';    

  }

  onSubmit(){
    const value = this.matriculaForm.value;
    
    if(this.mode == '\'EDITAR\''){
      this.matriculasService.changeItem(this.index, value.matricula, value.descricao, this.token);
    }
    else{
      this.matriculasService.addItem(value.matricula, value.descricao, this.token);
    }
    
    this.matriculaForm.reset();
    this.navCtrl.pop();
  }

  private initializeForm(){
    let matricula = null;
    let descricao = null;    

    if(this.mode == '\'EDITAR\''){
      matricula = this.matricula_model.matricula;
      descricao = this.matricula_model.descricao;      
    }

    this.matriculaForm = new FormGroup({
      'matricula': new FormControl(matricula, Validators.required),
      'descricao': new FormControl(descricao)
      
    });
  }

}