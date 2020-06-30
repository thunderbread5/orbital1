// options for the drag down list DD/MM/YYYY
for (var i = 2020; i < 2040; i++) {
    var select = document.getElementById("year");
    var opt = document.createElement("option");
    select.options.add(opt);
    opt.text = i;
    opt.value = i;
}

for (var i = 1; i < 32; i++) {
    var select = document.getElementById("date");
    var opt = document.createElement("OPTION");
    select.options.add(opt);
    if (i < 10) {
        var txt = '0' + i;
        opt.text = txt;
    } else {
        opt.text = i;
    }
    opt.value = i;
}

for (var i = 1; i < 13; i++) {
    var select = document.getElementById("month");
    var opt = document.createElement("OPTION");
    select.options.add(opt);
    if (i < 10) {
        var txt = '0' + i;
        opt.text = txt;
    } else {
        opt.text = i;
    }
    opt.value = i;
}

// end of DD/MM/YYYY


var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
// var count = itemList.getElementsByTagName('li').length;



// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);

// Add item
function addItem(e) {
    e.preventDefault();

    // Get input value
    var newItem = document.getElementById('item').value;

    // Get date
    var newDate = document.getElementById('date').value;

    // Get month
    var newMonth = document.getElementById('month').value;

    // Get year
    var newYear = document.getElementById('year').value;

    if (validateForm(newItem, newDate, newMonth, newYear)) {

        const dmy = newDate + "/" + newMonth + "/" + newYear;

        localStorage.setItem(newItem, dmy);

        location.reload();
    }
}

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    populateList(key, value);
}

function populateList(key, value) {
    // Create new li element
    var li = document.createElement('li');

    // Add class
    li.className = 'list-group-item';

    // Add text node with input value
    li.innerHTML = key + " expires on " + value + " ";

    li.className = key;

    // Create del button element
    var deleteBtn = document.createElement('button');

    // Add classes to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));

    // Append button to li
    li.appendChild(deleteBtn);

    // Append li to list
    itemList.appendChild(li);
}


// Validate form
function validateForm(item2, date2, month2, year2) {
    if (isNaN(date2) || date2 > 31 || date2 < 1) {
        alert("DD is invalid");
        return false;
    } else if (isNaN(month2) || month2 > 12 || month2 < 1) {
        alert("MM is invalid");
        return false;
    } else if (isNaN(year2) || year2 < 1970 || year2 > 2100) {
        alert("YYYY is invalid");
        return false;
    } else if (item2 == "") {
        alert("Item is empty");
        return false;
    }

    return true;
}

// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            const li = e.target.parentElement;
            itemList.removeChild(li);
            localStorage.removeItem(li.className);
            console.log(localStorage);
        }
    }
}

