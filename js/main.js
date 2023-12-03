const burger = document.querySelector("#burger");
const nav = document.querySelector("#nav");
const overlay = document.querySelector("#overlay");
const navLinks = document.querySelectorAll(".nav__list a");
const formItems = document.querySelectorAll(".form__field");
const bodyEl = document.body;
const headerTop = document.querySelector("#top");

// Доавляем shadow при Скролле
document.addEventListener("scroll", function () {
   if (window.scrollY > 15) {
      headerTop.classList.add("shadow");
   } else {
      headerTop.classList.remove("shadow");
   }
});

// Активация моб навигации
burger.addEventListener("click", function () {
   burger.classList.toggle("nav-button--active");
   nav.classList.toggle("nav--active");
   overlay.classList.toggle("nav-button--active");
   bodyEl.classList.toggle("noscroll");
});

// Выключение моб нав при переходе по внутренним ссылкам
navLinks.forEach(function (item) {
   item.addEventListener("click", function () {
      burger.classList.remove("nav-button--active");
      overlay.classList.remove("nav-button--active");
      nav.classList.remove("nav--active");
      bodyEl.classList.remove("noscroll");
   });
});

// Выключение моб навигации при resize
window.addEventListener("resize", function () {
   burger.classList.remove("nav-button--active");
   overlay.classList.remove("nav-button--active");
   nav.classList.remove("nav--active");
   bodyEl.classList.remove("noscroll");
});

// Работа с placeholder в Форме
for (let item of formItems) {
   const thisParent = item.closest(".form__item");
   const thisPlaceholder = thisParent.querySelector(
      ".form__custom-placeholder"
   );

   // Если input в фокус
   item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("custom-placeholder");
   });

   // Если input теряет фокус
   item.addEventListener("blur", function () {
      if (item.value.length > 0) {
         thisPlaceholder.classList.add("custom-placeholder");
      } else {
         thisPlaceholder.classList.remove("custom-placeholder");
      }
   });
}

// jQuery Плагины
$(document).ready(function () {
   // FORM Validate
   $(".form").validate({
      rules: {
         email: {
            required: true,
            email: true,
         },

         message: {
            required: true,
         },
      },
      messages: {
         email: {
            required: "Введите email",
            email: "отсутствует символ @",
         },

         message: {
            required: "Поле не должно быть пустым",
         },
      },
      submitHandler: function (form) {
         ajaxFormSubmit();
      },
   });

   // ***********************************************************
   // Функция AJAX запрса на сервер
   function ajaxFormSubmit() {
      let string = $(".form").serialize(); // Сохраняем данные введенные в форму в строку.

      //Формируем ajax запрос
      $.ajax({
         type: "POST", // Тип запроса - POST
         url: "php/mail.php", // Куда отправляем запрос
         data: string, // Какие даные отправляем, в данном случае отправляем переменную string

         // Функция если все прошло успешно
         success: function (html) {
            $(".form").slideUp(800);
            $("#answer").html(html);
         },
      });
      // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
      return false;
   }

   // ***********************************************************
   // // plagin pageNav
   // $("#ul__list").onePageNav({
   //    currentClass: "activee",
   //    changeHash: false,
   //    scrollSpeed: 750,
   //    scrollThreshold: 0.5,
   //    filter: "",
   //    easing: "swing",
   // });

   let containerEl = document.querySelector("#cards-row");

   let mixer = mixitup(containerEl, {
      classNames: {
         block: "",
      },
   });
});

window.addEventListener("scroll", () => {
   let scrollDistance = window.scrollY;

   if (window.innerWidth > 1023) {
      document.querySelectorAll(".section").forEach((el, i) => {
         if (
            el.offsetTop - document.querySelector(".header-top").clientHeight <=
            scrollDistance
         ) {
            document.querySelectorAll("#ul__list a").forEach((el) => {
               if (el.classList.contains("active")) {
                  el.classList.remove("active");
               }
            });
            const thisId = "#" + el.getAttribute("id");

            document.querySelectorAll("#ul__list a").forEach((elem, i) => {
               const linkHref = elem.getAttribute("href");
               if (thisId == linkHref) {
                  elem.classList.add("active");
               }
            });
         }
      });
   }
});
