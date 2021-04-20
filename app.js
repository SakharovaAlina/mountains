//carusel
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

const activeSlide = n =>{
    for(let slide of slides)
    {
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
}
const activeDot = n =>{
    for(let dot of dots)
    {
        dot.classList.remove('active');
    }
    dots[n].classList.add('active');

}
const prepareCurrentSlide = ind =>{
    activeSlide(ind);
    activeDot(ind);

}

const nextSlide = () =>{
    if(index == slides.length - 1 ){
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }

}
const prevSlide = () =>{
    if(index == 0 ){
        index = slides.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }

}

dots.forEach((item,indexDot)=>{
    item.addEventListener('click',()=>{
        index=indexDot;
        prepareCurrentSlide(index);
    })

})

setInterval(nextSlide,2500);

//menu burger
const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');
if(iconMenu)
{
    iconMenu.addEventListener("click",function(e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}



//menu 

const menuLinks = document.querySelectorAll('.nav_menu[data-goto]');
if(menuLinks.length > 0)
{
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click",onMenuLinkClick);
    } );
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            
            if(iconMenu.classList.contains('_active')){

                document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//forma

document.addEventListener('DOMContentLoaded', function(){
    const form =document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error =formValidate(form);

        if(error === 0) {
            
        } else {
            alert('Enter obligatory fields');
        }
    }

    function formValidate(form) {
        let  error =0;
        let formReq = document.querySelectorAll('._req');


        for (let index =0; index< formReq.length;index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }

            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            }
            else {
                if(input.value === '') {
                    formAddError(input);
                error++;
                }
            }

        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        
    }


});
 


