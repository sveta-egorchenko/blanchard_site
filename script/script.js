document.addEventListener("DOMContentLoaded", function () {
  // burger
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header-top__right');
  const body = document.body;
  const menuLinks = document.querySelectorAll('.nav__link');

  burger.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('stop-scroll');
  });

  menuLinks.forEach(el => {
    el.addEventListener('click', (e) => {
      burger.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('stop-scroll');
    });
  });

  // search
  document.querySelector(".search-margin").addEventListener("click", function () {
    document.querySelector(".search-form").classList.add("search-form__active");
    this.classList.add("active");
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    let form = document.querySelector(".search-form");
    if (!target.closest(".header-top__container")) {
      form.classList.remove("search-form__active");
      form.querySelector("input").value = "";
      document.querySelector(".search-margin").classList.remove("active")
    }
  });

  document.querySelector(".search-form__btn_close").addEventListener("click", function () {
    document.querySelector(".search-form").classList.remove("search-form__active");
    document.querySelector(".search-margin").classList.remove("active")
  });

  // header dropdown
  document.querySelectorAll(".nav-category__btn").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".dropdown-menu");
      document.querySelectorAll(".nav-category__btn").forEach(el => {
        if (el != btn) {
          el.classList.remove("dropdown-btn-active");
        }
      });
      document.querySelectorAll(".dropdown-menu").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("dropdown-active");
        }
      })
      dropdown.classList.toggle("dropdown-active");
      btn.classList.toggle("dropdown-btn-active")
    })
  })
  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".nav-category__list")) {
      document.querySelectorAll(".dropdown-menu").forEach(el => {
        el.classList.remove("dropdown-active");
      })
      document.querySelectorAll(".nav-category__btn").forEach(el => {
        el.classList.remove("dropdown-btn-active");
      });
    }
  })

  // simplebar
  document.querySelectorAll('.simplebar').forEach(el => {
    new SimpleBar(el, {
      scrollbarMaxSize: 25,
    });
  });

  // ?????????????? ???? ??????????????
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  // accordion
  $(function () {
    $(".accordion-list").accordion({
      icons: false,
      heightStyle: "content",
      collapsible: true,
    });
  });

  // tabs painters
  const tabsPainter = document.querySelectorAll('.accordion__painter-list');
  const painterLink = document.querySelectorAll('.accordion__painter-link');
  const painter = document.querySelectorAll('.painter');
  if (tabsPainter) {
    const tabsHandler = (tabLinks) => {
      tabLinks.forEach(el => {
        const path = el.dataset.tabsPath;
        el.addEventListener('click', (e) => {
          e.preventDefault();
          painterLink.forEach(el => {
            el.classList.remove('accordion__painter-link--active')
          });
          e.target.classList.add('accordion__painter-link--active');
          painter.forEach(el => {
            el.classList.remove('painter-content-active')
          });
          document.querySelector(`[data-tabs-target="${path}"]`).classList.add('painter-content-active');
        });
      });
    }
    tabsPainter.forEach(el => {
      const tabsLinks = el.querySelectorAll('.accordion__painter-link');
      tabsHandler(tabsLinks);
    });
  };

  // choices
  const defaultSelect = () => {
    const element = document.querySelector('.default');
    const choices = new Choices(element, {
      searchEnabled: false,
      shouldSort: false,
      placeholder: true,
      placeholderValue: null,
    });
  };
  defaultSelect();

  // tooltip
  tippy('.tooltip-marker1', {
    content: '???????????? ?????????????????????? ?????????????????? ?????????????????????? ?????????????????????? ????????????????????',
    theme: 'purple',
    trigger: 'click',
    animation: 'perspective',
    maxWidth: 264,
  });
  tippy('.tooltip-marker2', {
    content: '??????????????, ????????????????, ??????????????????, ?????? ?????????????????? ???? ???????? ?????????????????? ???????????? ???????????????? ?? ?????? ????????????',
    theme: 'purple',
    trigger: 'click',
    animation: 'perspective',
    maxWidth: 264,
  });
  tippy('.tooltip-marker3', {
    content: '?? ???????????????????? ???????????????? ????????????????',
    theme: 'purple',
    trigger: 'click',
    animation: 'perspective',
    maxWidth: 242,
  });

  // validation
  const validation = new JustValidate('#form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: 'var(--color-wrong)',
    },
    focusInvalidField: true,
    lockForm: true,
  });
  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
  validation
    .addField('#name', [{
      rule: 'required',
      errorMessage: '?????? ?????? ???????????',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: '???? ???????????? 3 ????????????????',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: '?????????????? ?????????????? ??????',
    },
    {
      rule: 'customRegexp',
      value: /^[A-z??-??????_ ]+$/i,
      errorMessage: '???????????????????????? ????????????',
    },
    ]).addField('#phone', [{
      rule: 'required',
      errorMessage: '?????????????? ?????? ??????????????',
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue()
        console.log(phone)
        return Number(phone) && phone.length === 10;
      },
      errorMessage: '?????????????? ???? ????????????????????!',
    },
    ]);

  // modal

})
