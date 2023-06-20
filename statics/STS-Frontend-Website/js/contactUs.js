function sendMessage(e){
e.preventDefault();

var formData = {
    firstName: document.getElementById('form_name').value,
    lastName: document.getElementById('form_lastname').value,
    email: document.getElementById('form_email').value,
    message: document.getElementById('form_message').value,
};

    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/message`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error =>  console.log('Error:', error) );
    document.getElementById("gif").style.display ="none"
}

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

function sendMessageFromUser(e){
    e.preventDefault();
        console.log("done")
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/message/inside`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({message : document.getElementById('form_message-user').value})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error =>  console.log('Error:', error) );
        document.getElementById("gif").style.display ="none"
}

console.log("contact us js file")

