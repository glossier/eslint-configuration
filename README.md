# Glossier's JavaScript styleguide
We are following [JavaScript Standard Style](https://standardjs.com), with [some additional guidelines](#additional-guidelines). We are also extending the [react](https://github.com/yannickcr/eslint-plugin-react), [jest](https://github.com/jest-community/eslint-plugin-jest), and [jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) ESLint plugins with the recommended configuration.

## Installation
```
yarn add --dev eslint@^4.19.1 @glossier/eslint-config
```

## Usage
To get started, extend Glossier's configuration in your `.eslintrc`.

```
{
  "extends": "@glossier"
}
```

That's it -- you can now lint your code.

```
./node_modules/.bin/eslint .
```

## Additional Guidelines
As mentioned above, we are following [JavaScript Standard Style](https://standardjs.com), with the following extra rules:

### max-len
We define a maximum line length of `100` characters.

```js
// bad
const books = ['JavaScript: The Good Parts', 'Eloquent JavaScript A Modrn Introduction to Programming']

// good
const books = [
  'JavaScript: The Good Parts',
  'Eloquent JavaScript A Modrn Introduction to Programming'
]
```

### prefer-const
Prefer using `const` over `let` or `var`.

```js
// bad
let a = 1

// good
const a = 1
```

### no-var
Prefer using `let` over `var`.

```js
// bad
var foo = 'bar'
foo = 'baz'

// good
let foo = 'bar'
foo = 'baz'
```


## License
Copyright 2018 Glossier Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
