console.log("doing");

let dialog = document.getElementById('modal');
console.log(dialog);

let close = document.getElementById('close');
console.log(close);

let open = document.getElementById('log');
console.log(open);

open.onclick = function() {
    dialog.showModal();
    dialog.classList.toggle("ShowDialog");
}

close.onclick = function() {
    dialog.close();
    dialog.classList.toggle("ShowDialog");
}

console.log("Done");