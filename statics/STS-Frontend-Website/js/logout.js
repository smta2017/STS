function deleteCookie(name) {
  document.cookie = name + '=; expires=0;';
}


document.getElementById("LogOut").addEventListener('click', function (e){
    e.preventDefault();
    var token = getCookie("token");
    const headers = new Headers();
    headers.append('Authorization', token);
    fetch(`${domainName}/sts/user/logout`, {
        method: 'DELETE',
        headers: headers
    })
    .then(response => {
        if(response.status === 401){
            throw new Error('You are not authorized to access this resource');
        } else if(!response.ok){
            throw new Error('Something went wrong. Please try again later.');
        } else {
            deleteCookie("token")
            deleteCookie("admin");
            deleteCookie("ruler");
            deleteCookie("competition");
            deleteCookie("mobileNumber");
            deleteCookie("subscriptionId");
            deleteCookie("year");
            deleteCookie("type");
            deleteCookie("entryDegree");
            deleteCookie("firstName");
            deleteCookie("lastName");
            deleteCookie("email");
            window.location.hash = ""; // redirect to home page or login page
            window.location.reload();
        }
    })
    .catch(error => console.error('Error:', error.message));
});

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=0;';
}
