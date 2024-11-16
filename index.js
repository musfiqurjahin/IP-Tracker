(function () {
    document.addEventListener('DOMContentLoaded', function () {
      function createPopup() {
        //Popup container:
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popup.style.color = 'red';
        popup.style.padding = '20px';
        popup.style.fontSize = '16px';
        popup.style.textAlign = 'center';
        popup.style.zIndex = '9999';
        popup.style.width = '100%';
        popup.style.animation = 'fadeIn 1s ease-out';
  
        //message element for loader:
        const message = document.createElement('span');
        message.style.opacity = '0';
        message.style.animation = 'fadeIn 2s forwards';
  
        //Loading icon:
        const loadingIcon = document.createElement('i');
        loadingIcon.className = 'fas fa-spinner fa-pulse';
        loadingIcon.style.marginRight = '8px';
        loadingIcon.style.color = 'red';
        message.appendChild(loadingIcon);
  
        //Loading text:
        const loadingText = document.createTextNode('Obtaining IP!');
        message.appendChild(loadingText);
        popup.appendChild(message);
  
        //Logout button:
        const logoutBtn = document.createElement('button');
        logoutBtn.style.position = 'absolute';
        logoutBtn.style.top = '12px';
        logoutBtn.style.right = '10px';
        logoutBtn.style.fontSize = '20px';
        logoutBtn.style.backgroundColor = 'transparent';
        logoutBtn.style.color = 'red';
        logoutBtn.style.border = 'none';
        logoutBtn.style.cursor = 'pointer';
  
        //logout icon:
        const logoutIcon = document.createElement('i');
        logoutIcon.className = 'fas fa-sign-out-alt';
        logoutBtn.appendChild(logoutIcon);
  
        //hover effects for the logout button:
        logoutBtn.onmouseover = function () {
          logoutIcon.style.color = 'green';
          logoutIcon.style.transform = 'scale(1.2)';
          logoutIcon.style.transition = 'transform 0.3s ease';
        };
        logoutBtn.onmouseout = function () {
          logoutIcon.style.transform = 'scale(1)';
          logoutIcon.style.color = 'red';
        };
  
        // Remove popup on logout button click:
        logoutBtn.onclick = function () {
          document.body.removeChild(popup);
        };
        popup.appendChild(logoutBtn);
  
        // Append the popup to the body:
        document.body.appendChild(popup);
  
        // Fetch IP address:
        setTimeout(function () {
          fetch('https://api.ipify.org?format=json')
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              message.textContent = '';
              const ipIcon = document.createElement('i');
              ipIcon.className = 'fas fa-map-marker-alt';
              ipIcon.style.marginRight = '8px';
              ipIcon.style.color = 'red';
              message.appendChild(ipIcon);
              message.appendChild(document.createTextNode(`${data.ip}`));
              message.style.opacity = '1';
            })
            .catch(function (error) {
              console.error('Error fetching IP address:', error);
              message.textContent = 'Failed to get IP address';
            });
        }, 3000); //3 sec Delay
      }
  
      //CSS for animations:
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      createPopup();
    });
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    fontAwesomeLink.rel = 'stylesheet';
    document.head.appendChild(fontAwesomeLink);
  })();  