import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ButtonModule } from 'src/app/user-interface/button/button.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ModalComponent],
})
export class ModalModule {}
