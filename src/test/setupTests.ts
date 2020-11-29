import 'regenerator-runtime/runtime.js'

const error = console.error

console.error = function (message: any) {
  error.apply(console, arguments) // keep default behaviour
  throw message instanceof Error ? message : new Error(message)
}

const warn = console.warn

console.warn = function (message: any) {
  warn.apply(console, arguments) // keep default behaviour
  throw message instanceof Error ? message : new Error(message)
}
