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

async function downloadForm() {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
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
    let tableRestaraunts = document.getElementById('table-restaraunt');
    let i = 0;
    for (let restaurant of restaurants) {
        if (i == 10) {
            break;
        } else {
            tableRestaraunts.append(createTableRestarauntsElement(restaurant));
            i++;
        }
    }
}

function createTableRestarauntsElement(restaurant) {
    let itemTableRestaurants = document.createElement('tr');
    itemTableRestaurants.classList.add('align-middle');
    itemTableRestaurants.classList.add('border-2');
    itemTableRestaurants.classList.add('border-2');
    itemTableRestaurants.append(createElementName(restaurant));
    itemTableRestaurants.append(createElementTypeRes(restaurant));
    itemTableRestaurants.append(createElementAddress(restaurant));
    itemTableRestaurants.append(createElementButton());
    return itemTableRestaurants;
}

function createElementName(restaurant) {
    let itemName = document.createElement('td');
    itemName.innerHTML = restaurant.name;
    return itemName;
}

function createElementTypeRes(restaurant) {
    let itemType = document.createElement('td');
    itemType.innerHTML = restaurant.typeObject;
    return itemType;
}

function createElementAddress(restaurant) {
    let itemAddress = document.createElement('td');
    itemAddress.innerHTML = restaurant.address;
    return itemAddress;
}

function createElementButton() {
    let itemButton = document.createElement('td');
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


window.onload = function () {
    downloadData();
    downloadForm()
        .then(downloadData => dataSort(downloadData))
        .then(restaurants => renderTableRestaraunts(restaurants));
}