// Example data used in README
let data = {
	"a": 1,
	"b": [1, 2, 3],
	"c": "a",
	"d": {
		"func": ( x ) => x * 2,
		"param": "a"
	},
	"e": {
		"func": (  [ baseArr, exp ]  ) => {
			return baseArr.map(i => Math.pow(i, exp));
		},
		"param": [ "b", 3 ]
	},
	"f": true,
	"g": "some string literal",
	"h": [ "a", 2, 3 ]
}

// Datavault constructor
const createDataVault = (data) => {
	let obj = {};
	obj.data = data;

	obj.get = name => {
		// Sanity checks
		assert(typeof(name) === "string", "Pass a String into get().");
		assert((name in obj.data), "Given key is not in vault.");

		const value = obj.data[name];
		switch (typeof value) {
			case 'string':
				if (!(value in obj.data)) return value;
				else return obj.get(value);
			case 'object':
				if (Array.isArray(value)) {
					return value.map(i => {
						if (typeof(i) === "string") return obj.get(i);
						else return i;
					});
				} else if (isFunction(value)) {
					if (Array.isArray(value.param)) {
						return value.func(value.param.map(
							i => {
								if (typeof(i) === 'string') return obj.get(i);
								else return i;
							}
						));
					} else return value.func(
						typeof(value.param) === 'string' ? obj.get(value.param) : value.param
					);
				} else return value;
			default:
				return value;
		}
	};

	obj.set = (name, newValue) => {
		obj.data[name] = newValue;
	};

	return obj;
}

// Checks if object has valid "func" and "param" fields. 
const isFunction = data => {
	if (!("func" in data)) return false;
	if (!("param" in data)) return false;
	if (typeof(data.func) !== "function") return false;
	return true;
}

// Handles assertions
const assert = (condition, message) => {
	if (!condition) throw new Error(message || "Assertion failed");
}

// Main function
if (require.main === module) {
	console.log("DataVault test.");
	console.log("Constructing DataVault");
	let dv = createDataVault(data);
	console.log(dv);
	console.log("Testing getter.");
	console.log("a:", dv.get("a"));
	console.log("b:", dv.get("b"));
	console.log("c:", dv.get("c"));
	console.log("d:", dv.get("d"));
	console.log("e:", dv.get("e"));
	console.log("f:", dv.get("f"));
	console.log("g:", dv.get("g"));
	console.log("h:", dv.get("h"));
	console.log("Calling some setters.");
	dv.set("a", 2);
	dv.set("b", [2, 3, 4]);
	console.log("Updated values:");
	console.log("a:", dv.get("a"));
	console.log("b:", dv.get("b"));
	console.log("c:", dv.get("c"));
	console.log("d:", dv.get("d"));
	console.log("e:", dv.get("e"));
	console.log("f:", dv.get("f"));
	console.log("g:", dv.get("g"));
	console.log("h:", dv.get("h"));
}
