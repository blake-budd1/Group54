import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should detect when form submitted'), () => {
    //checking user submit fn
    component.user.username = "TestUserName";
    component.user.password = "TestPassword";
    component.user.email = "TestEmail";
    component.user.confirmPassword = "TestPassword";
    component.onSubmit(false);
    //check if submitted -> not working immediately because the fn includes a backend send request
    expect((component.submitted) == (true));
  }
});
