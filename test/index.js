import test from 'ava'
import { CLIEngine } from 'eslint'
import eslintrc from '../eslintrc.json'

const cli = new CLIEngine({
  useEslintrc: false,
  baseConfig: eslintrc,
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'eol-last': 0
  }
})

const lint = text => {
  const linter = cli.executeOnText(text)
  return linter.results[0]
}

test('disallow line longer than 100 characters', t => {
  const result = lint(
    "const books = ['JavaScript: The Good Parts', 'ES6 & Beyond', 'Eloquent JavaScript A Modern Introduction to Programming']"
  )
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'max-len')
})

test('prefer const', t => {
  const result = lint("let foo = 'bar'")
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'prefer-const')
})

test('disallow var', t => {
  const result = lint("var foo = 'bar'")
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'no-var')
})

test('jsx expect single quotes', t => {
  const result = lint('const foo = () => <div id="bar" />')
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'jsx-quotes')
})

test('focused test are not allowed', t => {
  const result = lint('test.only(() => { /**/ })')
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'jest/no-focused-tests')
})

test('disallows a11y violations', t => {
  const result = lint("const image = <img src='image.png' />")
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'jsx-a11y/alt-text')
})

test('makes exception for jsx-a11y label-has-for rule', t => {
  const result = lint(
    `const template = <div><label htmlFor='checkbox'>label</label>
  <input id='checkbox' type='checkbox' /></div>`
  )
  t.is(result.errorCount, 0)
})

test('ignores no autofocus jsx-a11y linter rule', t => {
  const result = lint("const template = <input type='email' autoFocus />")
  t.is(result.errorCount, 0)
})

test('disallow map with key index', t => {
  const result = lint(
    `const foo = ['1', '2', '3']
const template = foo.map((num, index) => { return <div key={index}>{num}</div> })`
  )
  t.is(result.errorCount, 1)
  t.is(result.messages[0].ruleId, 'react/no-array-index-key')
})
