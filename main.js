$(document).ready(function () {
  // Menü verilerini json dosyasından çekme işlemi

  var dbUrl = "http://localhost:3000/menu";
  $.ajax({
    method: "GET",
    url: dbUrl,
    dataType: "json",
  }).done(function (data) {
    const navbarAnchor = $("#menu-items li a");

    navbarAnchor.each(function (index, element) {
      var menuId = $(element).data("menu");
      var menuIdSelector = $(`#${menuId}`);
      const dropdownContainer = menuIdSelector.siblings(".dropdown-container");

      // JSON verileri ile eşleşen menü verilerini alın
      var dropdownData = data.find(function (item) {
        return item.hasOwnProperty(menuId);
      });

      var dropdownContent = createDropdownContent(dropdownData[menuId]);

      //dropdownContainer.html(""); // Önceki içeriği temizle
      dropdownContainer.html(dropdownContent);
    });
  });

  function createDropdownContent(data) {
    var content = "<div class='dropdown'><ul>";

    for (var key in data) {
      content += "<li><a href='#' class='headline'>" + key + "</a><ul>";

      data[key].forEach(function (item) {
        content += "<li><a href='#'>" + item + "</a></li>";
      });

      content += "</ul></li>";
    }

    content += "</ul></div>";
    return content;
  }
  //hover
  const navbar = $("#menu-items li a");
  navbar.mouseover(function () {
    var menuId = $(this).data("menu");
    var menuIdSelector = $(`#${menuId}`);
    const dropdownContainer = menuIdSelector.siblings(".dropdown-container");
    dropdownContainer.addClass("open");
  });
  const headerAndNav = $("header, nav ul li");
  headerAndNav.mouseleave(function () {
    const dropdownContainers = $(".dropdown-container");
    dropdownContainers.removeClass("open");
  });

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

  // Açılır TopBar

  const topbar = $(".topbar");
  const topbarBox = $(".topbar-box");
  const dropdownTopbar = $(".dropdown-topbar");
  const topbarIcon = $("i.fa-angle-down");

  dropdownTopbar.hide();
  topbar.click(function (e) {
    e.preventDefault();
    if (!dropdownTopbar.is(":visible")) {
      topbarBox.css({
        visibility: "hidden",
        transform: "translateX(-60%)",
      });
      dropdownTopbar.slideDown(700);
    }
  });

  const closeTopbarBtn = $("#closeTopbarBtn");
  closeTopbarBtn.click(function () {
    dropdownTopbar.slideUp(700, function () {
      topbarBox.css({
        visibility: "visible",
        transform: "translateX(0)",
        transition: "transform .6s ease",
      });
    });
  });

  // Topbar dışında bir alana tıklanırsa topbar'ı kapat
  $(window).mouseup(function (e) {
    if (
      dropdownTopbar.is(":visible") &&
      !topbar.is(e.target) &&
      topbar.has(e.target).length === 0
    ) {
      closeTopbarBtn.click();
    }
  });

  // Açılır SearchBox

  const searchIcon = $("#searchIcon");
  const closeIcon = $("#closeIcon");
  const searchInput = $("#searchInput");
  var isOpen = false;

  searchInput.hide();
  closeIcon.hide();

  searchIcon.click(function (e) {
    e.preventDefault();
    if (!isOpen) {
      searchIcon.hide();
      searchInput.animate(
        {
          width: "toggle",
          padding: "toggle",
        },
        400
      );
      closeIcon.show();
    }
    isOpen = true;
  });
  closeIcon.click(function (e) {
    e.preventDefault();
    if (isOpen) {
      searchIcon.show();
      searchInput.animate(
        {
          width: "toggle",
          padding: "toggle",
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
  const buttons = $(".slider-btn");
  var currentSlide = 0;

  labels.eq(currentSlide).css("background", "var(--radiobg-color)");

  //Slider düğmelerine tıklandığında kaydırma
  radioButtons.change(function () {
    if (this.checked) {
      var selectedIndex = radioButtons.index(this);
      labels.css("background", "none");
      const colors = ["var(--radiobg-color)", "var(--bg-color)", "var(--grey)"];
      labels.css("border", `3px solid ${colors[selectedIndex]}`);
      labels.eq(selectedIndex).css("background", colors[selectedIndex]);

      slides.css("transform", "translateX(-" + selectedIndex * 100 + "%)");
      currentSlide = selectedIndex;
    }
  });

  //Slider oklarına tıklandığında kaydırma
  buttons.click(function (e) {
    e.preventDefault();
    // "prev-btn" düğmesine tıklanırsa bir önceki slayta geçiş yap
    if ($(this).attr("id") === "prev-btn") {
      if (currentSlide > 0) {
        currentSlide = currentSlide - 1;
      } else {
        currentSlide = 2;
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
    // Radio düğmesini güncelle
    radioButtons.eq(currentSlide).prop("checked", true);
    // Seçili radio düğmesi haricindekilerin arka planını kaldır
    labels.css("background", "none");
    // Seçili radio düğmesinin arka planına ve çerçevesine uygun rengi ver
    const colors = ["var(--radiobg-color)", "var(--bg-color)", "var(--grey)"];
    labels.css("border", `3px solid ${colors[currentSlide]}`);
    labels.eq(currentSlide).css("background", colors[currentSlide]);
  });

  const sneakerSliderButtons = $(".sneaker-slider-btn");
  const sneakerCards = $(".sneaker-card");
  const slidePercentage = 100;
  const cardCount = sneakerCards.length;
  let currentCardIndex = 0;

  sneakerSliderButtons.click(function (e) {
    e.preventDefault();

    if ($(this).attr("id") == "sneakerBtnNext") {
      currentCardIndex = (currentCardIndex + 1) % (cardCount - 2);
      // console.log("NextBtn Index: " + currentCardIndex);
    } else if ($(this).attr("id") == "sneakerBtnPrev") {
      currentCardIndex =
        (currentCardIndex - 1 + (cardCount - 2)) % (cardCount - 2);
      // console.log("PrevBtn Index: " + currentCardIndex);
    }

    const translateXValue = -currentCardIndex * slidePercentage;
    sneakerCards.css("transform", `translateX(${translateXValue}%)`);
  });
  const anadiv = $(".sneaker-cards");
  const div1 = $(".sneaker-card:nth-child(2)");
  const div3 = $(".sneaker-card:nth-child(2)");
  const distance = div1.offset().left - anadiv.offset().left;
  // console.log(div1.position().left);
  console.log("İlk kartın mesafesi: " + distance + " px");

// Ana div'in sağ kenarının konumu
const anadivRight = anadiv.offset().left + anadiv.outerWidth();

// Üçüncü kartın sağ kenarının konumu
const div3Right = div3.offset().left + div3.outerWidth();
console.log("Üçüncü kartın mesafesi: " + (anadivRight - div3Right) + " px");
});
