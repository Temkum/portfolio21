$(function () {
  "use strict";
  // filter items on button click
  $(".filterby").on("click", "a", function () {
    const filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue,
    });
  });
  // init Isotope
  const $grid = $(".portfolio-box").isotope({
    itemSelector: ".filter",
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: ".filter",
    },
  });
  //****************************
  // Isotope Load more button
  //****************************
  const initShow = 6; //number of images loaded on init & onclick load more button
  let counter = initShow; //counter for load more button
  let iso = $grid.data("isotope"); // get Isotope instance

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $grid.find(".hidden").removeClass("hidden");

    const hiddenElems = iso.filteredItems
      .slice(toShow, iso.filteredItems.length)
      .map(function (item) {
        return item.element;
      });
    $(hiddenElems).addClass("hidden");
    $grid.isotope("layout");

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      $("#load-more").hide();
    } else {
      $("#load-more").show();
    }
  }

  //append load more button
  $grid.after(
    '<div class="text-center"><a id="load-more" class="btn btn-outline-secondary btn-md btn-arrow m-t-20" href="javascript:void(0)"> <span>Load More <i class="ti-arrow-right"></i></span></a></div>'
  );

  //when load more button clicked
  $("#load-more").click(function () {
    if ($("#filters").data("clicked")) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      j$("#filters").data("clicked", false);
    } else {
      counter = counter;
    }

    counter = counter + initShow;

    loadMore(counter);
  });
});
