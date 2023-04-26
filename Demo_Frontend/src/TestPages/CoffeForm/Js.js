// (function () {
//   $(".form-group .form-field")
//     .on("focus change", function () {
//       if (
//         !(
//           $(this).closest(".form-group").hasClass("select") &&
//           $(this).val() === ""
//         )
//       ) {
//         $(this).closest(".form-group").addClass("moved");
//       }
//     })
//     .on("blur change", function () {
//       if ($(this).val().trim() === "") {
//         $(this).closest(".form-group").removeClass("moved");
//       }
//     })
//     .on("change keypress", function () {
//       $(this).closest(".invalid").removeClass("invalid");
//     });

//   window.emailRegex =
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//   $("form").on("submit", function (e) {
//     var form, valid;
//     valid = true;
//     form = $(this);
//     form.find(".invalid").removeClass("invalid");
//     form.find(".required").each(function () {
//       var field, val;
//       field = $(this);
//       val = field.val().trim();
//       if (
//         val === "" ||
//         (field.attr("type") === "email" && !emailRegex.test(val))
//       ) {
//         valid = false;
//         field.closest(".form-group").addClass("invalid");
//         field.focus();
//         return false;
//       }
//     });
//     if (!valid) {
//       e.preventDefault();
//     } else {
//       alert(form.serialize());
//       e.preventDefault();
//     }
//   });

//   $("form .error-message").on("click", function () {
//     $(this).closest(".invalid").removeClass("invalid");
//   });

//   $(".bg-toggle").on("click", function () {
//     $("body,form").toggleClass("dark");
//   });

//   if (!/Mobi/.test(navigator.userAgent)) {
//     $(".form-group.select select")
//       .on("mousedown touchstart focus", function (e) {
//         var isOpen;
//         e.preventDefault();
//         isOpen = $(this).siblings(".dropdown").hasClass("open");
//         $(".form-group .dropdown").removeClass("open");
//         if (isOpen !== true) {
//           $(this).siblings(".dropdown").addClass("open");
//         }
//         $(this).blur().siblings(".dropdown").find("a.selected").focus();
//       })
//       .each(function () {
//         var dropdown, options;
//         options = $(this).find("option");
//         dropdown = $("<ul></ul>").addClass("dropdown");
//         options.each(function () {
//           var li, option, optionText, optionValue;
//           optionValue = $(this).attr("value");
//           optionText = $(this).text();
//           li = $("<li></li>");
//           option = $("<a></a>")
//             .attr({
//               href: "#",
//               "data-val": optionValue,
//             })
//             .text(optionText);
//           if ($(this).attr("selected")) {
//             option.addClass("selected");
//           }
//           option
//             .on("click", function (e) {
//               e.preventDefault();
//               dropdown.find(".selected").removeClass("selected");
//               $(this)
//                 .addClass("selected")
//                 .closest(".form-group")
//                 .find("select")
//                 .val($(this).attr("data-val"))
//                 .trigger("change");
//               dropdown.removeClass("open");
//             })
//             .on("keydown", function (e) {
//               var key;
//               key = e.keyCode ? e.keyCode : e.which;
//               if (key === 40) {
//                 $(this).closest("li").next("li").find("a").focus();
//               } else if (key === 38) {
//                 $(this).closest("li").prev("li").find("a").focus();
//               }
//             });
//           li.append(option);
//           return dropdown.append(li);
//         });
//         $(this).closest(".form-group").append(dropdown);
//       });
//   }

//   $(document).on("click", function (e) {
//     if (
//       !$(e.target).closest(".form-group.select").find(".dropdown.open").length
//     ) {
//       return $(".form-group .dropdown").removeClass("open");
//     }
//   });
// }).call(this);

// //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUseUJBQUYsQ0FBNEIsQ0FBQyxFQUE3QixDQUFnQyxjQUFoQyxFQUFnRCxRQUFBLENBQUEsQ0FBQTtJQUMvQyxNQUFPLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxPQUFSLENBQWdCLGFBQWhCLENBQThCLENBQUMsUUFBL0IsQ0FBd0MsUUFBeEMsQ0FBQSxJQUFzRCxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsR0FBUixDQUFBLENBQUEsS0FBaUIsR0FBOUU7TUFDQyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixhQUFoQixDQUE4QixDQUFDLFFBQS9CLENBQXdDLE9BQXhDLEVBREQ7O0VBRCtDLENBQWhELENBSUEsQ0FBQyxFQUpELENBSUksYUFKSixFQUltQixRQUFBLENBQUEsQ0FBQTtJQUNsQixJQUFHLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxHQUFSLENBQUEsQ0FBYSxDQUFDLElBQWQsQ0FBQSxDQUFBLEtBQXdCLEVBQTNCO01BQ0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0IsYUFBaEIsQ0FBOEIsQ0FBQyxXQUEvQixDQUEyQyxPQUEzQyxFQUREOztFQURrQixDQUpuQixDQVFBLENBQUMsRUFSRCxDQVFJLGlCQVJKLEVBUXVCLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxPQUFSLENBQWdCLFVBQWhCLENBQTJCLENBQUMsV0FBNUIsQ0FBd0MsU0FBeEM7RUFEc0IsQ0FSdkI7O0VBWUEsTUFBTSxDQUFDLFVBQVAsR0FBb0I7O0VBRXBCLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsUUFBYixFQUF1QixRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQ3ZCLFFBQUEsSUFBQSxFQUFBO0lBQUMsS0FBQSxHQUFRO0lBQ1IsSUFBQSxHQUFPLENBQUEsQ0FBRSxJQUFGO0lBQ1AsSUFBSSxDQUFDLElBQUwsQ0FBVSxVQUFWLENBQXFCLENBQUMsV0FBdEIsQ0FBa0MsU0FBbEM7SUFDQSxJQUFJLENBQUMsSUFBTCxDQUFVLFdBQVYsQ0FBc0IsQ0FBQyxJQUF2QixDQUE0QixRQUFBLENBQUEsQ0FBQTtBQUM3QixVQUFBLEtBQUEsRUFBQTtNQUFFLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRjtNQUNSLEdBQUEsR0FBTSxLQUFLLENBQUMsR0FBTixDQUFBLENBQVcsQ0FBQyxJQUFaLENBQUE7TUFDTixJQUFHLEdBQUEsS0FBTyxFQUFQLElBQWEsQ0FBQyxLQUFLLENBQUMsSUFBTixDQUFXLE1BQVgsQ0FBQSxLQUFzQixPQUF0QixJQUFrQyxDQUFDLFVBQVUsQ0FBQyxJQUFYLENBQWdCLEdBQWhCLENBQXBDLENBQWhCO1FBQ0MsS0FBQSxHQUFRO1FBQ1IsS0FBSyxDQUFDLE9BQU4sQ0FBYyxhQUFkLENBQTRCLENBQUMsUUFBN0IsQ0FBc0MsU0FBdEM7UUFDQSxLQUFLLENBQUMsS0FBTixDQUFBO0FBQ0EsZUFBTyxNQUpSOztJQUgyQixDQUE1QjtJQVFBLElBQUcsQ0FBQyxLQUFKO01BQ0MsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxFQUREO0tBQUEsTUFBQTtNQUdDLEtBQUEsQ0FBTSxJQUFJLENBQUMsU0FBTCxDQUFBLENBQU47TUFDQSxDQUFDLENBQUMsY0FBRixDQUFBLEVBSkQ7O0VBWnNCLENBQXZCOztFQW1CQSxDQUFBLENBQUUscUJBQUYsQ0FBd0IsQ0FBQyxFQUF6QixDQUE0QixPQUE1QixFQUFxQyxRQUFBLENBQUEsQ0FBQTtJQUNwQyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixVQUFoQixDQUEyQixDQUFDLFdBQTVCLENBQXdDLFNBQXhDO0VBRG9DLENBQXJDOztFQUlBLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxFQUFoQixDQUFtQixPQUFuQixFQUE0QixRQUFBLENBQUEsQ0FBQTtJQUMzQixDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsV0FBZixDQUEyQixNQUEzQjtFQUQyQixDQUE1Qjs7RUFJQSxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVMsQ0FBQyxTQUF0QixDQUFELENBQUo7SUFDQyxDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxFQUEvQixDQUFrQyw0QkFBbEMsRUFBZ0UsUUFBQSxDQUFDLENBQUQsQ0FBQTtBQUNqRSxVQUFBO01BQUUsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtNQUNBLE1BQUEsR0FBUyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQixXQUFqQixDQUE2QixDQUFDLFFBQTlCLENBQXVDLE1BQXZDO01BQ1QsQ0FBQSxDQUFFLHVCQUFGLENBQTBCLENBQUMsV0FBM0IsQ0FBdUMsTUFBdkM7TUFDQSxJQUFHLE1BQUEsS0FBWSxJQUFmO1FBQ0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsV0FBakIsQ0FBNkIsQ0FBQyxRQUE5QixDQUF1QyxNQUF2QyxFQUREOztNQUVBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQUEsQ0FBYyxDQUFDLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBb0MsQ0FBQyxJQUFyQyxDQUEwQyxZQUExQyxDQUF1RCxDQUFDLEtBQXhELENBQUE7SUFOK0QsQ0FBaEUsQ0FRQSxDQUFDLElBUkQsQ0FRTSxRQUFBLENBQUEsQ0FBQTtBQUNQLFVBQUEsUUFBQSxFQUFBO01BQUUsT0FBQSxHQUFVLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsUUFBYjtNQUNWLFFBQUEsR0FBVyxDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsUUFBZixDQUF3QixVQUF4QjtNQUNYLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBQSxDQUFBLENBQUE7QUFDZixZQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBO1FBQUcsV0FBQSxHQUFjLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsT0FBYjtRQUNkLFVBQUEsR0FBYSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFBO1FBQ2IsRUFBQSxHQUFLLENBQUEsQ0FBRSxXQUFGO1FBQ0wsTUFBQSxHQUFTLENBQUEsQ0FBRSxTQUFGLENBQVksQ0FBQyxJQUFiLENBQWtCO1VBQUMsTUFBQSxFQUFRLEdBQVQ7VUFBYyxVQUFBLEVBQVk7UUFBMUIsQ0FBbEIsQ0FBeUQsQ0FBQyxJQUExRCxDQUErRCxVQUEvRDtRQUNULElBQUcsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxVQUFiLENBQUg7VUFDQyxNQUFNLENBQUMsUUFBUCxDQUFnQixVQUFoQixFQUREOztRQUVBLE1BQU0sQ0FBQyxFQUFQLENBQVUsT0FBVixFQUFtQixRQUFBLENBQUMsQ0FBRCxDQUFBO1VBQ2xCLENBQUMsQ0FBQyxjQUFGLENBQUE7VUFDQSxRQUFRLENBQUMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBQyxXQUEzQixDQUF1QyxVQUF2QztVQUNBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCLENBQ0EsQ0FBQyxPQURELENBQ1MsYUFEVCxDQUVBLENBQUMsSUFGRCxDQUVNLFFBRk4sQ0FHQSxDQUFDLEdBSEQsQ0FHSyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLFVBQWIsQ0FITCxDQUlBLENBQUMsT0FKRCxDQUlTLFFBSlQ7VUFLQSxRQUFRLENBQUMsV0FBVCxDQUFxQixNQUFyQjtRQVJrQixDQUFuQixDQVVBLENBQUMsRUFWRCxDQVVJLFNBVkosRUFVZSxRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQ2xCLGNBQUE7VUFBSSxHQUFBLEdBQVMsQ0FBQyxDQUFDLE9BQUwsR0FBa0IsQ0FBQyxDQUFDLE9BQXBCLEdBQWlDLENBQUMsQ0FBQztVQUN6QyxJQUFHLEdBQUEsS0FBTyxFQUFWO1lBQ0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixJQUEzQixDQUFnQyxDQUFDLElBQWpDLENBQXNDLEdBQXRDLENBQTBDLENBQUMsS0FBM0MsQ0FBQSxFQUREO1dBQUEsTUFFSyxJQUFHLEdBQUEsS0FBTyxFQUFWO1lBQ0osQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixJQUEzQixDQUFnQyxDQUFDLElBQWpDLENBQXNDLEdBQXRDLENBQTBDLENBQUMsS0FBM0MsQ0FBQSxFQURJOztRQUpTLENBVmY7UUFpQkEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxNQUFWO2VBQ0EsUUFBUSxDQUFDLE1BQVQsQ0FBZ0IsRUFBaEI7TUF6QlksQ0FBYjtNQTBCQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixhQUFoQixDQUE4QixDQUFDLE1BQS9CLENBQXNDLFFBQXRDO0lBN0JLLENBUk4sRUFERDs7O0VBeUNBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxFQUFaLENBQWUsT0FBZixFQUF3QixRQUFBLENBQUMsQ0FBRCxDQUFBO0lBQ3ZCLEtBQU8sQ0FBQSxDQUFFLENBQUMsQ0FBQyxNQUFKLENBQVcsQ0FBQyxPQUFaLENBQW9CLG9CQUFwQixDQUF5QyxDQUFDLElBQTFDLENBQStDLGdCQUEvQyxDQUFnRSxDQUFDLE1BQXhFO2FBQ0MsQ0FBQSxDQUFFLHVCQUFGLENBQTBCLENBQUMsV0FBM0IsQ0FBdUMsTUFBdkMsRUFERDs7RUFEdUIsQ0FBeEI7QUFsRkEiLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiLmZvcm0tZ3JvdXAgLmZvcm0tZmllbGRcIikub24gXCJmb2N1cyBjaGFuZ2VcIiwgKCkgLT5cblx0dW5sZXNzICQodGhpcykuY2xvc2VzdChcIi5mb3JtLWdyb3VwXCIpLmhhc0NsYXNzKFwic2VsZWN0XCIpIGFuZCAkKHRoaXMpLnZhbCgpIGlzIFwiXCJcblx0XHQkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5hZGRDbGFzcyhcIm1vdmVkXCIpXG5cdHJldHVyblxuLm9uIFwiYmx1ciBjaGFuZ2VcIiwgKCkgLT5cblx0aWYgJCh0aGlzKS52YWwoKS50cmltKCkgaXMgXCJcIiBcblx0XHQkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5yZW1vdmVDbGFzcyhcIm1vdmVkXCIpXG5cdHJldHVyblxuLm9uIFwiY2hhbmdlIGtleXByZXNzXCIsICgpIC0+XG5cdCQodGhpcykuY2xvc2VzdChcIi5pbnZhbGlkXCIpLnJlbW92ZUNsYXNzIFwiaW52YWxpZFwiXG5cdHJldHVyblxuICAgIFxud2luZG93LmVtYWlsUmVnZXggPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4kKFwiZm9ybVwiKS5vbiBcInN1Ym1pdFwiLCAoZSkgLT5cblx0dmFsaWQgPSB0cnVlO1xuXHRmb3JtID0gJCh0aGlzKVxuXHRmb3JtLmZpbmQoXCIuaW52YWxpZFwiKS5yZW1vdmVDbGFzcyhcImludmFsaWRcIilcblx0Zm9ybS5maW5kKFwiLnJlcXVpcmVkXCIpLmVhY2ggKCkgLT5cblx0XHRmaWVsZCA9ICQodGhpcylcblx0XHR2YWwgPSBmaWVsZC52YWwoKS50cmltKClcblx0XHRpZiB2YWwgaXMgXCJcIiBvciAoZmllbGQuYXR0cihcInR5cGVcIikgaXMgXCJlbWFpbFwiIGFuZCAhZW1haWxSZWdleC50ZXN0KHZhbCkpXG5cdFx0XHR2YWxpZCA9IGZhbHNlO1xuXHRcdFx0ZmllbGQuY2xvc2VzdChcIi5mb3JtLWdyb3VwXCIpLmFkZENsYXNzIFwiaW52YWxpZFwiXG5cdFx0XHRmaWVsZC5mb2N1cygpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0aWYgIXZhbGlkXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdGVsc2Vcblx0XHRhbGVydChmb3JtLnNlcmlhbGl6ZSgpKVxuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRyZXR1cm5cbiAgICBcbiQoXCJmb3JtIC5lcnJvci1tZXNzYWdlXCIpLm9uIFwiY2xpY2tcIiwgKCkgLT5cblx0JCh0aGlzKS5jbG9zZXN0KFwiLmludmFsaWRcIikucmVtb3ZlQ2xhc3MgXCJpbnZhbGlkXCJcblx0cmV0dXJuXG5cbiQoXCIuYmctdG9nZ2xlXCIpLm9uIFwiY2xpY2tcIiwgKCkgLT5cblx0JCgnYm9keSxmb3JtJykudG9nZ2xlQ2xhc3MoJ2RhcmsnKVxuXHRyZXR1cm5cblxuaWYgISgvTW9iaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcblx0JChcIi5mb3JtLWdyb3VwLnNlbGVjdCBzZWxlY3RcIikub24gXCJtb3VzZWRvd24gdG91Y2hzdGFydCBmb2N1c1wiLCAoZSkgLT5cblx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRpc09wZW4gPSAkKHRoaXMpLnNpYmxpbmdzKFwiLmRyb3Bkb3duXCIpLmhhc0NsYXNzIFwib3BlblwiXG5cdFx0JChcIi5mb3JtLWdyb3VwIC5kcm9wZG93blwiKS5yZW1vdmVDbGFzcyBcIm9wZW5cIlxuXHRcdGlmIGlzT3BlbiBpc250IHRydWVcblx0XHRcdCQodGhpcykuc2libGluZ3MoXCIuZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJvcGVuXCIpXG5cdFx0JCh0aGlzKS5ibHVyKCkuc2libGluZ3MoXCIuZHJvcGRvd25cIikuZmluZChcImEuc2VsZWN0ZWRcIikuZm9jdXMoKVxuXHRcdHJldHVyblxuXHQuZWFjaCAoKSAtPlxuXHRcdG9wdGlvbnMgPSAkKHRoaXMpLmZpbmQgXCJvcHRpb25cIlxuXHRcdGRyb3Bkb3duID0gJChcIjx1bD48L3VsPlwiKS5hZGRDbGFzcyBcImRyb3Bkb3duXCJcblx0XHRvcHRpb25zLmVhY2ggKCkgLT5cblx0XHRcdG9wdGlvblZhbHVlID0gJCh0aGlzKS5hdHRyKFwidmFsdWVcIilcblx0XHRcdG9wdGlvblRleHQgPSAkKHRoaXMpLnRleHQoKVxuXHRcdFx0bGkgPSAkKFwiPGxpPjwvbGk+XCIpXG5cdFx0XHRvcHRpb24gPSAkKFwiPGE+PC9hPlwiKS5hdHRyKHtcImhyZWZcIjogXCIjXCIsIFwiZGF0YS12YWxcIjogb3B0aW9uVmFsdWV9KS50ZXh0KG9wdGlvblRleHQpXG5cdFx0XHRpZiAkKHRoaXMpLmF0dHIgXCJzZWxlY3RlZFwiXG5cdFx0XHRcdG9wdGlvbi5hZGRDbGFzcyBcInNlbGVjdGVkXCJcblx0XHRcdG9wdGlvbi5vbiBcImNsaWNrXCIsIChlKSAtPlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0ZHJvcGRvd24uZmluZChcIi5zZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKVxuXHRcdFx0XHQuY2xvc2VzdChcIi5mb3JtLWdyb3VwXCIpXG5cdFx0XHRcdC5maW5kKFwic2VsZWN0XCIpXG5cdFx0XHRcdC52YWwoJCh0aGlzKS5hdHRyKFwiZGF0YS12YWxcIikpXG5cdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpXG5cdFx0XHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwib3BlblwiKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdC5vbiBcImtleWRvd25cIiwgKGUpIC0+XG5cdFx0XHRcdGtleSA9IGlmIGUua2V5Q29kZSB0aGVuIGUua2V5Q29kZSBlbHNlIGUud2hpY2hcblx0XHRcdFx0aWYga2V5IGlzIDQwXG5cdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGlcIikubmV4dChcImxpXCIpLmZpbmQoXCJhXCIpLmZvY3VzKClcblx0XHRcdFx0ZWxzZSBpZiBrZXkgaXMgMzhcblx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsaVwiKS5wcmV2KFwibGlcIikuZmluZChcImFcIikuZm9jdXMoKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGxpLmFwcGVuZCBvcHRpb25cblx0XHRcdGRyb3Bkb3duLmFwcGVuZCBsaVxuXHRcdCQodGhpcykuY2xvc2VzdChcIi5mb3JtLWdyb3VwXCIpLmFwcGVuZCBkcm9wZG93blxuXHRcdHJldHVyblxuXG4kKGRvY3VtZW50KS5vbiBcImNsaWNrXCIsIChlKSAtPlxuXHR1bmxlc3MgJChlLnRhcmdldCkuY2xvc2VzdChcIi5mb3JtLWdyb3VwLnNlbGVjdFwiKS5maW5kKFwiLmRyb3Bkb3duLm9wZW5cIikubGVuZ3RoXG5cdFx0JChcIi5mb3JtLWdyb3VwIC5kcm9wZG93blwiKS5yZW1vdmVDbGFzcyBcIm9wZW5cIiJdfQ==
// //# sourceURL=coffeescript
