import {FormGroup} from "@angular/forms";

export class DateRangeValidator {
  static dateRangeValidator(startDateFieldName: string, endDateFieldName: string) {
    return async (formGroup: FormGroup) => {
      const controls = formGroup.controls;
      const startDate = controls[startDateFieldName];
      const endDate = controls[endDateFieldName];
      if (endDate.errors) {
        return;
      }
      endDate.setErrors(startDate.value > endDate.value ? { invalidEndDate: true } : null);
    };
  }
}
