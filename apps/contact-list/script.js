"use strict";

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var nameInput = document.getElementById("nameInput");
var numberInput = document.getElementById("numberInput");
var groupInput = document.getElementById("groupInput");
var contactList = document.getElementById("contactList");
var array = [];

function Person(fullName, number, group) {
  this.fullName = fullName;
  this.number = number;
  this.group = group;
  array.push(this);
}

function save() {
  localStorage.setItem("array", JSON.stringify(array));
}
Person.prototype.getFullName = function() {
  return this.fullName + ' ' + this.number + ' ' + this.group;
};

function submitToDb() {
  var person = new Person(nameInput.value, numberInput.value, groupInput.value);
  refresh();
}
var p1 = new Person("Jonathan Buell", 5804337551, "family");
var p2 = new Person("Patrick Daniel", 8186934432, "work");
var p3 = new Person("Lorraine Winter", 3138211928, "work");
var p4 = new Person("Constance Reed", 3138211928, "family");
var storedArray = JSON.parse(localStorage.getItem("array"));

function loadLocalStorage() {
  for (var i in storedArray) {
    array[i] = storedArray[i];
  }
  refresh();
}
loadLocalStorage();

function clearInputs() {
  nameInput.value = '';
  numberInput.value = '';
  groupInput.value = '';
}

function refresh() {
  clearInputs();
  groupIndexing();
  document.getElementById("search").style.display = '';
  document.getElementById("contactList").style.display = '';
  document.getElementById("addNewContact").style.display = "none";
  document.getElementById("editContact").style.display = 'none';
  document.getElementById("contactGroupInfo").innerHTML = "<h5>All Contacts</h5>";
  document.getElementById("AddNewButtonDiv").innerHTML = "<a class=\"btn-floating btn-large waves-effect waves-light red\" onclick=\"addNew()\"><i class=\"material-icons\">add</i></a>";
  array.sort(function(a, b) {
    var nameA = a.fullName.toUpperCase();
    var nameB = b.fullName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  contactList.innerHTML = '';
  for (var i in array) {
    var id = i;
    contactList.innerHTML += "<li class='collection-item " + array[i].group + '" id=li' + id + "'>\n                        <div id='name'><span class=\"new badge\" data-badge-caption=\"Edit\" onclick=\"editContact(" + id + ")\"></span>\n                        <h5> <strong><span> " + array[i].fullName + "</span></strong></h5>\n                        </div>\n                        <div class=\"number\" id='number'><span class=\"new badge red\" data-badge-caption=\"Delete\" onclick=\"deleteMe(" + id + ")\"></span>\n                            <h6>Telephone: <span>" + array[i].number + "</span></h6>\n                        </div>\n                    \n                        </li>";
  }
}

function deleteMe(id) {
  array.splice(id, 1);
  refresh();
  save();
}

function deleteMeWithSorting(id) {
  array.splice(id, 1);
  save();
  refresh();
  sortByGroup(lastValueOfGroup);
}

function addNew() {
  document.getElementById("addNewContact").style.display = "";
  document.getElementById("search").style.display = 'none';
  document.getElementById("contactList").style.display = 'none';
  document.getElementById("editContact").style.display = 'none';
  document.getElementById("AddNewButtonDiv").innerHTML = "\n    <a class=\"btn-floating btn-large waves-effect waves-light red\" onclick=\"refresh()\"><i class=\"material-icons\">add</i></a>";
}

function editContact(id) {
  document.getElementById("search").style.display = 'none';
  document.getElementById("contactList").style.display = 'none';
  document.getElementById("editContact").style.display = '';
  document.getElementById("editContact").innerHTML = "<div>\n        <input type=\"text\"  placeholder=\"Name here\" id=\"nameInput2\" value=\"" + array[id].fullName + "\">\n        <input type=\"tel\" placeholder=\"Number here\" id=\"numberInput2\" value=\"" + array[id].number + "\">\n        <input type=\"text\" placeholder=\"Group Here\" id=\"groupInput2\" value=\"" + array[id].group + "\">\n        <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\" onclick=\"saveMe(" + id + ")\">Submit\n        <i class=\"material-icons right\">send</i>\n        </button>\n        </div>";
  save();
}

function editContactWithSorting(id) {
  document.getElementById("search").style.display = 'none';
  document.getElementById("contactList").style.display = 'none';
  document.getElementById("editContact").style.display = '';
  document.getElementById("editContact").innerHTML = "<div>\n        <input type=\"text\"  placeholder=\"Name here\" id=\"nameInput2\" value=\"" + array[id].fullName + "\">\n        <input type=\"tel\" placeholder=\"Number here\" id=\"numberInput2\" value=\"" + array[id].number + "\">\n        <input type=\"text\" placeholder=\"Group Here\" id=\"groupInput2\" value=\"" + array[id].group + "\">\n        <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\" onclick=\"saveMeWithSorting(" + id + ")\">Submit\n        <i class=\"material-icons right\">send</i>\n        </button>\n        </div>";
}

function saveMe(id) {
  array[id].fullName = document.getElementById("nameInput2").value;
  array[id].number = document.getElementById("numberInput2").value;
  array[id].group = document.getElementById("groupInput2").value;
  save();
  refresh();
}

function saveMeWithSorting(id) {
  array[id].fullName = document.getElementById("nameInput2").value;
  array[id].number = document.getElementById("numberInput2").value;
  array[id].group = document.getElementById("groupInput2").value;
  save();
  refresh();
  sortByGroup(lastValueOfGroup);
}

function groupIndexing() {
  document.getElementById('dropdown').innerHTML = '';
  var groupIndex = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _value = _step.value;

      groupIndex.push(_value.group);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var uniqueGroups = [].concat(_toConsumableArray(new Set(groupIndex)));
  uniqueGroups.sort();
  document.getElementById('dropdown').innerHTML += "<li onclick='refresh()'><a>All Contacts</a></li>";
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = uniqueGroups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      document.getElementById('dropdown').innerHTML += "<li onclick='sortByGroup(" + uniqueGroups.indexOf(value) + ")'><a>" + value[0].toUpperCase() + value.substring(1) + "</a></li>";
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}
var lastValueOfGroup;

function sortByGroup(value) {
  lastValueOfGroup = value;
  var groupIndex = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _value2 = _step3.value;

      groupIndex.push(_value2.group);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var uniqueGroups = [].concat(_toConsumableArray(new Set(groupIndex)));
  uniqueGroups.sort();
  var toShow = uniqueGroups[value];
  document.getElementById("contactGroupInfo").innerHTML = "<h5>" + toShow[0].toUpperCase() + toShow.substring(1) + "</h5>";
  contactList.innerHTML = '';
  for (var i in array) {
    if (toShow == array[i].group) {
      var id = i;
      contactList.innerHTML += "<li class='collection-item " + array[i].group + '" id=li' + id + "'>\n                            <div id='name'><span class=\"new badge\" data-badge-caption=\"Edit\" onclick=\"editContactWithSorting(" + id + ")\"></span>\n                            <h5> <strong><span> " + array[i].fullName + "</span></strong></h5>\n                            </div>\n                            <div class=\"number\" id='number'><span class=\"new badge red\" data-badge-caption=\"Delete\" onclick=\"deleteMeWithSorting(" + id + ")\"></span>\n                                <h6>Telephone: <span>" + array[i].number + "</span></h6>\n                            </div>\n                            </li>";
    }
  }
}

function search() {
  var searchInput = document.getElementById("searchInput").value;

  contactList.innerHTML = '';
  for (var i in array) {
    if (array[i].fullName.toLowerCase().includes(searchInput.toLowerCase()) || array[i].group.toLowerCase().includes(searchInput.toLowerCase())) {
      var id = i;
      contactList.innerHTML += "<li class='collection-item " + array[i].group + '" id=li' + id + "'>\n                            <div id='name'><span class=\"new badge\" data-badge-caption=\"Edit\" onclick=\"editContactWithSorting(" + id + ")\"></span>\n                            <h5> <strong><span> " + array[i].fullName + "</span></strong></h5>\n                            </div>\n                            <div class=\"number\" id='number'><span class=\"new badge red\" data-badge-caption=\"Delete\" onclick=\"deleteMeWithSorting(" + id + ")\"></span>\n                                <h6>Telephone: <span>" + array[i].number + "</span></h6>\n                            </div>\n                            </li>";
    } else if (searchInput === '') {
      refresh();
    }
  }
}