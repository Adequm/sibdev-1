import './styles/index.scss';


window.switchMenu = function() {
  // document.getElementById('sidebar').classList.toggle('open');
  // document.getElementById('content').classList.toggle('open');
  document.getElementsByTagName('body')[0].classList.toggle('sidebar-open');
};

let abc = 312
console.log(window)