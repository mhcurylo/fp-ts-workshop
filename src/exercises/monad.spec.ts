import test from 'ava';


// WELCOME THE IO MONAD!

type IO<T> = () => T;

test.skip('Unpack THE IO ', t => {

  const io4: IO<number> = () => 4;


  // IMPLEMENT

  const unpack: <T>(io: IO<T>) => T = undefined as any;

  // DO NOT TOUCH

  t.is(unpack(io4), 4)
});

type Reader<S, T> = (s: S) => T;

test.skip('Unpack the Reader', t => {
  const reader4: Reader<string, number> = (s: string) => 4;

  // IMPLEMENT

  const unpack: <S, T>(r: Reader<S, T>, state: S) => T = undefined as any;

  // DO NOT TOUCH

  t.is(unpack(reader4, 'UNPACK ME!'), 4)

  // IMPLEMENT

  const ask: <S>() => Reader<S, S> = () => undefined as any;

  // DO NOT TOUCH

  t.is(unpack(ask(), 'UNPACKED?!'), 'UNPACKED?!')
});

