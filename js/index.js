'use strict';

const verzend = document.getElementById('send');
verzend.addEventListener('click', togglePopup);

const closeButton = document.getElementById('close-popup');
closeButton.addEventListener('click', closePopup);

function togglePopup(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let mail = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let bodyMessage = `
    Name: ${name} <br>
    Last name: ${lastName} <br>
    From: ${mail} <br><br><br>
    ${message}`;
    
    if( name != "" && lastName != "" && mail != "" && message != ""){
        document.getElementById('popup').classList.toggle("active");  
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "maxbastien@hotmail.com",
            Password : "FAC8EB2AA2220E286073C266BE127BCB2EFC",
            To : 'maxbastien@hotmail.com',
            From : 'maxbastien@hotmail.com',
            Subject : "Question",
            Body : bodyMessage
        });
    }
}

function closePopup(){
    document.getElementById('popup').classList.toggle('active');
}
