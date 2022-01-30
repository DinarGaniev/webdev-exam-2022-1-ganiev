'use strict'

function downloadData(page = 1) {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderAdmAreaList(this.response); // округ
        renderDistrictList(this.response); // район
        renderTypeList(this.response); // тип заведения
    }
    xhr.send();
}

//рендер списка административных округов//
function renderAdmAreaList(records) {
    let admAreaList = document.getElementById('adminArea');
    let arrayAdmArea = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayAdmArea.length; i++) {
            if (record.admArea != arrayAdmArea[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            admAreaList.append(createAdmAreaElement(record));
            flag = 0;
            arrayAdmArea.push(record.admArea);
        }
    }
}

function createAdmAreaElement(record) {
    let itemAdmArea = document.createElement('option');
    itemAdmArea.innerHTML = record.admArea;
    return itemAdmArea;
}

//рендер списка районов//
function renderDistrictList(records) {
    let districtList = document.getElementById('district');
    let arrayDistrict = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayDistrict.length; i++) {
            if (record.district != arrayDistrict[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            districtList.append(createDistrictElement(record));
            flag = 0;
            arrayDistrict.push(record.district);
        }
    }
}

function createDistrictElement(record) {
    let itemDistrict = document.createElement('option');
    itemDistrict.innerHTML = record.district;
    return itemDistrict;
}

//рендер списка типов заведений//
function renderTypeList(records) {
    let typeList = document.getElementById('type');
    let arrayType = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayType.length; i++) {
            if (record.typeObject != arrayType[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            typeList.append(createTypeElement(record));
            flag = 0;
            arrayType.push(record.typeObject);
        }
    }
}

function createTypeElement(record) {
    let itemType = document.createElement('option');
    itemType.innerHTML = record.typeObject;
    return itemType;
}

async function serverRequest(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => alert(error.status));
}

async function downloadForm(url) {
    let jsonData = await serverRequest(url);
    return jsonData;
}

//Функция сортировки заведений по рейтингу//
function dataSort(jsonData) {
    let data = jsonData.sort(function (a, b) {
        return b.rate - a.rate;
    });
    return data;
}

//Формирование таблицы//
function renderTableRestaraunts(restaurants) {
    let tableRestaraunts = document.getElementById('table-restaurant');
    let i = 0;
    for (let restaurant of restaurants) {
        if (i == 20) {
            break;
        } else {
            tableRestaraunts.append(createTableRestarauntsElement(restaurant));
            i++;
        }
    }
    renderPaginationBtn(restaurants)
}

function createTableRestarauntsElement(restaurant) {
    let itemTableRestaurants = document.createElement('tr');
    let restaurantId = restaurant.id;
    itemTableRestaurants.classList.add('align-middle','place-row');
    itemTableRestaurants.classList.add('border-2');
    itemTableRestaurants.setAttribute('restaurant-id', restaurantId);
    itemTableRestaurants.append(createElementName(restaurant));
    itemTableRestaurants.append(createElementTypeRes(restaurant));
    itemTableRestaurants.append(createElementAddress(restaurant));
    itemTableRestaurants.append(createElementButton());
    return itemTableRestaurants;
}

function createElementName(restaurant) {
    let itemName = document.createElement('td');
    itemName.classList.add('text-center');
    itemName.innerHTML = restaurant.name;
    return itemName;
}

function createElementTypeRes(restaurant) {
    let itemType = document.createElement('td');
    itemType.classList.add('text-center');
    itemType.innerHTML = restaurant.typeObject;
    return itemType;
}

function createElementAddress(restaurant) {
    let itemAddress = document.createElement('td');
    itemAddress.classList.add('text-center');
    itemAddress.innerHTML = restaurant.address;
    return itemAddress;
}

function createElementButton() {
    let itemButton = document.createElement('td');
    itemButton.classList.add('text-center');
    itemButton.append(createButton());
    return itemButton;
}

function createButton() {
    let elementButton = document.createElement('button');
    elementButton.innerHTML = 'Выбрать';
    elementButton.classList.add('btn');
    elementButton.classList.add('btn-primary');
    return elementButton;
}

function clickHandlerBtnSearch(event) {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    downloadForm(url)
        .then(downloadData => dataSort(downloadData))
        .then(data => getSelect(data));
}

//Снизу функции для поиска заведений//
//Функция для взятия из полей поиска информации//
function getSelect(data) {
    let arrayFilter = new Map();
    let selectAdmArea = document.getElementById('adminArea').options.selectedIndex;
    let selectAdmAreaTxt = document.getElementById('adminArea').options[selectAdmArea].text;
    arrayFilter.set('admArea', selectAdmAreaTxt);
    // if (selectAdmAreaTxt != "Не выбрано") {
    //     arrayFilter.set('admArea', selectAdmAreaTxt)
    // };
    let selectDistrict = document.getElementById('district').options.selectedIndex;
    let selectDistrictTxt = document.getElementById('district').options[selectDistrict].text;
    arrayFilter.set('district', selectDistrictTxt);
    // if (selectDistrictTxt != "Не выбрано") {
    //     arrayFilter.set('district', selectDistrictTxt)
    // };
    let selectType = document.getElementById('type').options.selectedIndex;
    let selectTypeTxt = document.getElementById('type').options[selectType].text;
    arrayFilter.set('typeObject', selectTypeTxt)
    // if (selectTypeTxt != "Не выбрано") {
    //     arrayFilter.set('typeObject', selectTypeTxt)
    // };
    let selectSocial = document.getElementById('discount').options.selectedIndex;
    let selectSocialTxt = document.getElementById('discount').options[selectSocial].text;
    arrayFilter.set('socialPrivileges', selectSocialTxt)
    // if (selectSocialTxt != "Не выбрано") {
    //     arrayFilter.set('socialPrivileges', selectSocialTxt)
    // };
    renderNewTable(data, arrayFilter);
}

//Функция для создания списка округов, которые нужны будут для сравнения//
function selectedAdmAreaList(records) {
    let arrayAdmArea = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayAdmArea.length; i++) {
            if (record.admArea != arrayAdmArea[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            flag = 0;
            arrayAdmArea.push(record.admArea);
        }
    }
    return arrayAdmArea;
}

//Функция для создания списка раайнов, которые нужны будут для сравнения//
function selectedDistrictList(records) {
    let arrayDistrict = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayDistrict.length; i++) {
            if (record.district != arrayDistrict[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            flag = 0;
            arrayDistrict.push(record.district);
        }
    }
    return arrayDistrict;
}

//Функция для создания списка типов заведений, которые нужны будут для сравнения//
function selectedTypeList(records) {
    let arrayType = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayType.length; i++) {
            if (record.typeObject != arrayType[i]) {
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true) {
            flag = 0;
            arrayType.push(record.typeObject);
        }
    }
    return arrayType;
}

//Функция для создания новой таблицы по выбранным условиям//
function renderNewTable(restaurants, arrayFilter) {
    let tableRestaraunts = document.getElementById('table-restaurant');
    tableRestaraunts.innerHTML = " ";
    document.getElementById('pagination').innerHTML = " ";
    let i = 0;
    let newDataSort = [];
    let arrayAdmArea = selectedAdmAreaList(restaurants);
    let arrayDistrict = selectedDistrictList(restaurants);
    let arrayType = selectedTypeList(restaurants);
    let arraySocial = ['true', 'false', 'Не выбрано'];

    if (arrayFilter.get("admArea") != "Не выбрано") arrayAdmArea = [arrayFilter.get("admArea")];
    if (arrayFilter.get("district") != "Не выбрано") arrayDistrict = [arrayFilter.get("district")];
    if (arrayFilter.get("typeObject") != "Не выбрано") arrayType = [arrayFilter.get("typeObject")];
    if (arrayFilter.get("socialPrivileges") != "Не выбрано") arraySocial = [String(arrayFilter.get("socialPrivileges"))];

    for (let restaurant of restaurants) {
        if (arrayAdmArea.includes(restaurant.admArea) &&
            arrayDistrict.includes(restaurant.district) &&
            arrayType.includes(restaurant.typeObject) &&
            arraySocial.includes(String(restaurant.socialPrivileges))) {
            newDataSort.push(restaurant);
            // tableRestaraunts.append(createTableRestarauntsElement(restaurant));
        }
        // if (i == 20) {
        //     break;
        // } else {
        //     if (arrayAdmArea.includes(restaurant.admArea) &&
        //         arrayDistrict.includes(restaurant.district) &&
        //         arrayType.includes(restaurant.typeObject) &&
        //         arraySocial.includes(String(restaurant.socialPrivileges))) {
        //         newDataSort.push(restaurant);
        //         // tableRestaraunts.append(createTableRestarauntsElement(restaurant));
        //         i++;
        //     }
        // }
    }
    renderPaginationBtn(newDataSort);
}

//Функция для обновления райнов по выбранному округу//
function renderNewDistrictList(records, selectedAdmAreaText) {
    let districtList = document.getElementById("district");
    districtList.innerHTML = " ";
    districtList.append(EmptyDistrictListItem());
    let arrayDistrict = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayDistrict.length; i++) {
            if (record.district != arrayDistrict[i]) {
                flag = true;
            }
            else {
                flag = false;
                break;
            }
        }
        if (flag == true && selectedAdmAreaText == record.admArea) {
            districtList.append(createDistrictElement(record));
            flag = 0;
            arrayDistrict.push(record.district);
        }
    }
}

function EmptyDistrictListItem() {
    let itemElement = document.createElement('option');
    itemElement.innerHTML = "Не выбрано";
    return itemElement;
}

//Пагинаця//
function renderPaginationBtn(restaurants) {
    const strOnPage = 20; // количество строк в таблице
    const numOfBtn = Math.ceil(restaurants.length / strOnPage) // количество кнопок
    let pagination = document.getElementById('pagination');
    let items = [];
    for (let i = 1; i <= numOfBtn; i++) {
        // let liBtn = document.createElement('li');
        // liBtn.classList.add('page-item')
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary', 'm-2');
        btn.innerHTML = i;
        // items.push(liBtn);
        items.push(btn);
    }
    renderFirstlyPagination(items, restaurants);
    setPaginationBtnOnPage(items[0], items, restaurants);
    addEventOnButtons(items, restaurants);
}

function renderFirstlyPagination(items, restaurants) {
    let pagination = document.getElementById('pagination');
    const countBtn = 4;
    const strOnPage = 20;
    const numOfBtn = Math.ceil(restaurants.length / strOnPage)
    if (numOfBtn <= countBtn) {
        for (let i = 0; i < numOfBtn; i++) {
            pagination.appendChild(items[i]);
        }
    } else {
        for (let i = 0; i < countBtn; i++) {
            pagination.appendChild(items[i]);
        }
        pagination.appendChild(items[numOfBtn - 1]);
    }
}

function addEventOnButtons(items, restaurants) {
    for (let item of items) {
        item.addEventListener('click', function () {
            setPaginationBtnOnPage(item, items, restaurants)
        })
    }
} // добавим на все кнопки EventListener

let setPaginationBtnOnPage = (function () {
    return function (item, items, restaurants) {
        let table = document.getElementById('table-restaurant');
        let pageNum = +item.innerHTML; //Номер страницы, с помощью которого будут отображены данные
        if (items.length > 4) { renderLargePagination(+item.innerHTML, items, restaurants); } //Пагинация с большим количетвом страниц
        let start = (pageNum - 1) * 20;
        let end = start + 20;
        let notes = restaurants.slice(start, end); //Данные, которые необходимо отобразить
        table.innerHTML = " ";
        for (let note of notes) {
            table.append(createTableRestarauntsElement(note));
        }
        takeIdOfPlace();
    };
}());

function renderFirstlyPagination(items, restaurants) {
    let pagination = document.getElementById('pagination');
    const countBtn = 4; // количество кнопок в пагинации
    const strOnPage = 20; // количество строк в таблице
    const numOfBtn = Math.ceil(restaurants.length / strOnPage) // количество кнопок
    if (numOfBtn <= countBtn) {
        for (let i = 0; i < numOfBtn; i++) {
            pagination.appendChild(items[i]);
        }
    } else {
        for (let i = 0; i < countBtn; i++) {
            pagination.appendChild(items[i]);
        }
        pagination.appendChild(items[numOfBtn - 1]);
    }
}

function dotsOnPagination() {
    let dotsOnPag = document.createElement('p');
    dotsOnPag.innerHTML = '__';
    dotsOnPag.classList.add('fw-bold', 'mt-auto', 'mb-0', 'mx-2');
    return dotsOnPag;
}  

function renderLargePagination(b, items, restaurants) {
    let pagination = document.getElementById('pagination');
    const countBtn = 4;
    const strOnPage = 20; // количество строк в таблице
    const numOfBtn = Math.ceil(restaurants.length / strOnPage) // количество кнопок
    let dotsOnPag1 = dotsOnPagination();
    let dotsOnPag2 = dotsOnPagination();
    let dotsOnPag3 = dotsOnPagination();
    let dotsOnPag4 = dotsOnPagination();
    // Случай: 1 2 3 4...25
    if (b <= countBtn - 1) {
        pagination.innerHTML = " ";
        for (let i = 0; i < countBtn; i++) {
            pagination.appendChild(items[i]);
        }
        pagination.appendChild(dotsOnPag1);
        pagination.appendChild(items[numOfBtn - 1]);
    }
    // Случай: 1...22 23 24 25
    else if (b >= numOfBtn - (countBtn - 1) + 1) {
        pagination.innerHTML = " ";
        pagination.appendChild(items[0]);
        pagination.appendChild(dotsOnPag2);
        for (let i = numOfBtn - (countBtn - 1) - 1; i < numOfBtn; i++) {
            pagination.appendChild(items[i]);
        }
    }
    // Случай: 1...2 3 4...5
    else {
        pagination.innerHTML = " ";
        pagination.appendChild(items[0]);
        pagination.appendChild(dotsOnPag3);
        for (let i = -2; i <= 0; i++) {
            pagination.appendChild(items[b + i]);
        }
        pagination.appendChild(dotsOnPag4);
        pagination.appendChild(items[numOfBtn - 1]);
    }
}

async function downloadPlaceById(id) {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants/" + id + "?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    let jsonData = await serverRequest(url);
    return jsonData;
}

function clickHandlerBtnSelect(event) {
    let placeRow = event.target.closest('.place-row');
    let placeId = placeRow.getAttribute('restaurant-id');
    downloadPlaceById(placeId)
        .then(menuElem => takePricesById(menuElem))
        .then(arraySet => takeJsonInfo(arraySet, placeId));
}

function takeIdOfPlace() {
    for (let btn of document.querySelectorAll('.place-row')) {
        btn.onclick = clickHandlerBtnSelect;
    }
}

////////////////////////////////////////
//////Получение цен сетов для меню//////
////////////////////////////////////////

function takePricesById(data) {
    let arraySet = [];
    arraySet.push(data.set_1);
    arraySet.push(data.set_2);
    arraySet.push(data.set_3);
    arraySet.push(data.set_4);
    arraySet.push(data.set_5);
    arraySet.push(data.set_6);
    arraySet.push(data.set_7);
    arraySet.push(data.set_8);
    arraySet.push(data.set_9);
    arraySet.push(data.set_10);
    return arraySet;
}

/////////////////////////////
//////Создание карточек//////
/////////////////////////////

function takeJsonInfo(arraySet, placeId) {
    let url = './menu.json';
    downloadForm(url)
        .then(menuData => renderMenu(arraySet, menuData, placeId));
}

function renderMenu(arraySet, menuData, placeId) {
    let menu = document.getElementById('menu');
    menu.innerHTML = " ";
    let k = 0;
    for (let data of menuData) {
        let card = document.querySelector('.card').cloneNode(true);
        card.classList.remove('d-none');
        card.classList.add('card', 'col', 'my-2', 'mx-auto');
        card.querySelector('.card-img-top').setAttribute('src', data.menuImage)
        card.querySelector('.card-title').innerHTML = data.menuName;
        card.querySelector('.card-text').innerHTML = data.menuDesc;
        card.querySelector('.card-cost').innerHTML = arraySet[k];
        k++;
        menu.appendChild(card);
    }
    // plusCost();
    // minusCost();
    // document.querySelector('.btn-order').onclick = function () {
    //     clickHandlerPrepareModalContent(rowId);
    // }
}

window.onload = function () {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    downloadData();
    downloadForm(url)
        .then(downloadData => dataSort(downloadData))
        .then(restaurants => renderTableRestaraunts(restaurants))
        .then(() => takeIdOfPlace());
    let searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', clickHandlerBtnSearch);
    document.getElementById('adminArea').onchange = function () {
        let selectedAdmArea = document.getElementById("adminArea").options.selectedIndex;
        let selectedAdmAreaText = document.getElementById("adminArea").options[selectedAdmArea].text;
        if (selectedAdmAreaText != "Не выбрано") downloadForm(url)
            .then(downloadData => renderNewDistrictList(downloadData, selectedAdmAreaText))
        else downloadForm(url)
            .then(downloadData => renderDistrictList(downloadData));
    }
}