import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditMatricula } from './add-edit-matricula';

@NgModule({
  declarations: [
    AddEditMatricula,
  ],
  imports: [
    IonicPageModule.forChild(AddEditMatricula),
  ],
  exports: [
    AddEditMatricula
  ]
})
export class AddEditMatriculaModule {}
