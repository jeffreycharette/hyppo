chrome.app.runtime.onLaunched.addListener(function() {
 var options = {
   'id': 'Test Kiosk App',
   'bounds': {
     'width': 1024,
     'height': 768
   }
 };
 chrome.app.window.create('application.html', (options));
});