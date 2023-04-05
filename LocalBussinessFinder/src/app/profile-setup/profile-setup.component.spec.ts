import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileSetupComponent } from './profile-setup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('ProfileSetupComponent', () => {
  let component: ProfileSetupComponent;
  let fixture: ComponentFixture<ProfileSetupComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  beforeEach(async () => {
    TestBed.configureTestingModule ({
      imports: [
        MatGridListModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgMultiSelectDropDownModule
      ],
      declarations: [
        ProfileSetupComponent
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSetupComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    debugElement = fixture.debugElement.query(By.css('p'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display default business name', () => {
    expect(htmlElement.textContent).toEqual("Company name is: ");
    //what happens when you write something (should update every time a character is pressed)
  })
  //This next test adds an png file to the buisnessImages as checks to see if it was added
  //This implicitly shows that changing the file to a url and file type object also works
  it('should detect file insertion', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))
    const input = fixture.debugElement.query(By.css('input[type=file]'));
    input.nativeElement.files = dataTransfer.files;

    input.nativeElement.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();
    expect(component.buisness.buisnessImages.length).toBeGreaterThan(0);
    
  })
  //Next step to test this function is to check if it can surpass 8 images (the limit I set)
  it('should not surpass 8 files', () => {
    for (let index = 0; index < 10; index++) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File([''], 'test-file.pdf'))
      const input = fixture.debugElement.query(By.css('input[type=file]'));
      input.nativeElement.files = dataTransfer.files;

      input.nativeElement.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
    }
    //for loop adds 9 items to the buisness Images, the limit is 8 therefore size should stop at 8!
    expect(component.buisness.buisnessImages.length).toBe(8);
  })
  //checking deleting/ remove image function
  it('should remove a file from the images array', () => {
    for (let index = 0; index < 10; index++) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File([''], 'test-file.pdf'))
      const input = fixture.debugElement.query(By.css('input[type=file]'));
      input.nativeElement.files = dataTransfer.files;

      input.nativeElement.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
    }
    let index2 = 3;
    component.removeImage(index2);
    expect(component.buisness.buisnessImages.length).toBe(7);
  })
  //checking adding an image after removal 
  it('should remove and add correctly', () => {
    for (let index = 0; index < 10; index++) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File([''], 'test-file.pdf'))
      const input = fixture.debugElement.query(By.css('input[type=file]'));
      input.nativeElement.files = dataTransfer.files;

      input.nativeElement.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
    }
    expect(component.buisness.buisnessImages.length).toBe(8);
    let index2 = 3;
    component.removeImage(index2);
    expect(component.buisness.buisnessImages.length).toBe(7);
    //adding new file
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file1.pdf'))
    const input2 = fixture.debugElement.query(By.css('input[type=file]'));
    input2.nativeElement.files = dataTransfer.files;

    input2.nativeElement.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();
    expect(component.buisness.buisnessImages.length).toBe(8);
    //expect(component.buisness.buisnessImages[8].file.toString()).toBe('test-file1.pdf');
  })
  //this should add the string of the selcted tag to the array!
  it('should add tag correctly', () => {
    const input = { item_id: 1, item_text: 'Food' };
    component.onTagSelect(input);
    expect(component.buisness.buisnessTags).toContain(input.item_text);
    //should be incorrect
  })
  it('should add 5 and remove one tag correctly', () => {
    const input1 = { item_id: 1, item_text: 'Food1' };
    component.onTagSelect(input1);
    const input2 = { item_id: 2, item_text: 'Food2' };
    component.onTagSelect(input2);
    const input3 = { item_id: 3, item_text: 'Food3' };
    component.onTagSelect(input3);
    const input4 = { item_id: 4, item_text: 'Food4' };
    component.onTagSelect(input4);
    const input5 = { item_id: 5, item_text: 'Food5' };
    component.onTagSelect(input5);

    expect(component.buisness.buisnessTags.length).toBe(5);

    component.onTagDeSelect(input4);
    //check if it contains food4
    expect(component.buisness.buisnessTags).not.toContain('Food4');
    expect(component.buisness.buisnessTags.length).toBe(4);
    
  })
});
