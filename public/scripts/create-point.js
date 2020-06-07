function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false

    } )
}




document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta

//Pegar todos os li's
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(let item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems =[]

function handleSelectedItem (event) {
    const itemLi = event.target
    
    //Add or remove a class with JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //Verify if selected items exist, if so, 
    //take selected items.

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //True or False
        return itemFound
    })


    // if already selected, 
    if(alreadySelected >= 0) {
        //take off the selection
        const filteredItens = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItens
    } else {
        // if not, add to selection
        selectedItems.push(itemId)
    }
    

    // atualize hidden camp with selected items
    collectedItems.value = selectedItems
}   