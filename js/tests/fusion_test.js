export const tests = []
const t = (f) => tests.push(f)

// simple numbers
t(({ eq }) => eq(fusion({ nbr: 12 }, { nbr: 23 }).nbr, 35))

// handle 0
t(({ eq }) => eq(fusion({ nbr: 0 }, { nbr: 23 }).nbr, 23))
t(({ eq }) => eq(fusion({ nbr: 23 }, { nbr: 0 }).nbr, 23))

// multiply numbers
t(({ eq }) =>
  eq(fusion({ a: 12, b: 2, c: 43 }, { a: 23, b: 2 }), { a: 35, b: 4, c: 43 }),
)

// simple string
t(({ eq }) => eq(fusion({ str: 'hello' }, { str: 'there' }).str, 'hello there'))

// handle empty strings
t(({ eq }) => eq(fusion({ str: 'hello' }, { str: '' }).str, 'hello '))

// multiple strings
t(({ eq }) =>
  eq(fusion({ a: 'A', b: 'B', c: 'C' }, { a: 'B', b: 'C' }), {
    a: 'A B',
    b: 'B C',
    c: 'C',
  }),
)

// simple arrays
t(({ eq }) => eq(fusion({ arr: [1, '2'] }, { arr: [2] }).arr, [1, '2', 2]))

// multiple arrays
t(({ eq }) =>
  eq(
    fusion(
      { arr: [], arr1: [1] },
      { arr: [12, 3], arr1: [2, 3], arr2: ['2', '1'] },
    ),
    { arr: [12, 3], arr1: [1, 2, 3], arr2: ['2', '1'] },
  ),
)

// different matching
t(({ eq }) => eq(fusion({ a: { b: 1 } }, { a: 1 }).a, 1))
t(({ eq }) => eq(fusion({ a: 1 }, { a: { b: 1 } }).a, { b: 1 }))
t(({ eq }) => eq(fusion({ a: [1, 2] }, { a: 1 }).a, 1))
t(({ eq }) => eq(fusion({ a: 'str' }, { a: 1 }).a, 1))

// deep nested objects
t(({ eq }) =>
  eq(
    fusion(
      { a: { b: [1, 2], c: { d: 2 } } },
      { a: { b: [0, 2, 1], c: { d: 23 } } },
    ),
    { a: { b: [1, 2, 0, 2, 1], c: { d: 25 } } },
  ),
)

// object mutability
t(({ eq }) =>
  eq(
    fusion(Object.freeze({ a: { b: 1 } }), Object.freeze({ a: { b: 2 } })).a.b,
    3,
  ),
)

// other types
t(({ eq }) => eq(fusion({ reg: /\w/ }, { reg: /\S/ }).reg, /\S/))
t(({ eq }) => {
  const set = new Set([1, 2, 3])
  return eq(fusion({ a: 1, set: new Set([4, 5, 6]) }, { a: 1, set }), {
    a: 2,
    set,
  })
})

Object.freeze(tests)
