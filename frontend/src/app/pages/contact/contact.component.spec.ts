import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleComponent } from 'src/app/common/page-title/page-title.component';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { ButtonComponent } from 'src/app/user-interface/button/button.component';
import { TextAreaComponent } from 'src/app/user-interface/text-area/text-area.component';
import { TextInputComponent } from 'src/app/user-interface/text-input/text-input.component';
import { UserInterfaceModule } from 'src/app/user-interface/user-interface.module';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent, PageTitleComponent, TextInputComponent, TextAreaComponent, ButtonComponent ],
      imports: [HttpClientModule, PageTitleModule, UserInterfaceModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
