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

window.onload = function () {
    downloadData();
}