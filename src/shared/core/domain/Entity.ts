import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

/**
 *  Entity<T> is an abstract class. This means that we can't instantiate it
 *  directly. We can, however, subclass it. That's a logical design decision. An
 *  entity only makes sense to exist if it has a particular type to it like Car
 *  extends Entity<ICarProps>.
 */
export abstract class Entity<T> {

  // id shouldnt be changed once Entity is instantiated
  protected readonly _id: any;

  public readonly props: T;

  constructor(props: T, id?: any) {
    // if we don't receive an id, create one. This allows Creation + Reconstitution events
    // in the Entity lifecycle
    this._id = id ? id : new UniqueEntityID();;

    // leave the decision to the subclass on which properties
    // getters and setters should be defined
    this.props = props
  }

  // is this Entity referrentially equivalent to another entity?
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    // if this Entity is not referrentially equivalent to another Entity,
    // then we compare both Entity's ids.
    return this._id.equals(object._id)
  }
}

