import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarModule } from 'src/app/user-interface/nav-bar/nav-bar.module';

import { CollectionsComponent } from './collections.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageTitleModule } from 'src/app/common/page-title/page-title.module';
import { of } from 'rxjs';
import { CollectionsService } from './collections.service';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;
  let collectionsServiceMock: any = { getCollections: () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      imports: [
        NavBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        PageTitleModule,
      ],
      providers: [
        { provide: CollectionsService, useValue: collectionsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should set collections data', async () => {
      spyOn(collectionsServiceMock, 'getCollections').and.returnValue(
        of({ data: 'test-response' })
      );
      await component.ngOnInit();
      expect(component.collections).toEqual('test-response');
    });
  });
});
