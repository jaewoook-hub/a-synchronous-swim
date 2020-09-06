(function() {
  console.log('httpHandler.js is working')

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  // ajax get request

const ajaxGetRequest = (callback) => {
  $.ajax({
    type: 'GET',
    url: serverUrl,
    //cache: false,
    // contentType: false,
    // processData: false,
    success: (data) => {
      // reload the page

      var dataString = data.toString();
      callback(dataString);
      // window.location = window.location.href;
    },
   complete: () => {
     ajaxGetRequest(SwimTeam.move);
   }
  });
};

const ajaxGetBackgroundRequest = () => {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/background.jpg',
    //data: 'background.jpg',
    success: (data) => {
      // console.log('this is the data: ',data);

    }
  });
};

ajaxGetBackgroundRequest();
// ajaxGetRequest(SwimTeam.move);

  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: '/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();
