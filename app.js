var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var count = itemList.getElementsByTagName('li').length;
var page = 1;

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

// facebook login

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
        if (page == 1) {
            window.location.href = "page.html";
            page++;
        }
    } else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '874596649681378',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v7.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};


(function (d, s, id) {                      // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}