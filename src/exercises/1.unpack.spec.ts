import test from 'ava';


// WELCOME THE IO MONAD!
//
// PS. MONADS ARE NOT FOR UNPACKiNG! BUT LETS BE CHEEKY!

type IO<T> = () => T;

test.skip('Unpack THE IO ', t => {

  const io4: IO<number> = () => 4;


  // IMPLEMENT

  const unpack = <T>(io: IO<T>): T => undefined as any;

  // DO NOT TOUCH

  t.is(unpack(io4), 4)
});

type Reader<S, T> = (s: S) => T;

test.skip('Unpack the Reader', t => {
  const reader4: Reader<string, number> = (s: string) => 4;

  // IMPLEMENT

  const unpack = <S, T>(r: Reader<S, T>, state: S): T => undefined as any;

  // DO NOT TOUCH

  t.is(unpack(reader4, 'UNPACK ME!'), 4)

  // IMPLEMENT

  const ask = <S>(): Reader<S, S> => undefined as any;

  // DO NOT TOUCH

  t.is(unpack(ask(), 'UNPACKED?!'), 'UNPACKED?!')
});

interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}

interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

type Either<L, R> = Left<L> | Right<R>

test.skip('Unpack the Either', t => {
  const failure: Either<string, number> = { _tag: "Left", left: 'I HAVE BOOMED!' };
  const success: Either<string, number> = { _tag: "Right", right: 4 };

  // Unpack success or explode!
  const getOrExplode = <L, R>(e: Either<L, R>): R => {
    // IMPLEMENT
    // Why did I make this a statement ?
    // @ts-ignore
    return undefined;
  }

  // DO NOT TOUCH. IS IT FUNCTIONAL PROGGGRAMING?
  t.is(getOrExplode(success), 4);
  t.throws(() => getOrExplode(failure));
});


type Task<T> = IO<Promise<T>>

  // THIS IS VERY TRICKY

test.skip('Unpack the Task?', async t => {
  const task: Task<number> = () => Promise.resolve(4);

  // Unpack

  const unpackTask = <T>(t: Task<T>): T => undefined as any;

  // Is it possible to do without touching?

  t.is(unpackTask(task), 4)
})


