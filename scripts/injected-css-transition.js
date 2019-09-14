console.log('transform none')

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '* { transition: none!important; }';
document.getElementsByTagName('head')[0].appendChild(style);