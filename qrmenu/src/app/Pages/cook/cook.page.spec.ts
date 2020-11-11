import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CookPage } from './cook.page';

describe('CookPage', () => {
  let component: CookPage;
  let fixture: ComponentFixture<CookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
