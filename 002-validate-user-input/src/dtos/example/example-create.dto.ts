import { ExampleType } from './example-enums';
// class validator

export class ExampleCreateDto {
  constructor(payload: Partial<ExampleCreateDto> | null = null) {
    if (payload) {
      Object.assign(this, payload);
    }
  }
  id: string;
  title: string;
  description: string;
  groupIds: string[];
  isVisible: boolean;
  type: ExampleType;
}
