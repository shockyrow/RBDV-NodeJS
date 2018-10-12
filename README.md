# RBDV for NodeJS

Advanced Rule-Based Data Validator for NodeJS. [https://iiiniii.github.io/RBDV-NodeJS](https://iiiniii.github.io/RBDV-NodeJS)

[![Build Status](https://travis-ci.org/IIINIII/RBDV-NodeJS.svg?branch=master)](https://travis-ci.org/IIINIII/RBDV-NodeJS)
[![Build Status](http://img.badgesize.io/https://unpkg.com/@ibrokhim/rbdv/?compression=gzip&amp;label=size&amp;maxAge=300)](https://unpkg.com/@ibrokhim/rbdv/)
[![Build Status](https://img.shields.io/npm/v/@ibrokhim/rbdv.svg?label=version&colorB=007ec6&maxAge=300)](./package.json)
[![Build Status](https://img.shields.io/npm/l/@ibrokhim/rbdv.svg?maxAge=300)](./LICENSE)
<!--<a href="https://npmjs.org/package/@ibrokhim/rbdv">
​    <img src="https://img.shields.io/npm/dm/@ibrokhim/rbdv.svg">
</a>-->

## About

Let's say you are receiving a JavaScript object in your application and for using the data without a problem you have to use something like  `if(data != null)`  or  `if(data != undefined)`  each time you want to access the data's value. I know it is so annoying. Well not anymore. Using this package you can now easily create rules for the data you receive and validate it. It is like a dream, I know but, not anymore.

## Features

- **[NEW]** Create rule out of an example object 
- Verbose validation results
- Great, advanced, easy to use and flexible configuration
- Useful in any project
- Many useful functions
- Supported data types: String, Number, Array, Function, Object, Null, Undefined, Boolean, RegExp, Error, Date, Symbol
- User-friendly feedbacks
- In case of invalid data user-friendly report

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install --save @ibrokhim/rbdv
# or
npm i --save @ibrokhim/rbdv
```

Check examples below on how to use this package in your project.

## Quick Start

Install package using command below:

```bash
npm install --save @ibrokhim/rbdv
```

Add the following line to the top of your JavaScript file:

```javascript
const RBDV = require('@ibrokhim/rbdv');
```

Create an instance of RBDV:

```javascript
var rbdv = new RBDV();
```

Set your rules for validation:

```javascript
rbdv.setRules(rules);
```

If you want verbose results, then:

```javascript
rbdv.setVerbose(true); // dafault: false
```

And now it is time to validate our data:

```javascript
rbdv.isValid(data, subRuleName); // Returns true if data is valid
```

If you prefer single-use validation, you can do something like this:

```javascript
rbdv.validate(data, rule); // Returns true if data is valid
```

You can also create a rule out of an example object:

```javascript
rbdv.makeRule({
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true
});
```

Returns:

```bash
{
    type: 'object',
    props: {
        name: { type: 'string' },
        surname: { type: 'string' },
        isActive: { type: 'boolean' }
    }
}
```

## How to Use

### Rules Example

You can get an example configuration object in JSON format by running command below:

```javascript
rbdv.exampleRule();
```

Returns:

```javascript
{
    // A basic object configuration
    'chat_data': {
        type: 'object',
        props: {
            to: {type: 'string'},
            from: {type: 'string'},
            msg: {type: 'string'}
        }
    },

    // A basic string configuration
    'username': {
        type: 'string'
    },

    // A basic number configuration
    'age': {
        type: 'number'
    },

    // A little bit more complex configuration
    'user_data_complex': {
        type: 'object',
        props: {
            name: {type: 'string'},
            surname: {type: 'string'},
            isActive: {type: 'boolean'},
            contact_info: {
                type: 'object',
                props: {
                    email: {type: 'string'},
                    phone: {type: 'string'}
                }
            }
        }
    }
}
```

### Usage Examples

Example using a simple configuration:

```javascript
var RBDV = require("@ibrokhim/rbdv");
var rules = {
    // A basic string configuration
    'username': {
        type: 'string'
    },

    // A basic number configuration
    'id': {
        type: 'number'
    },
};

var rbdv = new RBDV(rules, true); // RBDV(rules, is_verbose)

console.log('Test #1:');
var data = "admin";
console.log(rbdv.isValid(data, 'username'));

console.log('\nTest #2:');
data = 123;
console.log(rbdv.isValid(data, 'id'));

console.log('\nTest #3:');
data = 321;
console.log(rbdv.isValid(data, 'username'));

console.log('\nTest #4:');
data = "asdf";
console.log(rbdv.isValid(data, 'id'));
```

Output:

```
Test #1:
true

Test #2:
true

Test #3:
-----------Validator Error-----------
Object Path: data
Expected: string
Got: number
Value: 321
-------------------------------------
false

Test #4:
-----------Validator Error-----------
Object Path: data
Expected: number
Got: string
Value: asdf
-------------------------------------
false
```

Example using much more complex configuration:

```javascript
var RBDV = require("@ibrokhim/rbdv");
var rules = {
    'user_detail': {
        type: 'object',
            props: {
            name: {type: 'string'},
            surname: {type: 'string'},
            isActive: {type: 'boolean'},
            contact_info: {
                type: 'object',
                    props: {
                    email: {type: 'string'},
                    phone: {type: 'string'}
                }
            }
        }
    }
};

var rbdv = new RBDV(rules, true); // RBDV(rules, is_verbose)

console.log('Test #1:');
var data = {
    'name': 'Tom',
    'surname': 'Jerry'
};
console.log(rbdv.isValid(data, 'user_detail'));

console.log('\nTest #2:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: 'tom.jerry@example.com'
};
console.log(rbdv.isValid(data, 'user_detail'));

console.log('\nTest #3:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com'
    }
};
console.log(rbdv.isValid(data, 'user_detail'));

console.log('\nTest #4:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com',
        'phone': '5556667777'
    }
};
console.log(rbdv.isValid(data, 'user_detail'));
```

Output:

```
Test #1:
-----------Validator Error-----------
Object Path: data.isActive
Expected: boolean
Got: undefined
Value: undefined
-------------------------------------
-----------Validator Error-----------
Object Path: data.contact_info
Expected: object
Got: undefined
Value: undefined
-------------------------------------
false

Test #2:
-----------Validator Error-----------
Object Path: data.contact_info
Expected: object
Got: string
Value: tom.jerry@example.com
-------------------------------------
false

Test #3:
-----------Validator Error-----------
Object Path: data.contact_info.phone
Expected: string
Got: undefined
Value: undefined
-------------------------------------
false

Test #4:
true
```

Example using single-use configuration:

```javascript
var RBDV = require("@ibrokhim/rbdv");
var rbdv = new RBDV();
var singleUseRule = {
    type: 'object',
    props: {
        name: {type: 'string'},
        surname: {type: 'string'},
        isActive: {type: 'boolean'},
        contact_info: {
            type: 'object',
            props: {
                email: {type: 'string'},
                phone: {type: 'string'}
            }
        }
    }
};
var data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com',
        'phone': '5556667777'
    }
};

rbdv.setVerbose(true);

console.log(rbdv.validate(data, singleUseRule));
```

Output:

```
true
```

## License

[MIT](https://github.com/IIINIII/RBDV-NodeJS/blob/master/LICENSE)

## Support or Contact
Having trouble with this package? [Contact me](https://github.com/IIINIII) and I’ll help you sort it out.