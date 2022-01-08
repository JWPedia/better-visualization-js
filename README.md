# Auto-updating mathematical functions with dependency

The goal is a novice programmer to be easily be able to define mathematical variables as primitive literals - number, string, boolean - or as some function output of other primitive literals. 

We utilize ES6's object-oriented programming features to achieve this goal. From the user's perspective, they will create an instance of the `DataVault` class using the `createDataVault()` constructor function, passing in several mathematical variables. Then, they can interface easily with the `DataVault` class using class methods. 

```js
const createDataVault = (data) => {
	// Constructor goes here
}
```

The `data` parameter is a Javascript object (a set of name-value pairs) that follows the following format:

```js
let data = {
	"a": 1, 
	"b": [1, 2, 3], 
	"c": "a", 
	"d": {
		"func": ( x ) => x * 2,
		"param": "a"
	},
	"e": {
		"func": ( baseArr, exp ) => {
			return baseArr.map(i => i.Math.pow(exp))
		}
		"param": [ "b", 3 ]
	}, 
	"f": true,
	"g": "some string literal",
	"h": [ "a", 2, 3 ]
}
```

The above data object is equivalent to the following series of mathematical declarations:

$$
a = 1\\
b = [1, 2, 3]\\
c = a\\
d = a \times 2\\
e = [ (b_1)^3, (b_2)^3, (b_3)^3 ]\\
f = \text{True}\\
g = \text{``some string literal"},\\
h = [a, 2, 3]
$$

Note that these are *mathematical* variables, as opposed to *computer programming* variables. This means that if the user updates the value of $a$, then the value of $c$ and $d$ will be updated accordingly. If the user updates the value of $b$ to $[2, 3, 4]$, then the value of $e$ will change from $[ 1, 8, 27 ]$ to $[8, 27, 64]$. 

In addition, as $f$ and $g$ shows, a `DataVault` can contain other types of javascript primitives such as boolean or string literals. After all, `data` is simply a Javascript object. Note that string literals' value **must be different from the name of all other mathematical variables**, otherwise it will be considered similar to how $c$ is treated. 

From the user's perspective, they interface with an instance of `DataVault` with the following functions:

```js
let dv = createDataVault(data);
dv.get(c);
dv.set(a, 2);
```

**Warning:**

1. **Retrieving the value of $c$ using the default syntax `dv.c` will return the string "c", instead of the number 1.**
2. **Setting the value of $a$ using the default syntax `dv.a = 2` will not update the value of all other variables dependent on $a$, such as $h$.**

If the user used some of the default set syntax such as `dv.a = 2`, then they may update all values to be up-to-date using the `dv.updateAll()` function. 

**Another warning: Cyclic dependency WILL result in an infinite loop.**