import test from 'ava';

interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}


interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

type Either<L, R> = Left<L> | Right<R>

const left = <L, R>(left: L): Either<L, R> => ({ _tag: "Left", left })
const right = <L, R>(right: R): Either<L, R> => ({ _tag: "Right", right })

export type ReaderTaskEither<S, L, R> = ( state: S) => () => Promise<Either<L, R>>

const of = <S, L, R>(value: R): ReaderTaskEither<S, L, R> => (state: S) => () => Promise.resolve(right(value))

const init4: ReaderTaskEither<number, string, number> = of(4);
const addState: (n:number) => ReaderTaskEither<number, string, number> = (n: number) => (state: number) => () => Promise.resolve(right(n + state))

test.skip('Changing the value inside RTE! Using map!', async t => {
  // CALL THE FUNCTION ON THE VALUE INSIDE RTE
  // IMPLEMENT
  const map = <R1, R2, S, L>(f: (r: R1) => R2) => (rtw: ReaderTaskEither<S, L,R1>): ReaderTaskEither<S, L, R2>  =>
    undefined as any;

  // WOW
  const now8 = map<number, number, number, string>((x: number) => x + 4)(init4);

  t.deepEqual(await now8(0)(), right<string, number>(8));
});


test.skip('Changing the value inside RTE! Using flatMap', async t => {
  // CALL THE FUNCTION ON THE VALUE INSIDE RTE
  // IMPLEMENT
  const flatMap = <R1, R2, S, L>(f: (r: R1) => ReaderTaskEither<S, L, R2>) => (rtw: ReaderTaskEither<S, L,R1>): ReaderTaskEither<S, L, R2>  =>
    undefined as any;

  // WOW
  const now8 = flatMap<number, number, number, string>(addState)(init4);

  t.deepEqual(await now8(4)(), right<string, number>(8));
  t.deepEqual(await now8(1)(), right<string, number>(5));
});

test.skip('Traversing an Array inisde of RTEs!', async t => {
  const initArray = of<number, string, Array<number>>([1, 2, 3, 4])
  // CALL THE FUNCTION ON THE VALUES INSIDE RTE
  // IMPLEMENT
  const traverseArray = <R1, R2, S, L>(f: (r: R1) => ReaderTaskEither<S, L, R2>) => (rtw: ReaderTaskEither<S, L, Array<R1>>): ReaderTaskEither<S, L, Array<R2>> =>
    undefined as any;

  // WOW
  const newArray: ReaderTaskEither<number, string, Array<number>> = traverseArray<number, number, number, string>(addState)(initArray);

  t.deepEqual(await newArray(0)(), right<string, Array<number>>([1,2,3,4]));
  t.deepEqual(await newArray(4)(), right<string, Array<number>>([5,6,7,8]));
});

