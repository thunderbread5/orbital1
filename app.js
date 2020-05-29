var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var count = itemList.getElementsByTagName('li').length;

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

        // Create new li element
        var li = document.createElement('li');
        // Add class
        li.className = 'list-group-item';
        // Add text node with input value
        li.appendChild(document.createTextNode(newItem + " expires on "
            + newDate + "/" + newMonth + "/" + newYear + " "));

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
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}