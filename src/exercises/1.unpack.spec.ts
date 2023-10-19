import test from "ava";
import { IORef } from "fp-ts/lib/IORef";

/*
 * You have opened the 1.unpack.spec.ts and are looking forward to making some sense out of all this fp-ts fluff.
 * There is a lot of stuff to unpack here and monad stacks were not made to be unpacked in the first place.
 *
 * You take a deep breath and look at the IO type.
 */

type IO<T> = () => T;

/* Why would anybody 
write stuff like that?
 * You will notice you have to delete the skip from the test to make it run
 */

test.skip("Unpack The Io of four", (t) => {
  const io4: IO<number> = () => 4;

  /* This should not be too hard to implement, the abnomination of undefined as any shall give place
   * to a function call.
   */

  const unpack = <T>(io: IO<T>): T => undefined as any;

  // As you get ready to run `yarn test` you feel you should not be touching this line.

  t.is(unpack(io4), 4);
});

/* There was not a lot to unpack there, was it?
 * You have a feeling harder times wait ahead as you look at the Reader
 */

type Reader<S, T> = (s: S) => T;

/* So this is just a function with an argument, right?
 */

test.skip("Unpack the Reader of four", (t) => {
  const reader4: Reader<"UNPACK ME!", number> = (s) => 4;

  /* The 'UNPACK ME!' is a singleton type.
   * It is cool as it has only one instance,
   * so you always know what it will be called with - you hear the voice of Mateusz in your head.
   * as you get ready to unpack it and any other Reader you come across.
   *
   * Do not listen to Mateusz, vi is but a distraction.
   */

  const unpack = <S, T>(r: Reader<S, T>, state: S): T => undefined as any;

  // You already know you should not touch the assertion.

  t.is(unpack(reader4, "UNPACK ME!"), 4);

  /* What if you would like to get the state, not the value?
   * You wonder.
   * Could you write a Reader which returns the state though?
   * You feel like you just need to ask politely.
   */

  const ask = <S>(): Reader<S, S> => undefined as any;

  // This assertion looks silly, you may have a bit to unpack here.

  t.is(unpack(ask(), "UNPACKED?!"), "UNPACKED?!");
});

/* Not all monads we use are so easy to unpack,
 * and not all of them are curried functions.
 * Below lies The Promidal Sum, an Either<L,R>.
 * It is staring at you holding an Error in it's Left
 * and a value in it's Right.
 *
 * Can you get Either?
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

test.skip("Unpacking The Primodal Sum", (t) => {
  const failure: Either<string, number> = {
    _tag: "Left",
    left: "I HAVE BOOMED!",
  };
  const success: Either<string, number> = { _tag: "Right", right: 4 };

  /* You look below and observe that this is a statement, not an expression?
   * What does it mean? Is there no soultion af value?
   * Do you have to go full berserk, forgeting about the functional way?
   */
  const getOrExplode = <L, R>(e: Either<L, R>): R => {
    return undefined as any;
  };

  /* You look at the assertions in terror.
   * Yes, Mateusz expects you to throw up.
   * There seems to be no pure way out of an Either.
   */

  t.is(getOrExplode(success), 4);
  t.throws(() => getOrExplode(failure));
});

/* There is one though - Mateusz says - you may not be able to extract the value out of Either,
 * but you can collapse a Primodal Sum into a single value in a catastrophe of a catamporphism.
 * This is the sort of spells you will be casting onwards.
 */

test.skip("I would rather have a cata-strophe than a throw-up", (t) => {
  const failure: Either<string, number> = {
    _tag: "Left",
    left: "I HAVE NOT BOOMED!",
  };
  const success: Either<string, number> = { _tag: "Right", right: 4 };

  /* It may look daunting, but the way is contained in the type.
   * Follow it and you will find the way.
   */
  const cata =
    <L, R, T>(fl: (l: L) => T, fr: (r: R) => T) =>
    (e: Either<L, R>): T =>
      undefined as any;

  /* Identity function is Mateusz's fav.
   */
  const identity = <T>(v: T) => v;

  t.is(cata(identity, JSON.stringify)(success), "4");
  t.is(cata(identity, JSON.stringify)(failure), "I HAVE NOT BOOMED!");
});

/* The atmosphere gets dense, as you are two tests away from a workshop break
 * and given a Task.
 * The Task looks stragihtformard.
 */

type Task<T> = IO<Promise<T>>;

/* Your may soon to find out it is impossible to unpack.
 */

test.skip("Unpack the Task of four?", async (t) => {
  const task: Task<number> = () => Promise.resolve(4);

  /* As you glanced over the type of the unpack function,
   * you may have missed that this function is async.
   * Why would it be async? Why do those thoughts happen inside a promise?
   * Does the type of the unpackTask lie?
   * Can you forget a Task upon its resolution?
   * Do you need to add an await somewhere?
   *
   * If you can not break free, break the rules.
   */

  const unpackTask = <T>(t: Task<T>): T => undefined as any;

  t.is(unpackTask(task), 4);
});

/* There must be a nicer way to assert a property of a Task.
 * How could you finish it without a resolution?
 * Maybe the way is to make the assertion a Task of its own
 */

test.skip("Assert the property of a task within a task", async (t) => {
  const task: Task<number> = () => Promise.resolve(4);
  const assertFour = (x: number) => () => Promise.resolve(t.is(x, 4));

  /* The art of a flatMap, a chain of the ancient javascript, is at the core of the Monads.
   * You may not unpack a Monad, but you can add new layers and peel away the old ones in a whim.
   * A Promise of a Promise is in the end, a Promise
   * A Task of a Task is but a Task.
   *
   */

  const flatMap =
    <T, T2>(f: (t: T) => Task<T2>) =>
    (t: Task<T>): Task<T2> =>
      undefined as any;

  await flatMap(assertFour)(task)();
});
