import test from "ava";

/* Soon you will look at ReaderTaksEither<S, L, R> and belive me
 * ReaderTaskEither<S, L, R> will stare back at you.
 */

interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}

interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

type Either<L, R> = Left<L> | Right<R>;

/* Here it comes in all its glory, a Doubly Curied Promised Sum.
 */

export type ReaderTaskEither<S, L, R> = (
  state: S
) => () => Promise<Either<L, R>>;

/* Its mininos tag along in a procession of generic types and one liners.
 */

const left = <L, R>(left: L): Either<L, R> => ({ _tag: "Left", left });
const right = <L, R>(right: R): Either<L, R> => ({ _tag: "Right", right });

const of =
  <S, L, R>(value: R): ReaderTaskEither<S, L, R> =>
  (state: S) =>
  () =>
    Promise.resolve(right(value));

const init4: ReaderTaskEither<number, string, number> = of(4);
const addState: (n: number) => ReaderTaskEither<number, string, number> =
  (n: number) => (state: number) => () =>
    Promise.resolve(right(n + state));

/* Yet, some of its most powerful minions are not here.
 * It is up to you to cast the summons
 * and grab the essence of the ReaderTaskEither<S, L, R> for yourself.
 */
test("The Map", async (t) => {
  /* Some say maps changes the nature of the function from R1 to R2 so that it is lifted to the realm of ReaderTaskEither.
   * Other say that they can take a function and apply them within the context of the realm.
   *
   * Let the types guide you in your summons.
   */

  const map =
    <R1, R2, S, L>(f: (r: R1) => R2) =>
    (rtw: ReaderTaskEither<S, L, R1>): ReaderTaskEither<S, L, R2> => undefined as any;

  // Now assert that the summons get applied.
  const now8 = map<number, number, number, string>((x: number) => x + 4)(init4);

  t.deepEqual(await now8(0)(), right<string, number>(8));
});

/* As the map twists the ReaderTaskEither and changes the nature, you notice that another minion is missing.
 * The Defining One, Anicent Chain, The One Who Makes ReaderTaskEither a Monad.
 *
 * Whatever it takes, you have to summon the flatMap.
 */

test("The FlatMap", async (t) => {
  /* The essence of the flatMap - you hear a voice in your head and stretch your fingers - is
   * the essence of functional programming herself.
   * Composition.
   * The fingers creack as you start composing two ReaderTaskEither's to become one.
   */
  const flatMap =
    <R1, R2, S, L>(f: (r: R1) => ReaderTaskEither<S, L, R2>) =>
    (rtw: ReaderTaskEither<S, L, R1>): ReaderTaskEither<S, L, R2> => undefined as any;

  /* You look at the flatMap. Will your summons be enough to merge this two beings together?
   */
  const now8 = flatMap<number, number, number, string>(addState)(init4);

  t.deepEqual(await now8(4)(), right<string, number>(8));
  t.deepEqual(await now8(1)(), right<string, number>(5));
});

/* When you looked at the app there was one more creature, missing from the pack.
 * A being of such power it can DDOS servers and clog hard drives.
 * Bastien's favourite function, the workhorse of development, The Multidude Who Does
 * Traversal
 */

test.skip("Traverse The Array", async (t) => {
  const initArray: Array<number> = [1, 2, 3, 4];
  /* A traversal takes a ReaderTaskEither containing a multitude of elements and runs all of them, returning
   * a single ReaderTaskEither collecting all the results of the computations.
   * It reminds you of Promise.all. Maybe you will have to ask her for help.
   *
   * The final summon will not be an easy one.
   */

  const traverseArray =
    <R1, R2, S, L>(f: (r: R1) => ReaderTaskEither<S, L, R2>) =>
    (arr: Array<R1>): ReaderTaskEither<S, L, Array<R2>> => undefined as any;

  // You breath heavily as you wait to assert the summons do work.
  const newArray: ReaderTaskEither<
    number,
    string,
    Array<number>
  > = traverseArray<number, number, number, string>(addState)(initArray);

  t.deepEqual(await newArray(0)(), right<string, Array<number>>([1, 2, 3, 4]));
  t.deepEqual(await newArray(4)(), right<string, Array<number>>([5, 6, 7, 8]));
});

/* You did it! You are a legend, Developer Person!
 * All the minions are here, the ReaderTaskEither look at you with glee.
 * You made it proud!
 */
