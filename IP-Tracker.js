// Created by @musfiqurjahin

function createPopup() {
    //popup container:
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.color = 'red';
    popup.style.padding = '20px';
    popup.style.fontSize = '16px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '9999';
    popup.style.width = '90%'; // Adjusted for responsiveness
    popup.style.maxWidth = '500px'; // Limit width on larger screens
    popup.style.borderRadius = '8px'; // Rounded corners for a modern look
  
    //fade-in animation for the popup:
    popup.style.animation = 'fadeIn 1s ease-out';
  
    //message element for loader:
    const message = document.createElement('span');
    message.style.opacity = '0';
    message.style.animation = 'fadeIn 2s forwards';
  
    //loading icon:
    const loadingIcon = document.createElement('i');
    loadingIcon.className = 'fas fa-spinner fa-pulse';
    loadingIcon.style.marginRight = '8px';
    loadingIcon.style.color = 'red';
    message.appendChild(loadingIcon);
  
    //loading text:
    const loadingText = document.createTextNode('Obtaining IP...');
    message.appendChild(loadingText);
    popup.appendChild(message);
  
    //LogOut button:
    const logoutBtn = document.createElement('button');
    logoutBtn.style.position = 'absolute';
    logoutBtn.style.top = '12px';
    logoutBtn.style.right = '12px'; // Adjusted for better visibility
    logoutBtn.style.fontSize = '20px';
    logoutBtn.style.backgroundColor = 'transparent';
    logoutBtn.style.color = 'red';
    logoutBtn.style.border = 'none';
    logoutBtn.style.cursor = 'pointer';
  
    //ICON:
    const logoutIcon = document.createElement('i');
    logoutIcon.className = 'fas fa-sign-out-alt';
    logoutBtn.appendChild(logoutIcon);
  
    // Hover effect:
    logoutBtn.onmouseover = () => {
      logoutIcon.style.color = 'green';
      logoutIcon.style.transform = 'scale(1.2)';
      logoutIcon.style.transition = 'transform 0.3s ease';
    };
    logoutBtn.onmouseout = () => {
      logoutIcon.style.transform = 'scale(1)';
      logoutIcon.style.color = 'red';
    };
  
    // Logout button action
    logoutBtn.onclick = () => {
      document.body.removeChild(popup); // Remove popup when clicked
    };
    popup.appendChild(logoutBtn);
  
    // Append the popup to the body
    document.body.appendChild(popup);
  
    // Fetch IP address and update the message after the animation
    setTimeout(() => {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          // Clear initial loading icon and text
          message.textContent = ''; // Clear the "Obtaining IP..." text
  
          // Add icon and IP address text
          const ipIcon = document.createElement('i');
          ipIcon.className = 'fas fa-map-marker-alt';
          ipIcon.style.marginRight = '8px';
          ipIcon.style.color = 'red';
          message.appendChild(ipIcon);
  
          //IP address text
          message.appendChild(document.createTextNode(`${data.ip}`));
          message.style.opacity = '1'; // Ensure the IP text fades in smoothly
          message.style.animation = 'fadeIn 2s forwards';
        })
        .catch(error => {
          console.error("Error fetching IP address:", error);
          message.textContent = 'Failed to get IP address'; // Handle error
        });
    }, 3000); // Delay for 3 seconds before showing the IP
  }
  
  // Add CSS for fade-in animation and blinking effect
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Call the function to create the popup
  createPopup();
  