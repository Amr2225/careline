
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Module
 * 
 */
export type Module = $Result.DefaultSelection<Prisma.$ModulePayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Action: {
  READ: 'READ',
  WRITE: 'WRITE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export type Action = (typeof Action)[keyof typeof Action]

}

export type Action = $Enums.Action

export const Action: typeof $Enums.Action

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.module`: Exposes CRUD operations for the **Module** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modules
    * const modules = await prisma.module.findMany()
    * ```
    */
  get module(): Prisma.ModuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql


  /**
   * Prisma.skip
   */
  export import skip = runtime.skip


  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    Module: 'Module',
    Role: 'Role',
    RolePermission: 'RolePermission',
    UserRole: 'UserRole'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "module" | "role" | "rolePermission" | "userRole"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Module: {
        payload: Prisma.$ModulePayload<ExtArgs>
        fields: Prisma.ModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findFirst: {
            args: Prisma.ModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findMany: {
            args: Prisma.ModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          create: {
            args: Prisma.ModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          createMany: {
            args: Prisma.ModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          delete: {
            args: Prisma.ModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          update: {
            args: Prisma.ModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          deleteMany: {
            args: Prisma.ModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          upsert: {
            args: Prisma.ModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          aggregate: {
            args: Prisma.ModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModule>
          }
          groupBy: {
            args: Prisma.ModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuleCountArgs<ExtArgs>
            result: $Utils.Optional<ModuleCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    module?: ModuleOmit
    role?: RoleOmit
    rolePermission?: RolePermissionOmit
    userRole?: UserRoleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    userRoles: number
    assignedRoles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    userRoles?: boolean | UserCountOutputTypeCountUserRolesArgs
    assignedRoles?: boolean | UserCountOutputTypeCountAssignedRolesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput | $Types.Skip
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput | $Types.Skip
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput | $Types.Skip
  }


  /**
   * Count Type ModuleCountOutputType
   */

  export type ModuleCountOutputType = {
    permissions: number
  }

  export type ModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | ModuleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleCountOutputType
     */
    select?: ModuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput | $Types.Skip
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    permissions: number
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput | $Types.Skip
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput | $Types.Skip
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    isActive: boolean | null
    isBootstrapAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    isActive: boolean | null
    isBootstrapAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    isActive: number
    isBootstrapAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true | $Types.Skip
    email?: true | $Types.Skip
    passwordHash?: true | $Types.Skip
    name?: true | $Types.Skip
    isActive?: true | $Types.Skip
    isBootstrapAdmin?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
  }

  export type UserMaxAggregateInputType = {
    id?: true | $Types.Skip
    email?: true | $Types.Skip
    passwordHash?: true | $Types.Skip
    name?: true | $Types.Skip
    isActive?: true | $Types.Skip
    isBootstrapAdmin?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
  }

  export type UserCountAggregateInputType = {
    id?: true | $Types.Skip
    email?: true | $Types.Skip
    passwordHash?: true | $Types.Skip
    name?: true | $Types.Skip
    isActive?: true | $Types.Skip
    isBootstrapAdmin?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput | $Types.Skip
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[] | $Types.Skip
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    isActive: boolean
    isBootstrapAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    email?: boolean | $Types.Skip
    passwordHash?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs> | $Types.Skip
    userRoles?: boolean | User$userRolesArgs<ExtArgs> | $Types.Skip
    assignedRoles?: boolean | User$assignedRolesArgs<ExtArgs> | $Types.Skip
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    email?: boolean | $Types.Skip
    passwordHash?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    email?: boolean | $Types.Skip
    passwordHash?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean | $Types.Skip
    email?: boolean | $Types.Skip
    passwordHash?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "isActive" | "isBootstrapAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"], $Types.Skip>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs> | $Types.Skip
    userRoles?: boolean | User$userRolesArgs<ExtArgs> | $Types.Skip
    assignedRoles?: boolean | User$assignedRolesArgs<ExtArgs> | $Types.Skip
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolePayload<ExtArgs>[]
      assignedRoles: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      isActive: boolean
      isBootstrapAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends User$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, User$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedRoles<T extends User$assignedRolesArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isBootstrapAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * Limit how many Users to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * Limit how many Users to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput | $Types.Skip
    /**
     * Limit how many Users to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput | $Types.Skip
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[] | $Types.Skip
    cursor?: RefreshTokenWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User.userRoles
   */
  export type User$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput | $Types.Skip
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User.assignedRoles
   */
  export type User$assignedRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput | $Types.Skip
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    userId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    userAgent: string | null
    ipAddress: string | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    userId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    userAgent: string | null
    ipAddress: string | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    tokenHash: number
    userId: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    userAgent: number
    ipAddress: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true | $Types.Skip
    tokenHash?: true | $Types.Skip
    userId?: true | $Types.Skip
    expiresAt?: true | $Types.Skip
    revokedAt?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    userAgent?: true | $Types.Skip
    ipAddress?: true | $Types.Skip
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true | $Types.Skip
    tokenHash?: true | $Types.Skip
    userId?: true | $Types.Skip
    expiresAt?: true | $Types.Skip
    revokedAt?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    userAgent?: true | $Types.Skip
    ipAddress?: true | $Types.Skip
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true | $Types.Skip
    tokenHash?: true | $Types.Skip
    userId?: true | $Types.Skip
    expiresAt?: true | $Types.Skip
    revokedAt?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    userAgent?: true | $Types.Skip
    ipAddress?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput | $Types.Skip
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[] | $Types.Skip
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    tokenHash: string
    userId: string
    expiresAt: Date
    revokedAt: Date | null
    createdAt: Date
    userAgent: string | null
    ipAddress: string | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    tokenHash?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    expiresAt?: boolean | $Types.Skip
    revokedAt?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    userAgent?: boolean | $Types.Skip
    ipAddress?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    tokenHash?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    expiresAt?: boolean | $Types.Skip
    revokedAt?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    userAgent?: boolean | $Types.Skip
    ipAddress?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    tokenHash?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    expiresAt?: boolean | $Types.Skip
    revokedAt?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    userAgent?: boolean | $Types.Skip
    ipAddress?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean | $Types.Skip
    tokenHash?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    expiresAt?: boolean | $Types.Skip
    revokedAt?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    userAgent?: boolean | $Types.Skip
    ipAddress?: boolean | $Types.Skip
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenHash" | "userId" | "expiresAt" | "revokedAt" | "createdAt" | "userAgent" | "ipAddress", ExtArgs["result"]["refreshToken"], $Types.Skip>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenHash: string
      userId: string
      expiresAt: Date
      revokedAt: Date | null
      createdAt: Date
      userAgent: string | null
      ipAddress: string | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly userAgent: FieldRef<"RefreshToken", 'String'>
    readonly ipAddress: FieldRef<"RefreshToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput | $Types.Skip
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Module
   */

  export type AggregateModule = {
    _count: ModuleCountAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  export type ModuleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ModuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ModuleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    _all: number
  }


  export type ModuleMinAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    createdAt?: true | $Types.Skip
  }

  export type ModuleMaxAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    createdAt?: true | $Types.Skip
  }

  export type ModuleCountAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type ModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Module to aggregate.
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modules
    **/
    _count?: true | ModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleMaxAggregateInputType
  }

  export type GetModuleAggregateType<T extends ModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModule[P]>
      : GetScalarType<T[P], AggregateModule[P]>
  }




  export type ModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleWhereInput | $Types.Skip
    orderBy?: ModuleOrderByWithAggregationInput | ModuleOrderByWithAggregationInput[] | $Types.Skip
    by: ModuleScalarFieldEnum[] | ModuleScalarFieldEnum
    having?: ModuleScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: ModuleCountAggregateInputType | true
    _min?: ModuleMinAggregateInputType
    _max?: ModuleMaxAggregateInputType
  }

  export type ModuleGroupByOutputType = {
    id: string
    name: string
    description: string
    createdAt: Date
    _count: ModuleCountAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  type GetModuleGroupByPayload<T extends ModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleGroupByOutputType[P]>
        }
      >
    >


  export type ModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    permissions?: boolean | Module$permissionsArgs<ExtArgs> | $Types.Skip
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectScalar = {
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
  }

  export type ModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt", ExtArgs["result"]["module"], $Types.Skip>
  export type ModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | Module$permissionsArgs<ExtArgs> | $Types.Skip
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type ModuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ModuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Module"
    objects: {
      permissions: Prisma.$RolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      createdAt: Date
    }, ExtArgs["result"]["module"]>
    composites: {}
  }

  type ModuleGetPayload<S extends boolean | null | undefined | ModuleDefaultArgs> = $Result.GetResult<Prisma.$ModulePayload, S>

  type ModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModuleCountAggregateInputType | true
    }

  export interface ModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Module'], meta: { name: 'Module' } }
    /**
     * Find zero or one Module that matches the filter.
     * @param {ModuleFindUniqueArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModuleFindUniqueArgs>(args: SelectSubset<T, ModuleFindUniqueArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Module that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModuleFindUniqueOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Module that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModuleFindFirstArgs>(args?: SelectSubset<T, ModuleFindFirstArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Module that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Modules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modules
     * const modules = await prisma.module.findMany()
     * 
     * // Get first 10 Modules
     * const modules = await prisma.module.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduleWithIdOnly = await prisma.module.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModuleFindManyArgs>(args?: SelectSubset<T, ModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Module.
     * @param {ModuleCreateArgs} args - Arguments to create a Module.
     * @example
     * // Create one Module
     * const Module = await prisma.module.create({
     *   data: {
     *     // ... data to create a Module
     *   }
     * })
     * 
     */
    create<T extends ModuleCreateArgs>(args: SelectSubset<T, ModuleCreateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Modules.
     * @param {ModuleCreateManyArgs} args - Arguments to create many Modules.
     * @example
     * // Create many Modules
     * const module = await prisma.module.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModuleCreateManyArgs>(args?: SelectSubset<T, ModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Modules and returns the data saved in the database.
     * @param {ModuleCreateManyAndReturnArgs} args - Arguments to create many Modules.
     * @example
     * // Create many Modules
     * const module = await prisma.module.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Modules and only return the `id`
     * const moduleWithIdOnly = await prisma.module.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Module.
     * @param {ModuleDeleteArgs} args - Arguments to delete one Module.
     * @example
     * // Delete one Module
     * const Module = await prisma.module.delete({
     *   where: {
     *     // ... filter to delete one Module
     *   }
     * })
     * 
     */
    delete<T extends ModuleDeleteArgs>(args: SelectSubset<T, ModuleDeleteArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Module.
     * @param {ModuleUpdateArgs} args - Arguments to update one Module.
     * @example
     * // Update one Module
     * const module = await prisma.module.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModuleUpdateArgs>(args: SelectSubset<T, ModuleUpdateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Modules.
     * @param {ModuleDeleteManyArgs} args - Arguments to filter Modules to delete.
     * @example
     * // Delete a few Modules
     * const { count } = await prisma.module.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModuleDeleteManyArgs>(args?: SelectSubset<T, ModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modules
     * const module = await prisma.module.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModuleUpdateManyArgs>(args: SelectSubset<T, ModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modules and returns the data updated in the database.
     * @param {ModuleUpdateManyAndReturnArgs} args - Arguments to update many Modules.
     * @example
     * // Update many Modules
     * const module = await prisma.module.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Modules and only return the `id`
     * const moduleWithIdOnly = await prisma.module.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Module.
     * @param {ModuleUpsertArgs} args - Arguments to update or create a Module.
     * @example
     * // Update or create a Module
     * const module = await prisma.module.upsert({
     *   create: {
     *     // ... data to create a Module
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Module we want to update
     *   }
     * })
     */
    upsert<T extends ModuleUpsertArgs>(args: SelectSubset<T, ModuleUpsertArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleCountArgs} args - Arguments to filter Modules to count.
     * @example
     * // Count the number of Modules
     * const count = await prisma.module.count({
     *   where: {
     *     // ... the filter for the Modules we want to count
     *   }
     * })
    **/
    count<T extends ModuleCountArgs>(
      args?: Subset<T, ModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleAggregateArgs>(args: Subset<T, ModuleAggregateArgs>): Prisma.PrismaPromise<GetModuleAggregateType<T>>

    /**
     * Group by Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleGroupByArgs['orderBy'] }
        : { orderBy?: ModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Module model
   */
  readonly fields: ModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Module.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends Module$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Module$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Module model
   */
  interface ModuleFieldRefs {
    readonly id: FieldRef<"Module", 'String'>
    readonly name: FieldRef<"Module", 'String'>
    readonly description: FieldRef<"Module", 'String'>
    readonly createdAt: FieldRef<"Module", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Module findUnique
   */
  export type ModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module findUniqueOrThrow
   */
  export type ModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module findFirst
   */
  export type ModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Module findFirstOrThrow
   */
  export type ModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Module findMany
   */
  export type ModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Modules to fetch.
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modules.
     */
    cursor?: ModuleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Module create
   */
  export type ModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a Module.
     */
    data: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
  }

  /**
   * Module createMany
   */
  export type ModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modules.
     */
    data: ModuleCreateManyInput | ModuleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * Module createManyAndReturn
   */
  export type ModuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * The data used to create many Modules.
     */
    data: ModuleCreateManyInput | ModuleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * Module update
   */
  export type ModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a Module.
     */
    data: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
    /**
     * Choose, which Module to update.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module updateMany
   */
  export type ModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modules.
     */
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>
    /**
     * Filter which Modules to update
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * Limit how many Modules to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Module updateManyAndReturn
   */
  export type ModuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * The data used to update Modules.
     */
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>
    /**
     * Filter which Modules to update
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * Limit how many Modules to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Module upsert
   */
  export type ModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the Module to update in case it exists.
     */
    where: ModuleWhereUniqueInput
    /**
     * In case the Module found by the `where` argument doesn't exist, create a new Module with this data.
     */
    create: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
    /**
     * In case the Module was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
  }

  /**
   * Module delete
   */
  export type ModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter which Module to delete.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module deleteMany
   */
  export type ModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modules to delete
     */
    where?: ModuleWhereInput | $Types.Skip
    /**
     * Limit how many Modules to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Module.permissions
   */
  export type Module$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput | $Types.Skip
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Module without action
   */
  export type ModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isSystem: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    isSystem?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
  }

  export type RoleMaxAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    isSystem?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
  }

  export type RoleCountAggregateInputType = {
    id?: true | $Types.Skip
    name?: true | $Types.Skip
    description?: true | $Types.Skip
    isSystem?: true | $Types.Skip
    createdAt?: true | $Types.Skip
    updatedAt?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput | $Types.Skip
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[] | $Types.Skip
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    description: string
    isSystem: boolean
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    isSystem?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
    permissions?: boolean | Role$permissionsArgs<ExtArgs> | $Types.Skip
    users?: boolean | Role$usersArgs<ExtArgs> | $Types.Skip
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    isSystem?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    isSystem?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean | $Types.Skip
    name?: boolean | $Types.Skip
    description?: boolean | $Types.Skip
    isSystem?: boolean | $Types.Skip
    createdAt?: boolean | $Types.Skip
    updatedAt?: boolean | $Types.Skip
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isSystem" | "createdAt" | "updatedAt", ExtArgs["result"]["role"], $Types.Skip>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | Role$permissionsArgs<ExtArgs> | $Types.Skip
    users?: boolean | Role$usersArgs<ExtArgs> | $Types.Skip
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      permissions: Prisma.$RolePermissionPayload<ExtArgs>[]
      users: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      isSystem: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly isSystem: FieldRef<"Role", 'Boolean'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * Limit how many Roles to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * Limit how many Roles to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput | $Types.Skip
    /**
     * Limit how many Roles to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput | $Types.Skip
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput | $Types.Skip
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionMinAggregateOutputType = {
    id: string | null
    roleId: string | null
    moduleId: string | null
    action: $Enums.Action | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    id: string | null
    roleId: string | null
    moduleId: string | null
    action: $Enums.Action | null
  }

  export type RolePermissionCountAggregateOutputType = {
    id: number
    roleId: number
    moduleId: number
    action: number
    _all: number
  }


  export type RolePermissionMinAggregateInputType = {
    id?: true | $Types.Skip
    roleId?: true | $Types.Skip
    moduleId?: true | $Types.Skip
    action?: true | $Types.Skip
  }

  export type RolePermissionMaxAggregateInputType = {
    id?: true | $Types.Skip
    roleId?: true | $Types.Skip
    moduleId?: true | $Types.Skip
    action?: true | $Types.Skip
  }

  export type RolePermissionCountAggregateInputType = {
    id?: true | $Types.Skip
    roleId?: true | $Types.Skip
    moduleId?: true | $Types.Skip
    action?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput | $Types.Skip
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[] | $Types.Skip
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: RolePermissionCountAggregateInputType | true
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    id: string
    roleId: string
    moduleId: string
    action: $Enums.Action
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    moduleId?: boolean | $Types.Skip
    action?: boolean | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    moduleId?: boolean | $Types.Skip
    action?: boolean | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    moduleId?: boolean | $Types.Skip
    action?: boolean | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectScalar = {
    id?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    moduleId?: boolean | $Types.Skip
    action?: boolean | $Types.Skip
  }

  export type RolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roleId" | "moduleId" | "action", ExtArgs["result"]["rolePermission"], $Types.Skip>
  export type RolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type RolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }
  export type RolePermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    module?: boolean | ModuleDefaultArgs<ExtArgs> | $Types.Skip
  }

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      module: Prisma.$ModulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roleId: string
      moduleId: string
      action: $Enums.Action
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolePermissionWithIdOnly = await prisma.rolePermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissions and returns the data saved in the database.
     * @param {RolePermissionCreateManyAndReturnArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissions and only return the `id`
     * const rolePermissionWithIdOnly = await prisma.rolePermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions and returns the data updated in the database.
     * @param {RolePermissionUpdateManyAndReturnArgs} args - Arguments to update many RolePermissions.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RolePermissions and only return the `id`
     * const rolePermissionWithIdOnly = await prisma.rolePermission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    module<T extends ModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuleDefaultArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermission model
   */
  interface RolePermissionFieldRefs {
    readonly id: FieldRef<"RolePermission", 'String'>
    readonly roleId: FieldRef<"RolePermission", 'String'>
    readonly moduleId: FieldRef<"RolePermission", 'String'>
    readonly action: FieldRef<"RolePermission", 'Action'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[] | $Types.Skip
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * RolePermission createManyAndReturn
   */
  export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * RolePermission updateManyAndReturn
   */
  export type RolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput | $Types.Skip
    /**
     * Limit how many RolePermissions to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    roleId: string | null
    assignedAt: Date | null
    assignedById: string | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    roleId: string | null
    assignedAt: Date | null
    assignedById: string | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    userId: number
    roleId: number
    assignedAt: number
    assignedById: number
    _all: number
  }


  export type UserRoleMinAggregateInputType = {
    id?: true | $Types.Skip
    userId?: true | $Types.Skip
    roleId?: true | $Types.Skip
    assignedAt?: true | $Types.Skip
    assignedById?: true | $Types.Skip
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true | $Types.Skip
    userId?: true | $Types.Skip
    roleId?: true | $Types.Skip
    assignedAt?: true | $Types.Skip
    assignedById?: true | $Types.Skip
  }

  export type UserRoleCountAggregateInputType = {
    id?: true | $Types.Skip
    userId?: true | $Types.Skip
    roleId?: true | $Types.Skip
    assignedAt?: true | $Types.Skip
    assignedById?: true | $Types.Skip
    _all?: true | $Types.Skip
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput | $Types.Skip
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[] | $Types.Skip
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput | $Types.Skip
    take?: number | $Types.Skip
    skip?: number | $Types.Skip
    _count?: UserRoleCountAggregateInputType | true
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    id: string
    userId: string
    roleId: string
    assignedAt: Date
    assignedById: string | null
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    assignedAt?: boolean | $Types.Skip
    assignedById?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    assignedAt?: boolean | $Types.Skip
    assignedById?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    assignedAt?: boolean | $Types.Skip
    assignedById?: boolean | $Types.Skip
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectScalar = {
    id?: boolean | $Types.Skip
    userId?: boolean | $Types.Skip
    roleId?: boolean | $Types.Skip
    assignedAt?: boolean | $Types.Skip
    assignedById?: boolean | $Types.Skip
  }

  export type UserRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "roleId" | "assignedAt" | "assignedById", ExtArgs["result"]["userRole"], $Types.Skip>
  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }
  export type UserRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }
  export type UserRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs> | $Types.Skip
    role?: boolean | RoleDefaultArgs<ExtArgs> | $Types.Skip
    assignedBy?: boolean | UserRole$assignedByArgs<ExtArgs> | $Types.Skip
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
      assignedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      roleId: string
      assignedAt: Date
      assignedById: string | null
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRoleCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles and returns the data updated in the database.
     * @param {UserRoleUpdateManyAndReturnArgs} args - Arguments to update many UserRoles.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedBy<T extends UserRole$assignedByArgs<ExtArgs> = {}>(args?: Subset<T, UserRole$assignedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRole model
   */
  interface UserRoleFieldRefs {
    readonly id: FieldRef<"UserRole", 'String'>
    readonly userId: FieldRef<"UserRole", 'String'>
    readonly roleId: FieldRef<"UserRole", 'String'>
    readonly assignedAt: FieldRef<"UserRole", 'DateTime'>
    readonly assignedById: FieldRef<"UserRole", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[] | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number | $Types.Skip
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[] | $Types.Skip
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  /**
   * UserRole createManyAndReturn
   */
  export type UserRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number | $Types.Skip
  }

  /**
   * UserRole updateManyAndReturn
   */
  export type UserRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number | $Types.Skip
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput | $Types.Skip
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number | $Types.Skip
  }

  /**
   * UserRole.assignedBy
   */
  export type UserRole$assignedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput | $Types.Skip
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    isActive: 'isActive',
    isBootstrapAdmin: 'isBootstrapAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const ModuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isSystem: 'isSystem',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    id: 'id',
    roleId: 'roleId',
    moduleId: 'moduleId',
    action: 'action'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    roleId: 'roleId',
    assignedAt: 'assignedAt',
    assignedById: 'assignedById'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Action'
   */
  export type EnumActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Action'>
    


  /**
   * Reference to a field of type 'Action[]'
   */
  export type ListEnumActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Action[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[] | $Types.Skip
    OR?: UserWhereInput[] | $Types.Skip
    NOT?: UserWhereInput | UserWhereInput[] | $Types.Skip
    id?: StringFilter<"User"> | string | $Types.Skip
    email?: StringFilter<"User"> | string | $Types.Skip
    passwordHash?: StringFilter<"User"> | string | $Types.Skip
    name?: StringFilter<"User"> | string | $Types.Skip
    isActive?: BoolFilter<"User"> | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFilter<"User"> | boolean | $Types.Skip
    createdAt?: DateTimeFilter<"User"> | Date | string | $Types.Skip
    updatedAt?: DateTimeFilter<"User"> | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenListRelationFilter | $Types.Skip
    userRoles?: UserRoleListRelationFilter | $Types.Skip
    assignedRoles?: UserRoleListRelationFilter | $Types.Skip
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    email?: SortOrder | $Types.Skip
    passwordHash?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    isActive?: SortOrder | $Types.Skip
    isBootstrapAdmin?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput | $Types.Skip
    userRoles?: UserRoleOrderByRelationAggregateInput | $Types.Skip
    assignedRoles?: UserRoleOrderByRelationAggregateInput | $Types.Skip
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    email?: string | $Types.Skip
    AND?: UserWhereInput | UserWhereInput[] | $Types.Skip
    OR?: UserWhereInput[] | $Types.Skip
    NOT?: UserWhereInput | UserWhereInput[] | $Types.Skip
    passwordHash?: StringFilter<"User"> | string | $Types.Skip
    name?: StringFilter<"User"> | string | $Types.Skip
    isActive?: BoolFilter<"User"> | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFilter<"User"> | boolean | $Types.Skip
    createdAt?: DateTimeFilter<"User"> | Date | string | $Types.Skip
    updatedAt?: DateTimeFilter<"User"> | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenListRelationFilter | $Types.Skip
    userRoles?: UserRoleListRelationFilter | $Types.Skip
    assignedRoles?: UserRoleListRelationFilter | $Types.Skip
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    email?: SortOrder | $Types.Skip
    passwordHash?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    isActive?: SortOrder | $Types.Skip
    isBootstrapAdmin?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
    _count?: UserCountOrderByAggregateInput | $Types.Skip
    _max?: UserMaxOrderByAggregateInput | $Types.Skip
    _min?: UserMinOrderByAggregateInput | $Types.Skip
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: UserScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"User"> | string | $Types.Skip
    email?: StringWithAggregatesFilter<"User"> | string | $Types.Skip
    passwordHash?: StringWithAggregatesFilter<"User"> | string | $Types.Skip
    name?: StringWithAggregatesFilter<"User"> | string | $Types.Skip
    isActive?: BoolWithAggregatesFilter<"User"> | boolean | $Types.Skip
    isBootstrapAdmin?: BoolWithAggregatesFilter<"User"> | boolean | $Types.Skip
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string | $Types.Skip
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string | $Types.Skip
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[] | $Types.Skip
    OR?: RefreshTokenWhereInput[] | $Types.Skip
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[] | $Types.Skip
    id?: StringFilter<"RefreshToken"> | string | $Types.Skip
    tokenHash?: StringFilter<"RefreshToken"> | string | $Types.Skip
    userId?: StringFilter<"RefreshToken"> | string | $Types.Skip
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null | $Types.Skip
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
    user?: XOR<UserScalarRelationFilter, UserWhereInput> | $Types.Skip
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    tokenHash?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    expiresAt?: SortOrder | $Types.Skip
    revokedAt?: SortOrderInput | SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    userAgent?: SortOrderInput | SortOrder | $Types.Skip
    ipAddress?: SortOrderInput | SortOrder | $Types.Skip
    user?: UserOrderByWithRelationInput | $Types.Skip
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    tokenHash?: string | $Types.Skip
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[] | $Types.Skip
    OR?: RefreshTokenWhereInput[] | $Types.Skip
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[] | $Types.Skip
    userId?: StringFilter<"RefreshToken"> | string | $Types.Skip
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null | $Types.Skip
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
    user?: XOR<UserScalarRelationFilter, UserWhereInput> | $Types.Skip
  }, "id" | "tokenHash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    tokenHash?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    expiresAt?: SortOrder | $Types.Skip
    revokedAt?: SortOrderInput | SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    userAgent?: SortOrderInput | SortOrder | $Types.Skip
    ipAddress?: SortOrderInput | SortOrder | $Types.Skip
    _count?: RefreshTokenCountOrderByAggregateInput | $Types.Skip
    _max?: RefreshTokenMaxOrderByAggregateInput | $Types.Skip
    _min?: RefreshTokenMinOrderByAggregateInput | $Types.Skip
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: RefreshTokenScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"RefreshToken"> | string | $Types.Skip
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string | $Types.Skip
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string | $Types.Skip
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string | $Types.Skip
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null | $Types.Skip
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string | $Types.Skip
    userAgent?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null | $Types.Skip
    ipAddress?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null | $Types.Skip
  }

  export type ModuleWhereInput = {
    AND?: ModuleWhereInput | ModuleWhereInput[] | $Types.Skip
    OR?: ModuleWhereInput[] | $Types.Skip
    NOT?: ModuleWhereInput | ModuleWhereInput[] | $Types.Skip
    id?: StringFilter<"Module"> | string | $Types.Skip
    name?: StringFilter<"Module"> | string | $Types.Skip
    description?: StringFilter<"Module"> | string | $Types.Skip
    createdAt?: DateTimeFilter<"Module"> | Date | string | $Types.Skip
    permissions?: RolePermissionListRelationFilter | $Types.Skip
  }

  export type ModuleOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    permissions?: RolePermissionOrderByRelationAggregateInput | $Types.Skip
  }

  export type ModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    name?: string | $Types.Skip
    AND?: ModuleWhereInput | ModuleWhereInput[] | $Types.Skip
    OR?: ModuleWhereInput[] | $Types.Skip
    NOT?: ModuleWhereInput | ModuleWhereInput[] | $Types.Skip
    description?: StringFilter<"Module"> | string | $Types.Skip
    createdAt?: DateTimeFilter<"Module"> | Date | string | $Types.Skip
    permissions?: RolePermissionListRelationFilter | $Types.Skip
  }, "id" | "name">

  export type ModuleOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    _count?: ModuleCountOrderByAggregateInput | $Types.Skip
    _max?: ModuleMaxOrderByAggregateInput | $Types.Skip
    _min?: ModuleMinOrderByAggregateInput | $Types.Skip
  }

  export type ModuleScalarWhereWithAggregatesInput = {
    AND?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: ModuleScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"Module"> | string | $Types.Skip
    name?: StringWithAggregatesFilter<"Module"> | string | $Types.Skip
    description?: StringWithAggregatesFilter<"Module"> | string | $Types.Skip
    createdAt?: DateTimeWithAggregatesFilter<"Module"> | Date | string | $Types.Skip
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[] | $Types.Skip
    OR?: RoleWhereInput[] | $Types.Skip
    NOT?: RoleWhereInput | RoleWhereInput[] | $Types.Skip
    id?: StringFilter<"Role"> | string | $Types.Skip
    name?: StringFilter<"Role"> | string | $Types.Skip
    description?: StringFilter<"Role"> | string | $Types.Skip
    isSystem?: BoolFilter<"Role"> | boolean | $Types.Skip
    createdAt?: DateTimeFilter<"Role"> | Date | string | $Types.Skip
    updatedAt?: DateTimeFilter<"Role"> | Date | string | $Types.Skip
    permissions?: RolePermissionListRelationFilter | $Types.Skip
    users?: UserRoleListRelationFilter | $Types.Skip
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    isSystem?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
    permissions?: RolePermissionOrderByRelationAggregateInput | $Types.Skip
    users?: UserRoleOrderByRelationAggregateInput | $Types.Skip
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    name?: string | $Types.Skip
    AND?: RoleWhereInput | RoleWhereInput[] | $Types.Skip
    OR?: RoleWhereInput[] | $Types.Skip
    NOT?: RoleWhereInput | RoleWhereInput[] | $Types.Skip
    description?: StringFilter<"Role"> | string | $Types.Skip
    isSystem?: BoolFilter<"Role"> | boolean | $Types.Skip
    createdAt?: DateTimeFilter<"Role"> | Date | string | $Types.Skip
    updatedAt?: DateTimeFilter<"Role"> | Date | string | $Types.Skip
    permissions?: RolePermissionListRelationFilter | $Types.Skip
    users?: UserRoleListRelationFilter | $Types.Skip
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    isSystem?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
    _count?: RoleCountOrderByAggregateInput | $Types.Skip
    _max?: RoleMaxOrderByAggregateInput | $Types.Skip
    _min?: RoleMinOrderByAggregateInput | $Types.Skip
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: RoleScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"Role"> | string | $Types.Skip
    name?: StringWithAggregatesFilter<"Role"> | string | $Types.Skip
    description?: StringWithAggregatesFilter<"Role"> | string | $Types.Skip
    isSystem?: BoolWithAggregatesFilter<"Role"> | boolean | $Types.Skip
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string | $Types.Skip
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string | $Types.Skip
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[] | $Types.Skip
    OR?: RolePermissionWhereInput[] | $Types.Skip
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[] | $Types.Skip
    id?: StringFilter<"RolePermission"> | string | $Types.Skip
    roleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    moduleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    action?: EnumActionFilter<"RolePermission"> | $Enums.Action | $Types.Skip
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput> | $Types.Skip
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput> | $Types.Skip
  }

  export type RolePermissionOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    moduleId?: SortOrder | $Types.Skip
    action?: SortOrder | $Types.Skip
    role?: RoleOrderByWithRelationInput | $Types.Skip
    module?: ModuleOrderByWithRelationInput | $Types.Skip
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    roleId_moduleId_action?: RolePermissionRoleIdModuleIdActionCompoundUniqueInput | $Types.Skip
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[] | $Types.Skip
    OR?: RolePermissionWhereInput[] | $Types.Skip
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[] | $Types.Skip
    roleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    moduleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    action?: EnumActionFilter<"RolePermission"> | $Enums.Action | $Types.Skip
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput> | $Types.Skip
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput> | $Types.Skip
  }, "id" | "roleId_moduleId_action">

  export type RolePermissionOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    moduleId?: SortOrder | $Types.Skip
    action?: SortOrder | $Types.Skip
    _count?: RolePermissionCountOrderByAggregateInput | $Types.Skip
    _max?: RolePermissionMaxOrderByAggregateInput | $Types.Skip
    _min?: RolePermissionMinOrderByAggregateInput | $Types.Skip
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: RolePermissionScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"RolePermission"> | string | $Types.Skip
    roleId?: StringWithAggregatesFilter<"RolePermission"> | string | $Types.Skip
    moduleId?: StringWithAggregatesFilter<"RolePermission"> | string | $Types.Skip
    action?: EnumActionWithAggregatesFilter<"RolePermission"> | $Enums.Action | $Types.Skip
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[] | $Types.Skip
    OR?: UserRoleWhereInput[] | $Types.Skip
    NOT?: UserRoleWhereInput | UserRoleWhereInput[] | $Types.Skip
    id?: StringFilter<"UserRole"> | string | $Types.Skip
    userId?: StringFilter<"UserRole"> | string | $Types.Skip
    roleId?: StringFilter<"UserRole"> | string | $Types.Skip
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string | $Types.Skip
    assignedById?: StringNullableFilter<"UserRole"> | string | null | $Types.Skip
    user?: XOR<UserScalarRelationFilter, UserWhereInput> | $Types.Skip
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput> | $Types.Skip
    assignedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null | $Types.Skip
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    assignedAt?: SortOrder | $Types.Skip
    assignedById?: SortOrderInput | SortOrder | $Types.Skip
    user?: UserOrderByWithRelationInput | $Types.Skip
    role?: RoleOrderByWithRelationInput | $Types.Skip
    assignedBy?: UserOrderByWithRelationInput | $Types.Skip
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string | $Types.Skip
    userId_roleId?: UserRoleUserIdRoleIdCompoundUniqueInput | $Types.Skip
    AND?: UserRoleWhereInput | UserRoleWhereInput[] | $Types.Skip
    OR?: UserRoleWhereInput[] | $Types.Skip
    NOT?: UserRoleWhereInput | UserRoleWhereInput[] | $Types.Skip
    userId?: StringFilter<"UserRole"> | string | $Types.Skip
    roleId?: StringFilter<"UserRole"> | string | $Types.Skip
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string | $Types.Skip
    assignedById?: StringNullableFilter<"UserRole"> | string | null | $Types.Skip
    user?: XOR<UserScalarRelationFilter, UserWhereInput> | $Types.Skip
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput> | $Types.Skip
    assignedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null | $Types.Skip
  }, "id" | "userId_roleId">

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    assignedAt?: SortOrder | $Types.Skip
    assignedById?: SortOrderInput | SortOrder | $Types.Skip
    _count?: UserRoleCountOrderByAggregateInput | $Types.Skip
    _max?: UserRoleMaxOrderByAggregateInput | $Types.Skip
    _min?: UserRoleMinOrderByAggregateInput | $Types.Skip
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[] | $Types.Skip
    OR?: UserRoleScalarWhereWithAggregatesInput[] | $Types.Skip
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[] | $Types.Skip
    id?: StringWithAggregatesFilter<"UserRole"> | string | $Types.Skip
    userId?: StringWithAggregatesFilter<"UserRole"> | string | $Types.Skip
    roleId?: StringWithAggregatesFilter<"UserRole"> | string | $Types.Skip
    assignedAt?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string | $Types.Skip
    assignedById?: StringNullableWithAggregatesFilter<"UserRole"> | string | null | $Types.Skip
  }

  export type UserCreateInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput | $Types.Skip
    userRoles?: UserRoleCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserUncheckedCreateInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput | $Types.Skip
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type UserCreateManyInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type RefreshTokenCreateInput = {
    id?: string | $Types.Skip
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string | $Types.Skip
    tokenHash: string
    userId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput | $Types.Skip
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type RefreshTokenCreateManyInput = {
    id?: string | $Types.Skip
    tokenHash: string
    userId: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type ModuleCreateInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    createdAt?: Date | string | $Types.Skip
    permissions?: RolePermissionCreateNestedManyWithoutModuleInput | $Types.Skip
  }

  export type ModuleUncheckedCreateInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    createdAt?: Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutModuleInput | $Types.Skip
  }

  export type ModuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUpdateManyWithoutModuleNestedInput | $Types.Skip
  }

  export type ModuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedUpdateManyWithoutModuleNestedInput | $Types.Skip
  }

  export type ModuleCreateManyInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    createdAt?: Date | string | $Types.Skip
  }

  export type ModuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type ModuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type RoleCreateInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput | $Types.Skip
    users?: UserRoleCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleUncheckedCreateInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput | $Types.Skip
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput | $Types.Skip
    users?: UserRoleUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput | $Types.Skip
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type RoleCreateManyInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type RolePermissionCreateInput = {
    id?: string | $Types.Skip
    action: $Enums.Action
    role: RoleCreateNestedOneWithoutPermissionsInput
    module: ModuleCreateNestedOneWithoutPermissionsInput
  }

  export type RolePermissionUncheckedCreateInput = {
    id?: string | $Types.Skip
    roleId: string
    moduleId: string
    action: $Enums.Action
  }

  export type RolePermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput | $Types.Skip
    module?: ModuleUpdateOneRequiredWithoutPermissionsNestedInput | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    moduleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type RolePermissionCreateManyInput = {
    id?: string | $Types.Skip
    roleId: string
    moduleId: string
    action: $Enums.Action
  }

  export type RolePermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    moduleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type UserRoleCreateInput = {
    id?: string | $Types.Skip
    assignedAt?: Date | string | $Types.Skip
    user: UserCreateNestedOneWithoutUserRolesInput
    role: RoleCreateNestedOneWithoutUsersInput
    assignedBy?: UserCreateNestedOneWithoutAssignedRolesInput | $Types.Skip
  }

  export type UserRoleUncheckedCreateInput = {
    id?: string | $Types.Skip
    userId: string
    roleId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type UserRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput | $Types.Skip
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput | $Types.Skip
    assignedBy?: UserUpdateOneWithoutAssignedRolesNestedInput | $Types.Skip
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type UserRoleCreateManyInput = {
    id?: string | $Types.Skip
    userId: string
    roleId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type UserRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    mode?: QueryMode | $Types.Skip
    not?: NestedStringFilter<$PrismaModel> | string | $Types.Skip
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedBoolFilter<$PrismaModel> | boolean | $Types.Skip
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string | $Types.Skip
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput | $Types.Skip
    some?: RefreshTokenWhereInput | $Types.Skip
    none?: RefreshTokenWhereInput | $Types.Skip
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput | $Types.Skip
    some?: UserRoleWhereInput | $Types.Skip
    none?: UserRoleWhereInput | $Types.Skip
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder | $Types.Skip
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder | $Types.Skip
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    email?: SortOrder | $Types.Skip
    passwordHash?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    isActive?: SortOrder | $Types.Skip
    isBootstrapAdmin?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    email?: SortOrder | $Types.Skip
    passwordHash?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    isActive?: SortOrder | $Types.Skip
    isBootstrapAdmin?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    email?: SortOrder | $Types.Skip
    passwordHash?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    isActive?: SortOrder | $Types.Skip
    isBootstrapAdmin?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    mode?: QueryMode | $Types.Skip
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedStringFilter<$PrismaModel> | $Types.Skip
    _max?: NestedStringFilter<$PrismaModel> | $Types.Skip
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedBoolFilter<$PrismaModel> | $Types.Skip
    _max?: NestedBoolFilter<$PrismaModel> | $Types.Skip
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedDateTimeFilter<$PrismaModel> | $Types.Skip
    _max?: NestedDateTimeFilter<$PrismaModel> | $Types.Skip
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null | $Types.Skip
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    mode?: QueryMode | $Types.Skip
    not?: NestedStringNullableFilter<$PrismaModel> | string | null | $Types.Skip
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput | $Types.Skip
    isNot?: UserWhereInput | $Types.Skip
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder | $Types.Skip
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    tokenHash?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    expiresAt?: SortOrder | $Types.Skip
    revokedAt?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    userAgent?: SortOrder | $Types.Skip
    ipAddress?: SortOrder | $Types.Skip
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    tokenHash?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    expiresAt?: SortOrder | $Types.Skip
    revokedAt?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    userAgent?: SortOrder | $Types.Skip
    ipAddress?: SortOrder | $Types.Skip
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    tokenHash?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    expiresAt?: SortOrder | $Types.Skip
    revokedAt?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    userAgent?: SortOrder | $Types.Skip
    ipAddress?: SortOrder | $Types.Skip
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null | $Types.Skip
    _count?: NestedIntNullableFilter<$PrismaModel> | $Types.Skip
    _min?: NestedDateTimeNullableFilter<$PrismaModel> | $Types.Skip
    _max?: NestedDateTimeNullableFilter<$PrismaModel> | $Types.Skip
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    mode?: QueryMode | $Types.Skip
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null | $Types.Skip
    _count?: NestedIntNullableFilter<$PrismaModel> | $Types.Skip
    _min?: NestedStringNullableFilter<$PrismaModel> | $Types.Skip
    _max?: NestedStringNullableFilter<$PrismaModel> | $Types.Skip
  }

  export type RolePermissionListRelationFilter = {
    every?: RolePermissionWhereInput | $Types.Skip
    some?: RolePermissionWhereInput | $Types.Skip
    none?: RolePermissionWhereInput | $Types.Skip
  }

  export type RolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder | $Types.Skip
  }

  export type ModuleCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
  }

  export type ModuleMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
  }

  export type ModuleMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    isSystem?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    isSystem?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    name?: SortOrder | $Types.Skip
    description?: SortOrder | $Types.Skip
    isSystem?: SortOrder | $Types.Skip
    createdAt?: SortOrder | $Types.Skip
    updatedAt?: SortOrder | $Types.Skip
  }

  export type EnumActionFilter<$PrismaModel = never> = {
    equals?: $Enums.Action | EnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    in?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedEnumActionFilter<$PrismaModel> | $Enums.Action | $Types.Skip
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput | $Types.Skip
    isNot?: RoleWhereInput | $Types.Skip
  }

  export type ModuleScalarRelationFilter = {
    is?: ModuleWhereInput | $Types.Skip
    isNot?: ModuleWhereInput | $Types.Skip
  }

  export type RolePermissionRoleIdModuleIdActionCompoundUniqueInput = {
    roleId: string
    moduleId: string
    action: $Enums.Action
  }

  export type RolePermissionCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    moduleId?: SortOrder | $Types.Skip
    action?: SortOrder | $Types.Skip
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    moduleId?: SortOrder | $Types.Skip
    action?: SortOrder | $Types.Skip
  }

  export type RolePermissionMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    moduleId?: SortOrder | $Types.Skip
    action?: SortOrder | $Types.Skip
  }

  export type EnumActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Action | EnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    in?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedEnumActionWithAggregatesFilter<$PrismaModel> | $Enums.Action | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedEnumActionFilter<$PrismaModel> | $Types.Skip
    _max?: NestedEnumActionFilter<$PrismaModel> | $Types.Skip
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null | $Types.Skip
    isNot?: UserWhereInput | null | $Types.Skip
  }

  export type UserRoleUserIdRoleIdCompoundUniqueInput = {
    userId: string
    roleId: string
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    assignedAt?: SortOrder | $Types.Skip
    assignedById?: SortOrder | $Types.Skip
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    assignedAt?: SortOrder | $Types.Skip
    assignedById?: SortOrder | $Types.Skip
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder | $Types.Skip
    userId?: SortOrder | $Types.Skip
    roleId?: SortOrder | $Types.Skip
    assignedAt?: SortOrder | $Types.Skip
    assignedById?: SortOrder | $Types.Skip
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[] | $Types.Skip
    createMany?: RefreshTokenCreateManyUserInputEnvelope | $Types.Skip
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[] | $Types.Skip
    createMany?: UserRoleCreateManyUserInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleCreateNestedManyWithoutAssignedByInput = {
    create?: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput> | UserRoleCreateWithoutAssignedByInput[] | UserRoleUncheckedCreateWithoutAssignedByInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutAssignedByInput | UserRoleCreateOrConnectWithoutAssignedByInput[] | $Types.Skip
    createMany?: UserRoleCreateManyAssignedByInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[] | $Types.Skip
    createMany?: RefreshTokenCreateManyUserInputEnvelope | $Types.Skip
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[] | $Types.Skip
    createMany?: UserRoleCreateManyUserInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleUncheckedCreateNestedManyWithoutAssignedByInput = {
    create?: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput> | UserRoleCreateWithoutAssignedByInput[] | UserRoleUncheckedCreateWithoutAssignedByInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutAssignedByInput | UserRoleCreateOrConnectWithoutAssignedByInput[] | $Types.Skip
    createMany?: UserRoleCreateManyAssignedByInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string | $Types.Skip
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean | $Types.Skip
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string | $Types.Skip
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[] | $Types.Skip
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[] | $Types.Skip
    createMany?: RefreshTokenCreateManyUserInputEnvelope | $Types.Skip
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[] | $Types.Skip
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[] | $Types.Skip
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[] | $Types.Skip
    createMany?: UserRoleCreateManyUserInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUpdateManyWithoutAssignedByNestedInput = {
    create?: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput> | UserRoleCreateWithoutAssignedByInput[] | UserRoleUncheckedCreateWithoutAssignedByInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutAssignedByInput | UserRoleCreateOrConnectWithoutAssignedByInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutAssignedByInput | UserRoleUpsertWithWhereUniqueWithoutAssignedByInput[] | $Types.Skip
    createMany?: UserRoleCreateManyAssignedByInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutAssignedByInput | UserRoleUpdateWithWhereUniqueWithoutAssignedByInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutAssignedByInput | UserRoleUpdateManyWithWhereWithoutAssignedByInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[] | $Types.Skip
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[] | $Types.Skip
    createMany?: RefreshTokenCreateManyUserInputEnvelope | $Types.Skip
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[] | $Types.Skip
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[] | $Types.Skip
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[] | $Types.Skip
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[] | $Types.Skip
    createMany?: UserRoleCreateManyUserInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutAssignedByNestedInput = {
    create?: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput> | UserRoleCreateWithoutAssignedByInput[] | UserRoleUncheckedCreateWithoutAssignedByInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutAssignedByInput | UserRoleCreateOrConnectWithoutAssignedByInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutAssignedByInput | UserRoleUpsertWithWhereUniqueWithoutAssignedByInput[] | $Types.Skip
    createMany?: UserRoleCreateManyAssignedByInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutAssignedByInput | UserRoleUpdateWithWhereUniqueWithoutAssignedByInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutAssignedByInput | UserRoleUpdateManyWithWhereWithoutAssignedByInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null | $Types.Skip
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null | $Types.Skip
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput | $Types.Skip
    upsert?: UserUpsertWithoutRefreshTokensInput | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput> | $Types.Skip
  }

  export type RolePermissionCreateNestedManyWithoutModuleInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyModuleInputEnvelope | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyModuleInputEnvelope | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
  }

  export type RolePermissionUpdateManyWithoutModuleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[] | $Types.Skip
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutModuleInput | RolePermissionUpsertWithWhereUniqueWithoutModuleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyModuleInputEnvelope | $Types.Skip
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    update?: RolePermissionUpdateWithWhereUniqueWithoutModuleInput | RolePermissionUpdateWithWhereUniqueWithoutModuleInput[] | $Types.Skip
    updateMany?: RolePermissionUpdateManyWithWhereWithoutModuleInput | RolePermissionUpdateManyWithWhereWithoutModuleInput[] | $Types.Skip
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[] | $Types.Skip
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutModuleInput | RolePermissionUpsertWithWhereUniqueWithoutModuleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyModuleInputEnvelope | $Types.Skip
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    update?: RolePermissionUpdateWithWhereUniqueWithoutModuleInput | RolePermissionUpdateWithWhereUniqueWithoutModuleInput[] | $Types.Skip
    updateMany?: RolePermissionUpdateManyWithWhereWithoutModuleInput | RolePermissionUpdateManyWithWhereWithoutModuleInput[] | $Types.Skip
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
  }

  export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyRoleInputEnvelope | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[] | $Types.Skip
    createMany?: UserRoleCreateManyRoleInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyRoleInputEnvelope | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[] | $Types.Skip
    createMany?: UserRoleCreateManyRoleInputEnvelope | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
  }

  export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[] | $Types.Skip
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyRoleInputEnvelope | $Types.Skip
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[] | $Types.Skip
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    createMany?: UserRoleCreateManyRoleInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[] | $Types.Skip
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    createMany?: RolePermissionCreateManyRoleInputEnvelope | $Types.Skip
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[] | $Types.Skip
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[] | $Types.Skip
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[] | $Types.Skip
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[] | $Types.Skip
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    createMany?: UserRoleCreateManyRoleInputEnvelope | $Types.Skip
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[] | $Types.Skip
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[] | $Types.Skip
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[] | $Types.Skip
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
  }

  export type RoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | $Types.Skip
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | $Types.Skip
    connect?: RoleWhereUniqueInput | $Types.Skip
  }

  export type ModuleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<ModuleCreateWithoutPermissionsInput, ModuleUncheckedCreateWithoutPermissionsInput> | $Types.Skip
    connectOrCreate?: ModuleCreateOrConnectWithoutPermissionsInput | $Types.Skip
    connect?: ModuleWhereUniqueInput | $Types.Skip
  }

  export type EnumActionFieldUpdateOperationsInput = {
    set?: $Enums.Action | $Types.Skip
  }

  export type RoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | $Types.Skip
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | $Types.Skip
    upsert?: RoleUpsertWithoutPermissionsInput | $Types.Skip
    connect?: RoleWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPermissionsInput, RoleUpdateWithoutPermissionsInput>, RoleUncheckedUpdateWithoutPermissionsInput> | $Types.Skip
  }

  export type ModuleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<ModuleCreateWithoutPermissionsInput, ModuleUncheckedCreateWithoutPermissionsInput> | $Types.Skip
    connectOrCreate?: ModuleCreateOrConnectWithoutPermissionsInput | $Types.Skip
    upsert?: ModuleUpsertWithoutPermissionsInput | $Types.Skip
    connect?: ModuleWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<ModuleUpdateToOneWithWhereWithoutPermissionsInput, ModuleUpdateWithoutPermissionsInput>, ModuleUncheckedUpdateWithoutPermissionsInput> | $Types.Skip
  }

  export type UserCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | $Types.Skip
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | $Types.Skip
    connect?: RoleWhereUniqueInput | $Types.Skip
  }

  export type UserCreateNestedOneWithoutAssignedRolesInput = {
    create?: XOR<UserCreateWithoutAssignedRolesInput, UserUncheckedCreateWithoutAssignedRolesInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRolesInput | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
  }

  export type UserUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput | $Types.Skip
    upsert?: UserUpsertWithoutUserRolesInput | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserRolesInput, UserUpdateWithoutUserRolesInput>, UserUncheckedUpdateWithoutUserRolesInput> | $Types.Skip
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput> | $Types.Skip
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | $Types.Skip
    upsert?: RoleUpsertWithoutUsersInput | $Types.Skip
    connect?: RoleWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput> | $Types.Skip
  }

  export type UserUpdateOneWithoutAssignedRolesNestedInput = {
    create?: XOR<UserCreateWithoutAssignedRolesInput, UserUncheckedCreateWithoutAssignedRolesInput> | $Types.Skip
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRolesInput | $Types.Skip
    upsert?: UserUpsertWithoutAssignedRolesInput | $Types.Skip
    disconnect?: UserWhereInput | boolean | $Types.Skip
    delete?: UserWhereInput | boolean | $Types.Skip
    connect?: UserWhereUniqueInput | $Types.Skip
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedRolesInput, UserUpdateWithoutAssignedRolesInput>, UserUncheckedUpdateWithoutAssignedRolesInput> | $Types.Skip
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedStringFilter<$PrismaModel> | string | $Types.Skip
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedBoolFilter<$PrismaModel> | boolean | $Types.Skip
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string | $Types.Skip
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedStringFilter<$PrismaModel> | $Types.Skip
    _max?: NestedStringFilter<$PrismaModel> | $Types.Skip
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedIntFilter<$PrismaModel> | number | $Types.Skip
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedBoolFilter<$PrismaModel> | $Types.Skip
    _max?: NestedBoolFilter<$PrismaModel> | $Types.Skip
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedDateTimeFilter<$PrismaModel> | $Types.Skip
    _max?: NestedDateTimeFilter<$PrismaModel> | $Types.Skip
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null | $Types.Skip
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedStringNullableFilter<$PrismaModel> | string | null | $Types.Skip
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null | $Types.Skip
    _count?: NestedIntNullableFilter<$PrismaModel> | $Types.Skip
    _min?: NestedDateTimeNullableFilter<$PrismaModel> | $Types.Skip
    _max?: NestedDateTimeNullableFilter<$PrismaModel> | $Types.Skip
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: number | IntFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedIntNullableFilter<$PrismaModel> | number | null | $Types.Skip
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null | $Types.Skip
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null | $Types.Skip
    lt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    lte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gt?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    gte?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    contains?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    startsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    endsWith?: string | StringFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null | $Types.Skip
    _count?: NestedIntNullableFilter<$PrismaModel> | $Types.Skip
    _min?: NestedStringNullableFilter<$PrismaModel> | $Types.Skip
    _max?: NestedStringNullableFilter<$PrismaModel> | $Types.Skip
  }

  export type NestedEnumActionFilter<$PrismaModel = never> = {
    equals?: $Enums.Action | EnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    in?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedEnumActionFilter<$PrismaModel> | $Enums.Action | $Types.Skip
  }

  export type NestedEnumActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Action | EnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    in?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    notIn?: $Enums.Action[] | ListEnumActionFieldRefInput<$PrismaModel> | $Types.Skip
    not?: NestedEnumActionWithAggregatesFilter<$PrismaModel> | $Enums.Action | $Types.Skip
    _count?: NestedIntFilter<$PrismaModel> | $Types.Skip
    _min?: NestedEnumActionFilter<$PrismaModel> | $Types.Skip
    _max?: NestedEnumActionFilter<$PrismaModel> | $Types.Skip
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string | $Types.Skip
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string | $Types.Skip
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type UserRoleCreateWithoutUserInput = {
    id?: string | $Types.Skip
    assignedAt?: Date | string | $Types.Skip
    role: RoleCreateNestedOneWithoutUsersInput
    assignedBy?: UserCreateNestedOneWithoutAssignedRolesInput | $Types.Skip
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    id?: string | $Types.Skip
    roleId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type UserRoleCreateWithoutAssignedByInput = {
    id?: string | $Types.Skip
    assignedAt?: Date | string | $Types.Skip
    user: UserCreateNestedOneWithoutUserRolesInput
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserRoleUncheckedCreateWithoutAssignedByInput = {
    id?: string | $Types.Skip
    userId: string
    roleId: string
    assignedAt?: Date | string | $Types.Skip
  }

  export type UserRoleCreateOrConnectWithoutAssignedByInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput>
  }

  export type UserRoleCreateManyAssignedByInputEnvelope = {
    data: UserRoleCreateManyAssignedByInput | UserRoleCreateManyAssignedByInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[] | $Types.Skip
    OR?: RefreshTokenScalarWhereInput[] | $Types.Skip
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[] | $Types.Skip
    id?: StringFilter<"RefreshToken"> | string | $Types.Skip
    tokenHash?: StringFilter<"RefreshToken"> | string | $Types.Skip
    userId?: StringFilter<"RefreshToken"> | string | $Types.Skip
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null | $Types.Skip
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string | $Types.Skip
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null | $Types.Skip
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
    OR?: UserRoleScalarWhereInput[] | $Types.Skip
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[] | $Types.Skip
    id?: StringFilter<"UserRole"> | string | $Types.Skip
    userId?: StringFilter<"UserRole"> | string | $Types.Skip
    roleId?: StringFilter<"UserRole"> | string | $Types.Skip
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string | $Types.Skip
    assignedById?: StringNullableFilter<"UserRole"> | string | null | $Types.Skip
  }

  export type UserRoleUpsertWithWhereUniqueWithoutAssignedByInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutAssignedByInput, UserRoleUncheckedUpdateWithoutAssignedByInput>
    create: XOR<UserRoleCreateWithoutAssignedByInput, UserRoleUncheckedCreateWithoutAssignedByInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutAssignedByInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutAssignedByInput, UserRoleUncheckedUpdateWithoutAssignedByInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutAssignedByInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutAssignedByInput>
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    userRoles?: UserRoleCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput | $Types.Skip
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput | $Types.Skip
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type RolePermissionCreateWithoutModuleInput = {
    id?: string | $Types.Skip
    action: $Enums.Action
    role: RoleCreateNestedOneWithoutPermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutModuleInput = {
    id?: string | $Types.Skip
    roleId: string
    action: $Enums.Action
  }

  export type RolePermissionCreateOrConnectWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type RolePermissionCreateManyModuleInputEnvelope = {
    data: RolePermissionCreateManyModuleInput | RolePermissionCreateManyModuleInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutModuleInput, RolePermissionUncheckedUpdateWithoutModuleInput>
    create: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutModuleInput, RolePermissionUncheckedUpdateWithoutModuleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutModuleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutModuleInput>
  }

  export type RolePermissionScalarWhereInput = {
    AND?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
    OR?: RolePermissionScalarWhereInput[] | $Types.Skip
    NOT?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[] | $Types.Skip
    id?: StringFilter<"RolePermission"> | string | $Types.Skip
    roleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    moduleId?: StringFilter<"RolePermission"> | string | $Types.Skip
    action?: EnumActionFilter<"RolePermission"> | $Enums.Action | $Types.Skip
  }

  export type RolePermissionCreateWithoutRoleInput = {
    id?: string | $Types.Skip
    action: $Enums.Action
    module: ModuleCreateNestedOneWithoutPermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutRoleInput = {
    id?: string | $Types.Skip
    moduleId: string
    action: $Enums.Action
  }

  export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionCreateManyRoleInputEnvelope = {
    data: RolePermissionCreateManyRoleInput | RolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type UserRoleCreateWithoutRoleInput = {
    id?: string | $Types.Skip
    assignedAt?: Date | string | $Types.Skip
    user: UserCreateNestedOneWithoutUserRolesInput
    assignedBy?: UserCreateNestedOneWithoutAssignedRolesInput | $Types.Skip
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    id?: string | $Types.Skip
    userId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean | $Types.Skip
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    users?: UserRoleCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type ModuleCreateWithoutPermissionsInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    createdAt?: Date | string | $Types.Skip
  }

  export type ModuleUncheckedCreateWithoutPermissionsInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    createdAt?: Date | string | $Types.Skip
  }

  export type ModuleCreateOrConnectWithoutPermissionsInput = {
    where: ModuleWhereUniqueInput
    create: XOR<ModuleCreateWithoutPermissionsInput, ModuleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpsertWithoutPermissionsInput = {
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    where?: RoleWhereInput | $Types.Skip
  }

  export type RoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: RoleWhereInput | $Types.Skip
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    users?: UserRoleUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type ModuleUpsertWithoutPermissionsInput = {
    update: XOR<ModuleUpdateWithoutPermissionsInput, ModuleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<ModuleCreateWithoutPermissionsInput, ModuleUncheckedCreateWithoutPermissionsInput>
    where?: ModuleWhereInput | $Types.Skip
  }

  export type ModuleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: ModuleWhereInput | $Types.Skip
    data: XOR<ModuleUpdateWithoutPermissionsInput, ModuleUncheckedUpdateWithoutPermissionsInput>
  }

  export type ModuleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type ModuleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type UserCreateWithoutUserRolesInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserUncheckedCreateWithoutUserRolesInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedCreateNestedManyWithoutAssignedByInput | $Types.Skip
  }

  export type UserCreateOrConnectWithoutUserRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string | $Types.Skip
    name: string
    description: string
    isSystem?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput | $Types.Skip
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutAssignedRolesInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput | $Types.Skip
    userRoles?: UserRoleCreateNestedManyWithoutUserInput | $Types.Skip
  }

  export type UserUncheckedCreateWithoutAssignedRolesInput = {
    id?: string | $Types.Skip
    email: string
    passwordHash: string
    name: string
    isActive?: boolean | $Types.Skip
    isBootstrapAdmin?: boolean | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    updatedAt?: Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput | $Types.Skip
  }

  export type UserCreateOrConnectWithoutAssignedRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedRolesInput, UserUncheckedCreateWithoutAssignedRolesInput>
  }

  export type UserUpsertWithoutUserRolesInput = {
    update: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    where?: UserWhereInput | $Types.Skip
  }

  export type UserUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: UserWhereInput | $Types.Skip
    data: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
  }

  export type UserUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type UserUncheckedUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
    assignedRoles?: UserRoleUncheckedUpdateManyWithoutAssignedByNestedInput | $Types.Skip
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput | $Types.Skip
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput | $Types.Skip
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    description?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isSystem?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput | $Types.Skip
  }

  export type UserUpsertWithoutAssignedRolesInput = {
    update: XOR<UserUpdateWithoutAssignedRolesInput, UserUncheckedUpdateWithoutAssignedRolesInput>
    create: XOR<UserCreateWithoutAssignedRolesInput, UserUncheckedCreateWithoutAssignedRolesInput>
    where?: UserWhereInput | $Types.Skip
  }

  export type UserUpdateToOneWithWhereWithoutAssignedRolesInput = {
    where?: UserWhereInput | $Types.Skip
    data: XOR<UserUpdateWithoutAssignedRolesInput, UserUncheckedUpdateWithoutAssignedRolesInput>
  }

  export type UserUpdateWithoutAssignedRolesInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput | $Types.Skip
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput | $Types.Skip
  }

  export type UserUncheckedUpdateWithoutAssignedRolesInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    email?: StringFieldUpdateOperationsInput | string | $Types.Skip
    passwordHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    name?: StringFieldUpdateOperationsInput | string | $Types.Skip
    isActive?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    isBootstrapAdmin?: BoolFieldUpdateOperationsInput | boolean | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput | $Types.Skip
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string | $Types.Skip
    tokenHash: string
    expiresAt: Date | string
    revokedAt?: Date | string | null | $Types.Skip
    createdAt?: Date | string | $Types.Skip
    userAgent?: string | null | $Types.Skip
    ipAddress?: string | null | $Types.Skip
  }

  export type UserRoleCreateManyUserInput = {
    id?: string | $Types.Skip
    roleId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type UserRoleCreateManyAssignedByInput = {
    id?: string | $Types.Skip
    userId: string
    roleId: string
    assignedAt?: Date | string | $Types.Skip
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    tokenHash?: StringFieldUpdateOperationsInput | string | $Types.Skip
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null | $Types.Skip
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type UserRoleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput | $Types.Skip
    assignedBy?: UserUpdateOneWithoutAssignedRolesNestedInput | $Types.Skip
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type UserRoleUpdateWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput | $Types.Skip
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput | $Types.Skip
  }

  export type UserRoleUncheckedUpdateWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutAssignedByInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
  }

  export type RolePermissionCreateManyModuleInput = {
    id?: string | $Types.Skip
    roleId: string
    action: $Enums.Action
  }

  export type RolePermissionUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateManyWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    roleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type RolePermissionCreateManyRoleInput = {
    id?: string | $Types.Skip
    moduleId: string
    action: $Enums.Action
  }

  export type UserRoleCreateManyRoleInput = {
    id?: string | $Types.Skip
    userId: string
    assignedAt?: Date | string | $Types.Skip
    assignedById?: string | null | $Types.Skip
  }

  export type RolePermissionUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
    module?: ModuleUpdateOneRequiredWithoutPermissionsNestedInput | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    moduleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    moduleId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    action?: EnumActionFieldUpdateOperationsInput | $Enums.Action | $Types.Skip
  }

  export type UserRoleUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput | $Types.Skip
    assignedBy?: UserUpdateOneWithoutAssignedRolesNestedInput | $Types.Skip
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string | $Types.Skip
    userId?: StringFieldUpdateOperationsInput | string | $Types.Skip
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string | $Types.Skip
    assignedById?: NullableStringFieldUpdateOperationsInput | string | null | $Types.Skip
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}