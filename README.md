Repo for fp-ts workshop.

Curry like it is Haskell.

Haskell Curry gave his name to the computer langugage haskell and currying in math.


Haskell:

```

add x y = x + y

add2 = add 2


# add2 3 == 5

```


```

const addUncurry = (x, y) => x + y

// Curry
const add = x => y => x + y;
const add2 = add(2);

// add2(3) == 5

```

This is where we often begin and end introductions to FP.

My goal is to show you how to structure functional programms.
