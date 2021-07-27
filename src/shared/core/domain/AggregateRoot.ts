import {UniqueEntityID} from "./UniqueEntityID";
import { Entity } from "./Entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  get id(): UniqueEntityID {
    return this.id;
  }

}
