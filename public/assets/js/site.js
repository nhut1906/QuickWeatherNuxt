(function ($, window, document, undefined) {
  "use strict";
  var pluginName = "simpleCalendar",
    defaults = {
      months: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
      days: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      displayYear: !0,
      fixedStartDay: !0,
      displayEvent: !0,
      disableEventDetails: !1,
      disableEmptyDetails: !1,
      events: [],
      onInit: function (calendar) {},
      onMonthChange: function (month, year) {},
      onDateSelect: function (date, events) {},
      onEventSelect: function () {},
      onEventCreate: function ($el) {},
      onDayCreate: function ($el, d, m, y) {},
    };
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.currentDate = new Date();
    this.init();
  }
  $.extend(Plugin.prototype, {
    init: function () {
      var container = $(this.element);
      var todayDate = this.currentDate;
      var calendar = $('<div class="calendar"></div>');
      var header = $(
        "<header>" +
          '<div class="month"></div>' +
          '<a class="simple-calendar-btn btn-prev" href="#"></a>' +
          '<a class="simple-calendar-btn btn-next" href="#"></a>' +
          "</header>"
      );
      this.updateHeader(todayDate, header);
      calendar.append(header);
      this.buildCalendar(todayDate, calendar);
      container.append(calendar);
      this.bindEvents();
      this.settings.onInit(this);
    },
    updateHeader: function (date, header) {
      var monthText = this.settings.months[date.getMonth()];
      monthText += this.settings.displayYear
        ? ' <div class="year">' + date.getFullYear()
        : "</div>";
      header.find(".month").html(monthText);
    },
    buildCalendar: function (fromDate, calendar) {
      var plugin = this;
      calendar.find("table").remove();
      var body = $("<table></table>");
      var thead = $("<thead></thead>");
      var tbody = $("<tbody></tbody>");
      var y = fromDate.getFullYear(),
        m = fromDate.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      var startDayOfWeek = firstDay.getDay();
      if (this.settings.fixedStartDay !== !1) {
        startDayOfWeek =
          this.settings.fixedStartDay === !0 ? 1 : this.settings.fixedStartDay;
        while (firstDay.getDay() !== startDayOfWeek) {
          firstDay.setDate(firstDay.getDate() - 1);
        }
        while (lastDay.getDay() !== (startDayOfWeek + 6) % 7) {
          lastDay.setDate(lastDay.getDate() + 1);
        }
      }
      for (var i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
        thead.append(
          $("<td>" + this.settings.days[i % 7].substring(0, 3) + "</td>")
        );
      }
      for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
        var tr = $("<tr></tr>");
        for (var i = 0; i < 7; i++) {
          var td = $(
            '<td><div class="day" data-date="' +
              day.toISOString() +
              '">' +
              day.getDate() +
              "</div></td>"
          );
          var $day = td.find(".day");
          if (day.toDateString() === new Date().toDateString()) {
            $day.addClass("today");
          }
          if (day.getMonth() != fromDate.getMonth()) {
            $day.addClass("wrong-month");
          }
          var todayEvents = plugin.getDateEvents(day);
          if (todayEvents.length && plugin.settings.displayEvent) {
            $day.addClass(
              plugin.settings.disableEventDetails
                ? "has-event disabled"
                : "has-event"
            );
          } else {
            $day.addClass(
              plugin.settings.disableEmptyDetails ? "disabled" : ""
            );
          }
          $day.data("todayEvents", todayEvents);
          this.settings.onDayCreate($day, day.getDate(), m, y);
          tr.append(td);
          day.setDate(day.getDate() + 1);
        }
        tbody.append(tr);
      }
      body.append(thead);
      body.append(tbody);
      var eventContainer = $(
        '<div class="event-container"><div class="close"></div><div class="event-wrapper"></div></div>'
      );
      calendar.append(body);
      calendar.append(eventContainer);
    },
    changeMonth: function (value) {
      this.currentDate.setMonth(this.currentDate.getMonth() + value, 1);
      this.buildCalendar(this.currentDate, $(this.element).find(".calendar"));
      this.updateHeader(
        this.currentDate,
        $(this.element).find(".calendar header")
      );
      this.settings.onMonthChange(
        this.currentDate.getMonth(),
        this.currentDate.getFullYear()
      );
    },
    bindEvents: function () {
      var plugin = this;
      $(plugin.element).off();
      $(plugin.element).on("click", ".btn-prev", function (e) {
        plugin.changeMonth(-1);
        e.preventDefault();
      });
      $(plugin.element).on("click", ".btn-next", function (e) {
        plugin.changeMonth(1);
        e.preventDefault();
      });
      $(plugin.element).on("click", ".day", function (e) {
        var date = new Date($(this).data("date"));
        var events = plugin.getDateEvents(date);
        if (!$(this).hasClass("disabled")) {
          plugin.fillUp(e.pageX, e.pageY);
          plugin.displayEvents(events);
        }
        plugin.settings.onDateSelect(date, events);
      });
      $(plugin.element).on("click", ".event-container .close", function (e) {
        plugin.empty(e.pageX, e.pageY);
      });
    },
    displayEvents: function (events) {
      var plugin = this;
      var container = $(this.element).find(".event-wrapper");
      events.forEach(function (event) {
        var startDate = new Date(event.startDate);
        var endDate = new Date(event.endDate);
        var $event = $(
          "" +
            '<div class="event">' +
            ' <div class="event-hour">' +
            startDate.getHours() +
            ":" +
            (startDate.getMinutes() < 10 ? "0" : "") +
            startDate.getMinutes() +
            "</div>" +
            ' <div class="event-date">' +
            plugin.formatDateEvent(startDate, endDate) +
            "</div>" +
            ' <div class="event-summary">' +
            event.summary +
            "</div>" +
            "</div>"
        );
        $event.data("event", event);
        $event.click(plugin.settings.onEventSelect);
        plugin.settings.onEventCreate($event);
        container.append($event);
      });
    },
    addEvent: function (newEvent) {
      var plugin = this;
      plugin.settings.events = [...plugin.settings.events, newEvent];
      this.buildCalendar(this.currentDate, $(this.element).find(".calendar"));
    },
    setEvents: function (newEvents) {
      var plugin = this;
      plugin.settings.events = newEvents;
      this.buildCalendar(this.currentDate, $(this.element).find(".calendar"));
    },
    fillUp: function (x, y) {
      var plugin = this;
      var elem = $(plugin.element);
      var elemOffset = elem.offset();
      var filler = $('<div class="filler" style=""></div>');
      filler.css("left", x - elemOffset.left);
      filler.css("top", y - elemOffset.top);
      elem.find(".calendar").append(filler);
      filler.animate({ width: "300%", height: "300%" }, 500, function () {
        elem.find(".event-container").show();
        filler.hide();
      });
    },
    empty: function (x, y) {
      var plugin = this;
      var elem = $(plugin.element);
      var elemOffset = elem.offset();
      var filler = elem.find(".filler");
      filler.css("width", "300%");
      filler.css("height", "300%");
      filler.show();
      elem.find(".event-container").hide().find(".event").remove();
      filler.animate({ width: "0%", height: "0%" }, 500, function () {
        filler.remove();
      });
    },
    getDateEvents: function (d) {
      var plugin = this;
      return plugin.settings.events.filter(function (event) {
        return plugin.isDayBetween(
          new Date(d),
          new Date(event.startDate),
          new Date(event.endDate)
        );
      });
    },
    isDayBetween: function (d, dStart, dEnd) {
      dStart.setHours(0, 0, 0);
      dEnd.setHours(23, 59, 59, 999);
      d.setHours(12, 0, 0);
      return dStart <= d && d <= dEnd;
    },
    formatDateEvent: function (dateStart, dateEnd) {
      var formatted = "";
      formatted +=
        this.settings.days[dateStart.getDay()] +
        " - " +
        dateStart.getDate() +
        " " +
        this.settings.months[dateStart.getMonth()].substring(0, 3);
      if (dateEnd.getDate() !== dateStart.getDate()) {
        formatted +=
          " to " +
          dateEnd.getDate() +
          " " +
          this.settings.months[dateEnd.getMonth()].substring(0, 3);
      }
      return formatted;
    },
  });
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
(function ($) {
  $(document).ready(function () {
    $(".weather-time-actions .arrow-left").click(function () {
      $(".weather-time-list").animate({ scrollLeft: "-=160px" }, "slow");
    });
    $(".weather-time-actions .arrow-right").click(function () {
      $(".weather-time-list").animate({ scrollLeft: "+=160px" }, "slow");
    });
    var calendar;
    if ($("#calendar-container").length) {
      let container = $("#calendar-container").simpleCalendar({
        fixedStartDay: 1,
        disableEmptyDetails: !0,
        events: [],
      });
      calendar = container.data("plugin_simpleCalendar");
    }
    if ($(".weather-city-inner").length) {
      var location = $(".weather-city-inner");
      if (location.find("li").length > 24) {
        $(".items").append(
          '<button class="button-primary showMore"><a href="javascript:void(0)">Xem thêm</a></button>'
        );
      }
      $(".weather-city-inner li").slice(0, 24).addClass("shown");
      $(".weather-city-inner li").not(".shown").hide();
      $(".weather-city-inner .showMore").on("click", function () {        
        $(".weather-city-inner li").not(".shown").toggle();
        $(this).toggleClass("showLess");
      });
    }
    $(".search-input").keyup(
      delay(function () {
        $(".search-results").fadeIn();
        $.ajax({
          type: "GET",
          dataType: "html",
          url: ajaxUrl,
          data: { action: "search_location", keyword: this.value },
          beforeSend: function () {
            $(".search-results").html("<div class='loadingspinner'></div>");
          },
          success: function (response) {
            $(".search-results").html(response);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(
              "The following error occured: " + textStatus,
              errorThrown
            );
          },
        });
      }, 500)
    );
    $(document).mouseup(function (e) {
      var searchField = $(".search-input");
      if (!searchField.is(e.target) && searchField.has(e.target).length === 0) {
        searchField.val("");
        $(".search-results").fadeOut();
      }
    });
    $(".widget-search-location").keyup(
      delay(function () {
        $(".widget-search-results").fadeIn();
        $.ajax({
          type: "GET",
          dataType: "html",
          url: ajaxUrl,
          data: { action: "widget_search_location", keyword: this.value },
          beforeSend: function () {
            $(".widget-search-results").html(
              "<div class='loadingspinner'></div>"
            );
          },
          success: function (response) {
            $(".widget-search-results").html(response);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(
              "The following error occured: " + textStatus,
              errorThrown
            );
          },
        });
      }, 500)
    );
    $(document).mouseup(function (e) {
      var searchField = $(".widget-search-location");
      if (!searchField.is(e.target) && searchField.has(e.target).length === 0) {
        $(".widget-search-results").fadeOut();
      }
    });
    $(document).on("click", ".widget_term_id", function () {
      let termId = $(this).data("href");
      let value = $(this).text();
      $("#widget_term_id").val(termId);
      $(".widget-search-location").val(value);
    });
    $("#formControlRange").change(function () {
      $("#range").html(this.value + "px");
      $(".widget-container").css("width", this.value + "px");
    });
    $(".create-widget").submit(function (e) {
      e.preventDefault();
      let formData = $(this).serialize();
      $.ajax({
        type: "GET",
        dataType: "html",
        url: ajaxUrl,
        data: { action: "create_widget", data: formData },
        success: function (response) {
          $(".widget-container").html(response);
          $("#urlValue").val(response);
        },
      });
    });
    $(".btn-copy").click(function () {
      $("#urlValue").select();
      document.execCommand("copy");
      alert("Đã copy thành công!");
    });
    $("#tracuu").submit(function (event) {
      event.preventDefault();
      var sbd = $("#tracuu input").val();
      $.ajax({
        type: "POST",
        url: "https://diemthi.tuoitre.vn/search-thpt-score",
        data: { data: sbd, code: "" },
        success: function (data) {
          var myArray = data.score.split(";");
          var html =
            '<table class="table tbl-score"><tbody><tr><td scope="col">Môn học</td><td scope="col">Số điểm</td></tr>';
          myArray.forEach((element) => {
            var item = element.split(":");
            if (item[0]) {
              html += "<tr>";
              html +=
                item[0] == "NgoạiNgữ"
                  ? "<td>Ngoại ngữ</td>"
                  : item[0] == "Mãmônngoạingữ"
                  ? "<td>Mã môn ngoại ngữ</td>"
                  : "<td>" + item[0] + "</td>";
              html += "<td>" + item[1] + "</td>";
              html += "</tr>";
            }
          });
          html += "</tbody></table>";
          $(".show-ket-qua").html(html);
        },
      });
    });
    $("#showMoreContent").click(function (evt) {
      evt.preventDefault();
      let parent = $(this).closest(".collapse-desc").find(".entry-content");
      if (parent.hasClass("active")) {
        parent.removeClass("active");
        $("#showMoreContent").text("Mở rộng");
      } else {
        parent.addClass("active");
        $("#showMoreContent").text("Thu gọn");
      }
    });
  });
})(jQuery);
function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}
