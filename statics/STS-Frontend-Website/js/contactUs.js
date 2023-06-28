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
        .then(response => {                    
            if (response.apiStatus = true) {
                console.log("Your message sent for us");
                document.getElementById('form_name').value = "";
                document.getElementById('form_lastname').value = "";
                document.getElementById('form_email').value = "";
                document.getElementById('form_message').value = "";
            }
            document.getElementById("gif").style.display ="none";
            responseAlert(response);
        })
        .catch(function (error) {
            console.log('Error:', error);
            document.getElementById("gif").style.display ="none"
            responseAlert(error);
        });
}


function sendMessageFromUser(e){
    e.preventDefault();
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/message/inside`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
            body: JSON.stringify({message : document.getElementById('form_message-user').value})
        })
        .then(response => response.json())
        .then(response => {                    
            if (response.apiStatus = true) {
                console.log("Your message sent for us");
                document.getElementById('form_message-user').value = "";
            }
            document.getElementById("gif").style.display ="none"
            responseAlert(response);
        })
        .catch(function (error) {
            console.log('Error:', error);
            document.getElementById("gif").style.display ="none"
            responseAlert(error);
        });
}

