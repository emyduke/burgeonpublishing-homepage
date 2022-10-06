$(document).ready(function () {

  $('[data-toggle="tooltip"]').tooltip();

  $('[data-toggle="popover"]').popover();

  $('.table').DataTable();


  $('.carousel-landing').slick({
    arrows: false,
    prevArrow: "<div class='slick--prev'><i class='fa fa-chevron-left fa-2x' aria-hidden='true'></i></div>",
    nextArrow: "<div class='slick--next'><i class='fa fa-chevron-right fa-2x' aria-hidden='true'></i></div>",
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: 'linear'
  });

  $('.carousel-landing').show();


  $('.carousel-banner').slick({
    arrows: false,
    prevArrow: "<div class='slick--prev'><i class='fa fa-chevron-left fa-2x' aria-hidden='true'></i></div>",
    nextArrow: "<div class='slick--next'><i class='fa fa-chevron-right fa-2x' aria-hidden='true'></i></div>",
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear'
  });


  $('.product-slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 430,
        settings: "unslick"
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  })




});



window.searchLoaded = false;
const fetchAllBooks = () => {
  $.ajax({
    type: 'POST',
    url: "/all-books/",
    data: { 'csrfmiddlewaretoken': csrf_token },
    dataType: 'json',
    success: function (response) {
      $('#searchDropdown').html(response.html);
      $('#searchDropdown2').html(response.html);
      window.searchLoaded = true;
    },
    error: function (rs, e) {
      console.log(rs.responseText);
    },
  });
}

// search
$(document).on('focus', '#searchInput', function () {
  // load up products for filtering
  if (!window.searchLoaded) {
    fetchAllBooks();
  }

  setTimeout(() => {
    $("#searchDropdown").addClass('show');
  }, 300);
});

$(document).on('blur', '#searchInput', function () {
  setTimeout(() => {
    $("#searchDropdown").removeClass('show')
  }, 300)
});

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("searchDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchInput2");
  filter = input.value.toUpperCase();
  div = document.getElementById("searchDropdown2");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}





$(document).ready(function () {  //to check if clicked outside the element
  $(document).on('mouseover, click', '.cart', function (e) {
    $('.cart-dropdown-block').show();
    e.stopPropagation();    // <==

  });



  // when sidemenu category is clicked
  $('.category-mobile').on('click', function (e) {
    e.stopPropagation();

    setTimeout(() => {
      loadMegaCategory($(this).data('category'));
      $('.off-canvas-wrapper').hide();
      $('.dropdown-content-category').show();
    }, 500);

  })

  $(document).on('mouseover', '.menu-dropdown-container', function (e) {
    $(".menu-dropdown-container").find(".menu-dropdown-block").hide();
    $(this).find('.menu-dropdown-block').show();
  })



  $('.megamenu-toggler').on('click', function (e) {
    loadMegaCategory($(this).data('category'));
    $('.dropdown-content-category').show();
    e.stopPropagation();
  });

  $('.toggle-off-canvas-menu').on('click', function (e) {
    $('.off-canvas-wrapper').show();
  });

  $('.toggle-off-canvas-search').on('click', function (e) {
    // load up products for filtering in mobile view
    if (!window.searchLoaded) {
      fetchAllBooks();
    }

    $('.off-canvas-search-wrapper').show();
  })

  $(document).mouseup(function (e) {
    var $offCanvasInner = $(".off-canvas-inner");

    // if the target of the click isn't the $offCanvasInner nor a descendant of the container
    if (!$offCanvasInner.is(e.target) && $offCanvasInner.has(e.target).length === 0) {
      if ($('.off-canvas-wrapper').css('display') == "block") {
        $('.off-canvas-wrapper').hide();
      }

      if ($('.off-canvas-search-wrapper').css('display') == "block") {
        $('.off-canvas-search-wrapper').hide();
      }
    }

    //$('.cart-dropdown-block').css({ opacity: 0 });
    var $cartDropdownBlock = $(".cart-dropdown-block");
    if (!$cartDropdownBlock.is(e.target) && $cartDropdownBlock.has(e.target).length === 0) {
      $cartDropdownBlock.hide();
    }

    var $menuDropdownBlock = $(".menu-dropdown-block");
    if (!$menuDropdownBlock.is(e.target) && $menuDropdownBlock.has(e.target).length === 0) {
      $menuDropdownBlock.hide();
    }

    // $('.dropdown-content-category').hide();
    $dropdownContent = $('.dropdown-content-category');
    if (!$dropdownContent.is(e.target) && $dropdownContent.has(e.target).length === 0) {
      if ($dropdownContent.css('display') == "block") {
        $dropdownContent.hide();
      }
    }

  });



})













$(function () {

  $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantityContainer input');
  $('.quantityContainer').each(function () {
    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

  });
})



$(function () {
  var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
    keyboard: false,
    backdrop: 'static'
  })

  // retrieve item from localStorage
  var initialProceedAsChoice = localStorage.getItem("proceedAs");
  if (initialProceedAsChoice === null) {
    loginModal.show();
  }


  // loginModal.show();


  $(document).on('click', '#btnProceedAs', function () {
    var $choice = $('[name="proceedAs"]:checked');
    if ($choice.val() === "guest") {
      loginModal.hide();
    } else {
      $('#blockProceedAss').hide();
      $('#blockLogin').show();
    }

    // Store
    localStorage.setItem("proceedAs", $choice.val());
  });

})























































var scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };

var elementsToShow = document.querySelectorAll('.show-on-scroll');
var textToShow = document.querySelectorAll('.animate-text-on-scroll');
var btnsToShow = document.querySelectorAll('.inline-btns');
var boxToShow = document.querySelectorAll('.feature-box');

function loop() {
  /*elementsToShow.forEach(function(element) {
      if (isElementInViewport(element)) {
          element.classList.add('is-visible');
      }else{
          element.classList.remove('is-visible');
      }
  });*/

  const loopAndShowElem = elems => {
    elems.forEach(function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });
  }
  loopAndShowElem(elementsToShow);
  loopAndShowElem(textToShow);
  loopAndShowElem(btnsToShow);
  loopAndShowElem(boxToShow);

  scroll(loop);
}

loop();

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );

}