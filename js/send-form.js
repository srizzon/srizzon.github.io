window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contactForm");
    var button = document.getElementById("send-button-form");
    var status = document.getElementById("form-message-warning");

    // Success and Error functions for after the form is submitted
    
    function success() {
      $('#form-message-warning').hide();
      setTimeout(function(){
        $('#contactForm').fadeOut();
      }, 1000);
      setTimeout(function(){
        $('#form-message-success').fadeIn();   
      }, 1400);
    }

    function error() {
      $('#form-message-warning').html(msg);
      $('#form-message-warning').fadeIn();
      $submit.css('display', 'none');
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }