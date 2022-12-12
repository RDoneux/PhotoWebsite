import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputModule } from './text-input/text-input.module';
import { TextAreaModule } from './text-area/text-area.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [TextInputModule, TextAreaModule, ButtonModule],
})
export class UserInterfaceModule {}
