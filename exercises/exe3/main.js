const campoCep = document.querySelector('#cep')
const erroCep = document.querySelector('#cepErro')
const campoRua = document.querySelector('#rua')
const campoNumero = document.querySelector('#numero')
const campoBairro = document.querySelector('#bairro')
const campoCidade = document.querySelector('#cidade')
const campoEstado = document.querySelector('#estado')

const regexcep = /\d{5}-?\d{3}/

campoCep.addEventListener('focus', () => {
  erroCep.classList.add('escondido')
  campoCep.classList.remove('erro')
})

campoCep.addEventListener('input', () => {
  const cep = campoCep.value
  if (regexcep.test(cep)) {
    buscarCep(cep)
  }
})

campoCep.addEventListener('blur', () => {
  const cep = campoCep.value
  if (!regexcep.test(cep)) {
    mostrarErro()
  }
})

async function buscarCep(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const dados = await resposta.json()

    if (dados.erro) {
      mostrarErro()
      return
    }

    preencherCampos(dados)
  } catch {
    mostrarErro()
  }
}

function preencherCampos(dados) {
  campoRua.value = dados.logradouro
  campoBairro.value = dados.bairro
  campoCidade.value = dados.localidade
  campoEstado.value = dados.uf
}

function mostrarErro() {
  erroCep.classList.remove('escondido')
  campoCep.classList.add('erro')
  limparCampos()
}

function limparCampos() {
  campoRua.value = ''
  campoNumero.value = ''
  campoBairro.value = ''
  campoCidade.value = ''
  campoEstado.value = ''
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
})