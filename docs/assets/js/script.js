let gdoc
function makeElement(type,body,...cssClasses) {
  let i = document.createElement(type)
  i.innerText = body
  let classes = cssClasses[0].split(' ')
  for (let x of classes) {
    i.classList.add(x)
  }
  return i
}

let pokemon = {
  types: {
    normal: {
      weak: ['fighting'],
      effective: [],
      noDamage: ['ghost']
    },
    fire: {
      weak: ['water','ground','rock'],
      effective: ['bug','steel','grass','ice'],
      noDamage: []
    },
    water: {
      weak: ['grass','electric'],
      effective: ['ground','rock','fire'],
      noDamage: []
    },
    electric: {
      weak: ['ground'],
      effective: ['flying','water'],
      noDamage: []
    },
    grass: {
      weak: ['flying','poison','bug','fire','ice'],
      effective: ['ground','rock','water'],
      noDamage: []
    },
    ice: {
      weak: ['fighting','rock','steel','fire'],
      effective: ['flying','ground','grass','dragon'],
      noDamage: []
    },
    fighting: {
      weak: ['flying','psychic','fairy'],
      effective: ['normal','rock','steel','ice','dark'],
      noDamage: []
    },
    poison: {
      weak: ['ground','psychic'],
      effective: ['grass','fairy'],
      noDamage: []
    },
    ground: {
      weak: ['water','grass','ice'],
      effective: ['poison','rock','steel','fire','electric'],
      noDamage: ['electric']
    },
    flying: {
      weak: ['rock','electric','ice'],
      effective: ['fighting','bug','grass'],
      noDamage: ['ground']
    },
    psychic: {
      weak: ['bug','ghost','dark'],
      effective: ['fighting','poison'],
      noDamage: []
    },
    bug: {
      weak: ['flying','rock','fire'],
      effective: ['grass','psychic','dark'],
      noDamage: []
    },
    rock: {
      weak: ['fighting','ground','steel','water','grass'],
      effective: ['flying','bug','fire','ice'],
      noDamage: []
    },
    ghost: {
      weak: ['ghost','dark'],
      effective: ['ghost','psychic'],
      noDamage: ['normal','fighting']
    },
    dragon: {
      weak: ['ice','dragon','fairy'],
      effective: ['dragon'],
      noDamage: []
    },
    dark: {
      weak: ['fighting','bug','fairy'],
      effective: ['ghost','psychic'],
      noDamage: ['psychic']
    },
    steel: {
      weak: ['fighting','ground','fire'],
      effective: ['rock','ice','fairy'],
      noDamage: ['poison']
    },
    fairy: {
      weak: ['poison','ghost'],
      effective: ['fighting','dragon','dark'],
      noDamage: ['dragon']
    }
  },
  createOverview: function() {
    // get DOM Reference
    const domOverview = document.querySelector('.typesOverview')
    // empty DOM element
    domOverview.innerHTML = ""

    // loop through this.types and append to DOM
    for (type in this.types) {
      const element = makeElement('div',type,`${type} type center-self`)
      element.dataset.type = type
      domOverview.appendChild(element)
    }
  },
  createButtons : function () {
    for (type in this.types) {
      let element = document.querySelector(`.${type}`)
      element.addEventListener('click',(e) => {
        e.preventDefault()
        // get type from dom dataset
        const type = e.target.dataset.type

        // make weak, effective and no damage html elements
        // and add header to each column
        const weak = makeElement('div','',`weak grid`)
        weak.innerHTML = `<h3>Weak against</h3>`

        const effective = makeElement('div','',`effective grid`)
        effective.innerHTML = `<h3>Super effective against</h3>`

        const noDamage = makeElement('div','',`noDamage grid`)
        noDamage.innerHTML = `<h3>No effect from</h3>`

        // loop through each element in type weak/effective array
        // and add to html elements createt above
        for (x of pokemon.types[type].weak) {
          const p = makeElement('p',x,`${x} weakness type`)
          weak.appendChild(p)
        }
        for (x of pokemon.types[type].effective) {
          const p = makeElement('p',x,`${x} effective type`)
          effective.appendChild(p)
        }
        for (x of pokemon.types[type].noDamage) {
          const p = makeElement('p',x,`${x} noEffect type`)
          noDamage.appendChild(p)
        }

        // make a current type element with the current type
        let currentType = makeElement('p',type,`${type} current type`)
        // get dom reference for Current
        const currentDom = document.querySelector('.current')
        // empty dom element
        currentDom.innerHTML = ""
        // append current Type to dom
        currentDom.appendChild(currentType)

        // get result dom ref
        const result = document.querySelector('.result')
        // empty result dom element
        result.innerHTML = ""
        // append weak, effective and no damage
        result.appendChild(weak)
        result.appendChild(effective)
        result.appendChild(noDamage)

        // scroll results inn to view
        currentDom.scrollIntoView()
      })
    }
  }
}

pokemon.createOverview()
pokemon.createButtons()
