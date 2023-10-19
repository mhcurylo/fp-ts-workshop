---
title: Curry like you are Haskell.
...

---

# BEFORE

```
git clone https://github.com/mhcurylo/fp-ts-workshop
cd fp-ts-workshop
yarn install
gh auth status -t
export GITHUB_TOKEN=copy your github token here
yarn start
```

---

# Haskell. Brooks. Curry.

Three computer languages named after [Haskell Brooks Curry](https://wiki.haskell.org/wikiupload/8/86/HaskellBCurry.jpg)

---

# In Haskell, Curry

In Haskell:

```

add x y = x + y

add2 = add 2

add2 3


```

---

# In Javascript, Curry

```

const addUnCurry = (x, y) => x + y

// Curry
const addCurry = x => y => x + y;
const add2 = addCurry(2);

add2(3) == 5

```
---

# Curry like it is Haskell

Currying is a simple techninque, yet it allows one to achieve great things.

My goal is to show you how to use Currying in order to structure functional programms.

At the end of workshops I want you to know where to start if you want to write a fully fledged functional program in TypeScript.

---

# Plan

1. Look at some curried functions.

2. Look at a scary functional codebase written using fp-ts.

3. Unpack some of it by doing exercises.

4. Run a scary functional codebase written using fp-ts.

5. Break

6. Look at a scary functional codebase written using fp-ts.

7. Process what we have seen by summoning ReaderTaskEither's minions.

8. Refactor a scary functional codebase written using fp-ts.

9. QUIZ.

---

# The 0 ARTIY curried function.

```
type LazyArg<T> = () => T

type IO<T> = () => T

```

In Haskell everything is lazy so we do not need LazyArg and IO is actually another curried function, which would look like that:

```
type IO<T> = (rw: RealWorld) => [T, RealWorld]

```

---

# The 1 ARITY curried function

```
type Reader<S, T> = (s: S) => T

```

---

# More Curried stuff!

type ReaderIO<S, T> = (s: S) => () => T


---

# Lets get real!

```
open ./src/App.ts

```

---

# Lets unpack it!


```
open ./src/exercises/1.unpack.spec.ts
yarn test

```

---

# Okey, lets run the real stuff!

```
open ./src/index.ts

yarn start
```

---

# BREAK

Get a coffee, it will get worse.

---

# Lets look at services and the methods they use.

```
map
flatMap
traverseArray

```
---

# Exercise time!

```
open ./src/exercises/2.ReaderWriterTask.spec.ts
yarn test

```

---

# Now we get the realy difficult thing.

```
open ./src/gitworkflow.service.ts

```

Are all those functions curried?
How do you call that way of curring?

---

Why go functional?

1. It is a less subjective way to structure programms.
2. It is a more correct way to structure programms.

---

# QUIZ!

 What kind of monad is a function like that:

```
const  of<S, T> = (v: T) => (s: S) => () => v;

```
---

# QUIZ!

 How many possible implementations are there for this function:

```
type Fun<T> = (arg: T) => T

```
---

# QUIZ!

 What was Bastien's favourite function?

Bastien is a workhorse of a developer.

---

# QUIZ!

 What is Mateusz's fav function?

Mateusz enjoys when things stay the same.

---

# QUIZ!

 How many instances are there of Johnatan's fav function?

Johnatan likes types.
His favourite function is:

```
absurd: <T>(a: never) => T;

```
