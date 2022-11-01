import { plainToInstance, instanceToPlain } from 'class-transformer';
import { ExampleCreateDto } from '../dtos/example/example-create.dto';
import { describe, it, expect } from '@jest/globals';

const testCases = {
  plainToInstance: {
    emptyObject: {
      input: {},
      instanceClass: ExampleCreateDto,
      expectedOutput: new ExampleCreateDto(),
    },
    partialObject: {
      input: { id: 1, notExisted: false },
      instanceClass: ExampleCreateDto,
      expectedOutput: new ExampleCreateDto({ id: 1 } as any),
    },
  },
};

const transformToJSON = (instance) => {
  return instanceToPlain(instance, { strategy: 'exposeAll' });
};
const transformToInstance = (instanceClass, plain) => {
  return plainToInstance(instanceClass, plain, {
    // strategy: 'exposeAll',
    // excludeExtraneousValues: true,
    // enableImplicitConversion: true,
  });
};

// beforeAll(() => {

// });

describe('plainToInstance', () => {
  describe('should transforms a plain javascript object to instance of specific class', () => {
    it('should work with empty object', () => {
      const tc = testCases.plainToInstance.emptyObject;
      const output = transformToInstance(tc.instanceClass, tc.input);

      expect(output).toBeInstanceOf(tc.instanceClass);
      expect(transformToJSON(output)).toEqual(
        transformToJSON(tc.expectedOutput),
      );
    });
    it('should work with partial object', () => {
      const tc = testCases.plainToInstance.partialObject;
      const output = transformToInstance(tc.instanceClass, tc.input);
      expect(output).toBeInstanceOf(tc.instanceClass);
      expect(transformToJSON(output)).toEqual(
        expect.objectContaining(transformToJSON(tc.expectedOutput)),
      );
    });
  });
});
