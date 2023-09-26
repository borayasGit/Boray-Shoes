$(document).ready(function () {
  // Sticky Header Alanı
  var header = $("header");
  var nav = $("nav");
  var main = $("main");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      header.addClass("sticky");
      nav.addClass("sticky-nav");
      main.addClass("sticky-main");
    } else {
      header.removeClass("sticky");
      nav.removeClass("sticky-nav");
      main.removeClass("sticky-main");
    }
  });

  // Açılır liste

  // const man = $("#man-menu");
  const navbar = $("nav ul li");
  // const dropdown = $(".dropdown");

  navbar.hover(
    function () {
      const anchor = $(this).find("a");
      const menuID = anchor.attr("id");
      const subMenu = $(`#${menuID}`);
      const subMenuDiv = subMenu.siblings(".dropdown");
      // TODO:DÜZENLEME GEREKLİ
      if (menuID.length > 0) {
        subMenuDiv.addClass("open");
      }
    },
    function () {
      const anchor = $(this).find("a");
      const menuID = anchor.attr("id");
      const subMenu = $(`#${menuID}`);
      const subMenuDiv = subMenu.siblings(".dropdown");

      if (menuID.length > 0) {
        subMenuDiv.removeClass("open");
      }
    }
  );

  // Açılır Kapanır SearchBox

  const searchIcon = $("#searchIcon");
  const closeIcon = $("#closeIcon");
  const searchInput = $("#searchInput");
  var isOpen = false;

  searchInput.hide();
  closeIcon.hide();

  searchIcon.click(function () {
    if (!isOpen) {
      searchIcon.hide();
      searchInput.animate(
        {
          width: "toggle",
          paddingRight: "toggle",
        },
        400
      );
      closeIcon.show();
    }
    isOpen = true;
  });
  closeIcon.click(function () {
    if (isOpen) {
      searchIcon.show();
      searchInput.animate(
        {
          width: "toggle",
          paddingRight: "toggle",
        },
        400,
        function () {
          searchInput.val("");
        }
      );
      closeIcon.hide();
    }
    isOpen = false;
  });
  //SearchInput dışında bir alana tıklanırsa da SearchInput'un kapanmasını sağlar
  $(window).mouseup(function (e) {
    if (
      isOpen &&
      !searchInput.is(e.target) &&
      searchInput.has(e.target).length === 0
    ) {
      closeIcon.click();
    }
  });

  // Kalp ikonunun üzerine gelindiğinde ikonun değişmesini sağlayan fonk
  var heartIcon = $("nav .menu i.fa-heart");
  heartIcon.hover(
    function () {
      $(this).removeClass("fa-regular fa-heart").addClass("fa-solid fa-heart");
    },
    function () {
      $(this).removeClass("fa-solid fa-heart").addClass("fa-regular fa-heart");
    }
  );

  // Sepet ikonunun üzerine gelindiğinde ikonun değişmesini sağlayan fonk
  var basketIcon = $("nav .menu i.fa-cart-shopping");
  basketIcon.hover(
    function () {
      $(this)
        .removeClass("fa-solid fa-cart-shopping")
        .addClass("fa-solid fa-cart-plus");
    },
    function () {
      $(this)
        .removeClass("fa-solid fa-cart-plus")
        .addClass("fa-solid fa-cart-shopping");
    }
  );

  // Slider Alanı

  const slider = $(".slider");
  const slides = $(".slides");
  const slide = $(".slide");
  const radioButtons = $("input[name='slider-radio']");
  const labels = $(".slider-controls label");
  const buttons = $(".btn");
  var currentSlide = 0;

  labels.eq(currentSlide).css("background", "var(--radiobg-color)");

  radioButtons.change(function () {
    if (this.checked) {
      var selectedIndex = radioButtons.index(this);
      labels.css("background", "none");
      labels.eq(selectedIndex).css("background", "var(--radiobg-color)");

      slides.css("transform", "translateX(-" + selectedIndex * 100 + "%)");
    }
  });

  buttons.click(function (e) {
    e.preventDefault();
    // "prev-btn" düğmesine tıklanırsa bir önceki slayta geçiş yap
    if ($(this).attr("id") === "prev-btn") {
      if (currentSlide > 0) {
        currentSlide = currentSlide - 1;
      } else {
        currentSlide = 0;
      }
    }
    // "next-btn" düğmesine tıklanırsa bir sonraki slayta geçiş yap
    else if ($(this).attr("id") === "next-btn") {
      if (currentSlide < 2) {
        currentSlide = currentSlide + 1;
      } else {
        currentSlide = 0;
      }
    }
    // Seçilen slaytı göstermek için transform işlemini uygula
    slides.css("transform", "translateX(-" + currentSlide * 100 + "%)");
  });
});
