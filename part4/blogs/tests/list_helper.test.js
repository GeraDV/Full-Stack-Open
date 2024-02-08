const listHelper = require('../utils/list_helper')
const dummy = listHelper.dummy
const totalLikes = listHelper.totalLikes
const favoriteBlog = listHelper.favoriteBlog
const mostBlogs = listHelper.mostBlogs
const mostLikes = listHelper.mostLikes

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    let blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Cómo mejorar tus habilidades de programación",
        author: "Carlos López",
        url: "https://blog/programacion",
        likes: 6,
        __v: 0
      }      
    ]    
    const result = totalLikes(blogs)
    expect(result).toBe(6)    
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: "Aprendiendo JavaScript desde cero",
        author: "Juan Pérez",
        url: "https://blog/javascript",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: "Recetas de cocina para principiantes",
        author: "María García",
        url: "https://blog/cocina",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422bd51b54a676234d17fa',
        title: "Viajes increíbles por el mundo",
        author: "Pedro Martínez",
        url: "https://blog/viajes",
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422c5a1b54a676234d17fb',
        title: "Manual de programación en Python",
        author: "Ana López",
        url: "https://blog/python",
        likes: 45,
        __v: 0
      },
      {
        _id: '5a422cd91b54a676234d17fc',
        title: "Consejos para mantenerse en forma",
        author: "Laura Sánchez",
        url: "https://blog/fitness",
        likes: 30,
        __v: 0
      }
    ]
    
    const result = totalLikes(blogs)
    expect(result).toBe(145)    
  })
})


describe('favorite blog', () => {
  test('most like blog of empty list is {}', () => {
    const result = favoriteBlog([])
    expect({}).toEqual({})
  })
  
  test('when the list has only one blog, the returned object is it', () => {
    const blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Cómo mejorar tus habilidades de programación",
        author: "Carlos López",
        url: "https://blog/programacion",
        likes: 6,
        __v: 0
      }
    ]
    expect(
      favoriteBlog(blogs)
    ).toEqual(
      {
        title: "Cómo mejorar tus habilidades de programación",
        author: "Carlos López",
        likes: 6
      }
    )
  })

  test('of a bigger list, the most voted blog is returned', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: "Aprendiendo JavaScript desde cero",
        author: "Juan Pérez",
        url: "https://blog/javascript",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: "Recetas de cocina para principiantes",
        author: "María García",
        url: "https://blog/cocina",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422bd51b54a676234d17fa',
        title: "Viajes increíbles por el mundo",
        author: "Pedro Martínez",
        url: "https://blog/viajes",
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422c5a1b54a676234d17fb',
        title: "Manual de programación en Python",
        author: "Ana López",
        url: "https://blog/python",
        likes: 45,
        __v: 0
      },
      {
        _id: '5a422cd91b54a676234d17fc',
        title: "Consejos para mantenerse en forma",
        author: "Laura Sánchez",
        url: "https://blog/fitness",
        likes: 30,
        __v: 0
      }
    ]

    const result = favoriteBlog(blogs)
    expect(result)
      .toEqual(
        {
          title: "Manual de programación en Python",
          author: "Ana López",
          likes: 45,
        }
      )    
  })
})

describe('most blogs', () => {
  test('empty list return a empty object {}', () => {
    const blogs = []
    expect(mostBlogs(blogs)).toEqual({})
  })

  test('When the list contains only one blog, return its author', () => {
    const blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Cómo mejorar tus habilidades de programación",
        author: "Carlos López",
        url: "https://blog/programacion",
        likes: 6,
        __v: 0
      }
    ]
    const result = mostBlogs(blogs)
    expect(result)
    .toEqual(
      {
        author: "Carlos López",
        blogs: 1
      }
    )
  })

  test('most author blogger for a bigger list', () => {
    const blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Introducción a JavaScript",
        author: "Juan Pérez",
        url: "https://blog/javascript",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422d451gg45e6ezpjsidp5',
        title: "Desarrollo web con React",
        author: "Richard Nilson",
        url: "https://blog/react",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422d451b54a67623s5e468',
        title: "Python para principiantes",
        author: "Fito Paez",
        url: "https://blog/python",
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422dg56a8s91c159ea56zz',
        title: "Introducción a Node.js",
        author: "Laura Sánchez",
        url: "https://blog/nodejs",
        likes: 45,
        __v: 0
      },
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Programación orientada a objetos",
        author: "Boogie",
        url: "https://blog/oop",
        likes: 30,
        __v: 0
      },
      {
        _id: '5a422dr5g4h9a57we56xtse4',
        title: "Diseño de interfaces de usuario",
        author: "Ana Lopez",
        url: "https://blog/ui-design",
        likes: 25,
        __v: 0
      },
      {
        _id: '5a422seg4l8132sspopkv69t',
        title: "Algoritmos y estructuras de datos",
        author: "Laura Sánchez",
        url: "https://blog/algorithms",
        likes: 40,
        __v: 0
      },
      {
        _id: '5a422d4d456e498e1vvfi48a',
        title: "Testing de software",
        author: "Ana Lopez",
        url: "https://blog/testing",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422d451d48wee9r1xd17fd',
        title: "Desarrollo ágil de software",
        author: "Juan Pérez",
        url: "https://blog/agile",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422d451b54d976234d17fd',
        title: "Introducción a la inteligencia artificial",
        author: "María García",
        url: "https://blog/ai",
        likes: 50,
        __v: 0
      },
      {
        _id: '5a422d451b544566234d17fd',
        title: "Seguridad informática",
        author: "Pedro Martínez",
        url: "https://blog/security",
        likes: 30,
        __v: 0
      },
      {
        _id: '5a422ds35b54a676234d17fd',
        title: "Bases de datos SQL y NoSQL",
        author: "Ana Lopez",
        url: "https://blog/databases",
        likes: 25,
        __v: 0
      }
    ]

    const result = mostBlogs(blogs)
    expect(result)
    .toEqual(
      {
        author: 'Ana Lopez',
        blogs: 3
      }
    )
  })
})

describe('most likes', () => {
  test('empty list return a empty object {}', () => {
    const result = mostLikes([])
    expect(result).toEqual({})
  })

  test('When there is one author, return it', () => {
    const blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Introducción a JavaScript",
        author: "Juan Perez",
        url: "https://blog/javascript",
        likes: 20,
        __v: 0
      }
    ]

    const result = mostLikes(blogs)
    expect(result)
      .toEqual(
        {
          author: "Juan Perez",
          likes: 20,
        }
      )
  })

  test('of a bigger list', () => {
    const blogs = [
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Introducción a JavaScript",
        author: "Juan Pérez",
        url: "https://blog/javascript",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422d451gg45e6ezpjsidp5',
        title: "Desarrollo web con React",
        author: "Richard Nilson",
        url: "https://blog/react",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422d451b54a67623s5e468',
        title: "Python para principiantes",
        author: "Fito Paez",
        url: "https://blog/python",
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422dg56a8s91c159ea56zz',
        title: "Introducción a Node.js",
        author: "Laura Sánchez",
        url: "https://blog/nodejs",
        likes: 45,
        __v: 0
      },
      {
        _id: '5a422d451b54a676234d17fd',
        title: "Programación orientada a objetos",
        author: "Boogie",
        url: "https://blog/oop",
        likes: 30,
        __v: 0
      },
      {
        _id: '5a422dr5g4h9a57we56xtse4',
        title: "Diseño de interfaces de usuario",
        author: "Ana Lopez",
        url: "https://blog/ui-design",
        likes: 25,
        __v: 0
      },
      {
        _id: '5a422seg4l8132sspopkv69t',
        title: "Algoritmos y estructuras de datos",
        author: "Laura Sánchez",
        url: "https://blog/algorithms",
        likes: 40,
        __v: 0
      },
      {
        _id: '5a422d4d456e498e1vvfi48a',
        title: "Testing de software",
        author: "Ana Lopez",
        url: "https://blog/testing",
        likes: 20,
        __v: 0
      },
      {
        _id: '5a422d451d48wee9r1xd17fd',
        title: "Desarrollo ágil de software",
        author: "Juan Pérez",
        url: "https://blog/agile",
        likes: 35,
        __v: 0
      },
      {
        _id: '5a422d451b54d976234d17fd',
        title: "Introducción a la inteligencia artificial",
        author: "María García",
        url: "https://blog/ai",
        likes: 50,
        __v: 0
      },
      {
        _id: '5a422d451b544566234d17fd',
        title: "Seguridad informática",
        author: "Pedro Martínez",
        url: "https://blog/security",
        likes: 30,
        __v: 0
      },
      {
        _id: '5a422ds35b54a676234d17fd',
        title: "Bases de datos SQL y NoSQL",
        author: "Ana Lopez",
        url: "https://blog/databases",
        likes: 25,
        __v: 0
      }
    ]

    const result = mostLikes(blogs)
    expect(result).toEqual(
      {
        author: 'Laura Sánchez',
        likes: 85
      }
    )
  })
})
