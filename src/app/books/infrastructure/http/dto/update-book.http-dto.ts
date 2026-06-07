import { CreateBookHttpDto } from "./create-book.http-dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateBookHttpDto extends PartialType(CreateBookHttpDto) {}