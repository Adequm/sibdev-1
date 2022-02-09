import './styles/index.scss';


window.switchMenu = function() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.toggle('sidebar-open')
};


document.addEventListener('scroll', () => {
  const scroll = document.getElementsByTagName('html')[0].scrollTop;
  const body = document.getElementsByTagName('body')[0];
  if(scroll) {
    body.classList.add('scroll')
  } else {
    body.classList.remove('scroll')
  }
})