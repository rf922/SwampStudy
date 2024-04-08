/**
 * the purpose of this class is to ensure our objects are instantiated / have all their needed dependencies
 * this class accomplishes that using dependency injection, togethr with a factory instantiating class objects
 */
export class DIContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instances = new Map<string, any>(); // holds instantiated services / componts k = string identifier and v = instances

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static factories = new Map<string, () => any>(); // holds facotry funcs for lzy instantiation of classes, k = string id of serv to be creaed v = factory func to handle creation

  /**
   * registers a factory func for given identifier. The factory function is kept in the
   * factories map which is then used to instantiate the service when needed.
   * @param identifier // name
   * @param factory    // factory func for returning / creating instance
   */
  public static registerFactory<T>(identifier: string, factory: () => T): void {
    DIContainer.factories.set(identifier, factory);
  }

  /**
   * used to register already instantiated service with the instances map
   * @param identifier //name of service
   * @param instance   //instance of service
   */
  public static registerInstance<T>(identifier: string, instance: T): void {
    DIContainer.instances.set(identifier, instance);
  }

  /**
   * retrieves an instances of the given object associated with passed identifier. If
   * neither a instance or factory is found an error is thrown.
   * @param identifier
   * @returns instance //service / object
   */
  public static resolve<T>(identifier: string): T {
    if (DIContainer.instances.has(identifier)) {
      //check if its in the instances map, if it is retrieve it
      return DIContainer.instances.get(identifier) as T;
    }
    if (DIContainer.factories.has(identifier)) {
      //next check if its in the factoris map, if it is
      const factory = DIContainer.factories.get(identifier); //get the factory function used to create an instance
      const instance = factory(); //use the factory to create an instance
      DIContainer.instances.set(identifier, instance); // cache it in the map for later
      return instance as T; // return the instance using generics
    }
    throw new Error(`No instance or factory found for: ${identifier}`);
  }
}
