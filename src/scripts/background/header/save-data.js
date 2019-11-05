import store from '../../store'

export function saveDataHeader(){

  browser.webRequest.onBeforeSendHeaders.addListener(
    function(details) {

      if( store.getters.save_data ) {
        var headers = details.requestHeaders;
        // Check if browser or another extension has already enabled the header
        for (var index = 0; index < headers.length; ++index) {
          if ('name' in headers[index] &&
              headers[index].name.toLowerCase().indexOf('save-data') >= 0) {

            // Return the original headers
            return {
              requestHeaders: details.requestHeaders
        } } };

        // Append the actual header
        headers.push({
          'name': 'Save-Data',
          'value': 'on'
        });
      }

      return {
        requestHeaders: details.requestHeaders
      };
    }, {
      urls: ["<all_urls>"]
    }, [
      "blocking",
      "requestHeaders"
    ]
  );
  
}