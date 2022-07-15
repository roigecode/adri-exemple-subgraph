import { BigInt } from "@graphprotocol/graph-ts"
import { Exemple, ValueAdded } from "../generated/Exemple/Exemple"
import { User} from "../generated/schema"

export function handleValueAdded(event: ValueAdded): void {

  let entity = User.load(event.transaction.from.toHex())

  if (!entity) {
    entity = new User(event.transaction.from.toHex())
  }
  
  // Entity fields can be set based on event parameters
  entity.value = event.params.value
  entity.addr = event.params.addr

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.addr(...)
  // - contract.getData(...)
  // - contract.value(...)
}
