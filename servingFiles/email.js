<script src="https://smtpjs.com/v3/smtp.js"></script>

function send(){
    var btn = document.getElementsById("button");
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("yup");
        Email.send({
            Host : "smtp.gmail.com",
            Username : "Md Amman",
            Password : "nkxbhgvhtqbbmcat",
            To : 'mdamman.krazio@gmail.com',
            From : "mohdamman@gmail.com",
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(
          message => alert(message)
        );
    });
}