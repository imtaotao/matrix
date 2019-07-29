## Matrix
[![NPM version][npm-image]][npm-url]

A html element matrix transform library.

### [CDN][cdn] 
`<script src="https://cdn.jsdelivr.net/gh/imtaotao/matrix/dist/matrix.min.js"></script>`

### API
The `Matrix` is a function, call this function will return a `Matrix object`. The `Matrix object` has the following API.

  + `Matrix: HTMLElement => matrix`
```js
  import Matrix from '@rustle/matrix'

  // Will get the initial matrix value of the element and return a matrix object
  const matrix = Matrix(document.getElementById('id'))

  // Will move 100px along the x axis and rotate 45 degrees
  matrix.translateX(100).rotateZ(45).to()

  // Continue move 200px along y-axis
  matrix.translateY(200).to()
```

#### rotate
  + `rotate3d(x: number, y: number, z: number, deg: number) : matrix`
  + `rotateX(deg: number) : matrix`
  + `rotateY(deg: number) : matrix`
  + `rotateZ(deg: number) : matrix`
  + `rotate(deg: number) : matrix`

#### translate
  + `translate3d(x: number, y: number, z: number) : matrix`
  + `translateX(x: number) : matrix`
  + `translateY(y: number) : matrix`
  + `translateZ(z: number) : matrix`
  + `translate(x: number, y: number) : matrix`

#### scale
  + `scale3d(x: number, y: number, z: number) : matrix`
  + `scaleX(x: number) : matrix`
  + `scaleY(y: number) : matrix`
  + `scaleZ(z: number) : matrix`
  + `scale(x: number, y: number) : matrix`

#### skew
  + `skew(x: number, y: number) : matrix`
  + `skewX(x: number) : matrix`
  + `skewY(y: number) : matrix`

#### set style to element
  + `to() : matrix`

#### update the value of the staging
  + `update() : matrix`

View all methods
```js
  import Matrix from '@rustle/matrix'
  console.log(Object.keys(Matrix(node).__proto__))
```

### Notes
  1. Since each matrix transformation is performed on the previous basis, So you need to call the `to` method to render the data to the view. But it's best to render after the final calculation of the data is complete, which can reduce the operation on dom.

  2. `Matrix` will cache the value of each conversion, which will reduce the value of the matrix in the dom, but sometimes the matrix of dom will change for other reasons. At this point, we can call the `updat`e method to update the cache value in `Matrix`.

[npm-url]: https://www.npmjs.com/package/@rustle/matrix
[npm-image]: https://img.shields.io/npm/v/@rustle/matrix.svg?style=flat-square
[cdn]: https://cdn.jsdelivr.net/gh/imtaotao/matrix/dist/matrix.min.js