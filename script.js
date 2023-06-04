const button = document.getElementById('menus');
button.addEventListener('click', function() {
  document.location.href = 'menu.html'; // Replace with the URL of the desired HTML page
});


function getMenu() {
    return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(menuItems => {
        const menuList = document.getElementById('menu');
        menuList.innerHTML = '';
        menuItems.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src="${item.imgSrc}" alt="${item.name}" width="200" height="200" style=" border-radius:40px;"></td>
          <td style="text-align:center; vertical-align: middle; font-size: xx-large;">${item.name}</td>
          <td style="text-align:center; vertical-align: middle; font-size: xx-large;"><span style="background: transparent;">$</span>${item.price}</td>
          `;
          menuList.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }

  function takeOrder(){
    return new Promise(resolve =>{
        setTimeout(() =>{
            resolve(getRandom())
        }, 2500);
    });
   }
  function getRandom(){
    const burgers = ['Cheeseburger', 'Paneerburger', 'Chickenburger'];
    const menuList = document.getElementById('menu');
    menuList.innerHTML = '';
    burgers.forEach(item => {
      const row = document.createElement('div');
      row.innerHTML = `    
      <span>Order Processing: </span>${item}
      `;
      menuList.appendChild(row);
    });
    return burgers;
  }

  function orderPrep(){
    return new Promise(resolve =>{
        const obj = { order_status: true, paid: false };
        setTimeout(()=>{
            resolve(getOrder(obj));
            document.getElementById('payment-button').style.display = 'block';
        }, 1500);
    });
  }

  function getOrder(obj){
    const getorder = document.getElementById("order_status");
    getorder.innerHTML = '';
    if(obj.order_status == true && obj.paid == false){
        const row = document.createElement('div');
        row.innerHTML = 'Order is placed !! Please Make Payment';
        getorder.appendChild(row);
    }
    else{
        const row = document.createElement('div');
        row.innerHTML = 'Payment is Done !! Thank You';
        getorder.appendChild(row);
    }
    return obj;
  }
  function payOrder() {
    return new Promise(resolve => {
     const obj = { order_status: true, paid: true };
      setTimeout(() => {
        resolve(getOrder(obj));
        thankyouFnc();
      }, 1000);
      document.getElementById('payment-button').style.display = 'none';
    });
  }

  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }

function clickme(){
    takeOrder()
    .then(orderPrep)
    .catch(error => console.error('Error:', error));
}