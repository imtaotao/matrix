var Matrix = (function () {
  function assert (val) {
    if (typeof val !== 'number' || isNaN(val)) {
      throw TypeError('The parameter must be of type number.')
    }
  }

  // get element matrix value
  function getElementMatrix (element) {
    var defaultValue = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    if (!element) {
      return defaultValue
    }

    var matrix = getComputedStyle(element).transform
    if (!matrix || matrix === 'none') {
      return defaultValue
    }

    matrix = (/(\w+\()([^\)]+)/g.exec(matrix))[2].split(',').map(function (v) {
      return Number(v)
    })

    // 2d and 3d compatible processing
    if(matrix.length < 7) {
      matrix = [matrix[0], matrix[1], 0, 0, matrix[2], matrix[3], 0, 0, 0, 0, 1, 0, matrix[4], matrix[5], 0, 1]
    }
    return matrix
  }

  // matrix class
  function MatrixClass (element) {
    if (!element) {
      throw Error('You must pass in one element.')
    }
    this.element = element
    this.value = getElementMatrix(element)
  }

  // rotate
  MatrixClass.prototype.rotate3d = function (x, y, z, deg) {
    assert(x)
    assert(y)
    assert(z)
    assert(deg)

    var matrix = this.value
    var agl = Math.PI * deg / 180
    var numSqrt = Math.sqrt(x * x + y * y + z * z)
    var cos = Math.cos(agl)
    var sin = Math.sin(agl)
    var ux = x / numSqrt
    var uy = y / numSqrt
    var uz = z / numSqrt
    var negative = 1 - cos

    var r0 = ux * ux * negative + cos,
        r1 = ux * uy * negative + uz * sin,
        r2 = ux * uz * negative - uy * sin,
        r4 = ux * uy * negative - uz * sin,
        r5 = uy * uy * negative + cos,
        r6 = uz * uy * negative + ux * sin,
        r8 = ux * uz * negative + uy * sin,
        r9 = uy * uz * negative - ux * sin,
        r10 = uz * uz * negative + cos

    var d0 = matrix[0] * r0 + matrix[4] * r1 + matrix[8] * r2,
        d1 = matrix[1] * r0 + matrix[5] * r1 + matrix[9] * r2,
        d2 = matrix[2] * r0 + matrix[6] * r1 + matrix[10] * r2,
        d3 = matrix[3] * r0 + matrix[7] * r1 + matrix[11] * r2,
        d4 = matrix[0] * r4 + matrix[4] * r5 + matrix[8] * r6,
        d5 = matrix[1] * r4 + matrix[5] * r5 + matrix[9] * r6,
        d6 = matrix[2] * r4 + matrix[6] * r5 + matrix[10] * r6,
        d7 = matrix[3] * r4 + matrix[7] * r5 + matrix[11] * r6,
        d8 = matrix[0] * r8 + matrix[4] * r9 + matrix[8] * r10,
        d9 = matrix[1] * r8 + matrix[5] * r9 + matrix[9] * r10,
        d10 = matrix[2] * r8 + matrix[6] * r9 + matrix[10] * r10,
        d11 = matrix[3] * r8 + matrix[7] * r9 + matrix[11] * r10

    this.value = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, matrix[12], matrix[13], matrix[14], matrix[15]]
    return this
  }

  MatrixClass.prototype.rotateX = function (deg) {
    return this.rotate3d(1, 0, 0, deg)
  }

  MatrixClass.prototype.rotateY = function (deg) {
    return this.rotate3d(0, 1, 0, deg)
  }

  MatrixClass.prototype.rotateZ = function (deg) {
    return this.rotate3d(0, 0, 1, deg)
  }

  MatrixClass.prototype.rotate = function (deg) {
    return this.rotate3d(0, 0, 1, deg)
  }

  // translate
  MatrixClass.prototype.translate3d = function (x, y, z) {
    assert(x)
    assert(y)
    assert(z)

    var matrix = this.value
    var c12 = x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12],
        c13 = x * matrix[1] + y * matrix[5] + z * matrix[9] + matrix[13],
        c14 = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14],
        c15 = x * matrix[3] + y * matrix[7] + z * matrix[11] + matrix[15]
  
    this.value = [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6], matrix[7], matrix[8], matrix[9], matrix[10], matrix[11], c12, c13, c14, c15]
    return this
  }

  MatrixClass.prototype.translateX = function (x) {
    return this.translate3d(x, 0, 0)
  }

  MatrixClass.prototype.translateY = function (y) {
    return this.translate3d(0, y, 0)
  }

  MatrixClass.prototype.translateZ = function (z) {
    return this.translate3d(0, 0, z)
  }

  MatrixClass.prototype.translate = function (x, y) {
    return this.translate3d(x, y, 0)
  }

  // scale
  MatrixClass.prototype.scale3d = function (x, y, z) {
    assert(x)
    assert(y)
    assert(z)

    var matrix = this.value
    var s0 = matrix[0] * x, s4 = matrix[4] * y, s8 = matrix[8] * z,
        s1 = matrix[1] * x, s5 = matrix[5] * y, s9 = matrix[9] * z,
        s2 = matrix[2] * x,	s6 = matrix[6] * y, s10 = matrix[10] * z,
        s3 = matrix[3] * x, s7 = matrix[7] * y, s11 = matrix[11] * z

    this.value = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, matrix[12], matrix[13], matrix[14], matrix[15]]
    return this
  }

  MatrixClass.prototype.scaleX = function (x) {
    return this.scale3d(x, 1, 1)
  }

  MatrixClass.prototype.scaleY = function(y) {
    return this.scale3d(1, y, 1)
  }

  MatrixClass.prototype.scaleZ = function (z) {
    return this.scale3d(1, 1, z)
  }

  // skew
  MatrixClass.prototype.scale = function (x, y) {
    return this.scale3d(x, y, 1)
  }

  MatrixClass.prototype.skew = function (x, y) {
    assert(x)
    assert(y)
    
    var matrix = this.value
    var	xtan = Math.tan(Math.PI * x / 180)
    var	ytan = Math.tan(Math.PI * y / 180)

    var f0 = matrix[0] + matrix[4] * ytan,
        f1 = matrix[1] + matrix[5] * ytan,
        f2 = matrix[2] + matrix[6] * ytan,
        f3 = matrix[3] + matrix[7] * ytan,
        f4 = matrix[0] * xtan + matrix[4],
        f5 = matrix[1] * xtan + matrix[5],
        f6 = matrix[2] * xtan + matrix[6],
        f7 = matrix[3] * xtan + matrix[7]

    this.value = [f0, f1, f2, f3, f4, f5, f6, f7, matrix[8], matrix[9], matrix[10], matrix[11], matrix[12], matrix[13], matrix[14], matrix[15]]
    return this
  }

  MatrixClass.prototype.skewX = function (x) {
    return this.skew(x, 0)
  }

  MatrixClass.prototype.skewY = function (y) {
    return this.skew(0, y)
  }

  // set style
  MatrixClass.prototype.to = function () {
    this.element.style.transform = 'matrix3d('+ this.value.join(',') +')'
    return this
  }

  // update matrix value
  MatrixClass.prototype.update = function () {
    this.value = getElementMatrix(this.element)
    return this
  }

  return function (element) {
    return new MatrixClass(element)
  } 
})()
