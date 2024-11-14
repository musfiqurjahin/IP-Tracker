// Create and style the popup dynamically using JavaScript
function createPopup() {
    // Create the popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0'; // Display the popup at the top
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)'; // Center horizontally
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popup.style.color = 'red';
    popup.style.padding = '20px';
    popup.style.fontFamily = '"Arial", sans-serif';
    popup.style.fontSize = '16px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '9999';
    popup.style.width = '100%'; // Full width
  
    // Add the fade-in animation for the popup
    popup.style.animation = 'fadeIn 1s ease-out';
  
    // Create the message element for loading text
    const message = document.createElement('span');
    message.textContent = 'Obtaining IP...'; // Loading text
    message.style.opacity = '0';
    message.style.animation = 'fadeIn 2s forwards, blink 1s step-start 0s 3'; // Repeat animation 3 times
    popup.appendChild(message);
  
    // Create the logout icon button
    const logoutBtn = document.createElement('button');
    logoutBtn.style.position = 'absolute';
    logoutBtn.style.top = '12px';
    logoutBtn.style.alignContent='center';
    logoutBtn.style.alignItems='center';
    logoutBtn.style.right = '10px';
    logoutBtn.style.fontSize = '20px';
    logoutBtn.style.backgroundColor = 'transparent';
    logoutBtn.style.color = 'red';
    logoutBtn.style.border = 'none';
    logoutBtn.style.borderRadius='0'
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.style.padding = '5px';
  
    // Add FontAwesome Logout Icon (fa-sign-out-alt)
    const icon = document.createElement('i');
    icon.className = 'fas fa-sign-out-alt'; // FontAwesome logout icon
    logoutBtn.appendChild(icon);
  
    // Hover effect for logout button
    logoutBtn.onmouseover = () => {
      icon.style.color='green';
      icon.style.transform = 'scale(1.2)';
      icon.style.transition = 'transform 0.3s ease';
    };
    logoutBtn.onmouseout = () => {
      icon.style.transform = 'scale(1)';
      icon.style.color='red';
  
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
          // Replace loading text with the IP address and apply fade-in animation
          message.textContent = `IP: ${data.ip}`;
          message.style.opacity = '1'; // Ensure the IP text fades in smoothly
          message.style.animation = 'fadeIn 2s forwards'; // Apply fade-in effect to the IP address
        })
        .catch(error => {
          console.error("Error fetching IP address:", error);
          message.textContent = 'Failed to get IP address'; // Handle error
        });
    }, 3000); // Wait 3 seconds before showing the IP address
  }
  
  // Add CSS for fade-in animation and blinking effect (to be added to your style sheet or inline in a <style> tag)
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
  