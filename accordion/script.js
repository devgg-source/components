const accordion = document.querySelectorAll(".contentBox");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    // console.log(this); //contentBox
    this.classList.toggle("active");
    for (let j = 0; j < accordion.length; j++) {
      if (i != j) {
        accordion[j].classList.remove("active");
      }
    }
  });
}
