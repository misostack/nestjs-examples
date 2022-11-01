import 'reflect-metadata';
import {
  Type,
  plainToInstance,
  instanceToPlain,
  Transform,
  Exclude,
  Expose,
} from 'class-transformer';

import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  validate,
  IsNumber,
} from 'class-validator';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

// test
class HelloGroupDto {
  id: number;
  name: string;
}

class HelloDto {
  id: number;
  name: string;
  isPublished: boolean;
  //   @Transform((groups: any) => {
  //     return groups &&
  //       groups.value &&
  //       typeof groups.value === 'object' &&
  //       groups.value[0]
  //       ? groups.value.map((g) => {
  //           return typeof g === 'object' ? g : { id: g };
  //         })
  //       : [];
  //   })
  //@Type(() => HelloGroupDto, {})
  groups: HelloGroupDto[];
  publishedDate: number;
}

const tcHelloDto = {
  id: '1',
  name: 'Hello',
  isPublished: true,
  groups: [{ id: 1 }],
  publishedDate: Date.now(), // milliseconds
};

const tcHelloInstance = plainToInstance(HelloDto, tcHelloDto);
console.log(JSON.stringify(instanceToPlain(tcHelloInstance)));

// expose fields
class Author {
  @Exclude()
  id: string;
  name: string;
  programmingLanguages?: ProgrammingLanguageDto[];
}

class ProgrammingLanguageDto {
  @IsNotEmpty()
  id: string;
  @MaxLength(65)
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @Matches(/\d{4}-\d{2}-\d{2}/)
  @IsNotEmpty()
  publishedYear: string; // YYYY-MM-DD
  @Transform((authorIds) => {
    return authorIds
      ? authorIds.value.map((item) => {
          return typeof item === 'object' ? item : { id: item };
        })
      : [];
  })
  @IsNumber(
    {
      allowInfinity: true,
      allowNaN: true,
    },
    { each: true },
  )
  @IsNotEmpty()
  authors: Author[];
}

// create Author - no programming languages
// create programmingLanguage - attach Author
// update Author programmingLanguage

const programmingLanguagePayload = {
  //   id: '1',
  name: 'C++',
  publishedYear: '1985-01-01',
  authors: [1, '3', Symbol(2)],
};

const programmingLanguage = plainToInstance(
  ProgrammingLanguageDto,
  programmingLanguagePayload,
);

// let's validate programminglanguage
const validatorOptions: ValidatorOptions = {
  skipMissingProperties: false,
};
(async () => {
  const errors = await validate(programmingLanguage, validatorOptions);
  console.log(
    errors.map((e) =>
      JSON.stringify({
        property: e.property,
        c: e.constraints,
      }),
    ),
  );
})();

// const authorIds = programmingLanguage.authors.map((author) => author.id);

// console.log(authorIds);

// console.log(JSON.stringify(instanceToPlain(programmingLanguage)));
