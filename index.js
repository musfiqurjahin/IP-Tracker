// Created by @musfiqurjahin

function generatePopupAlert() {
  // Main popup container
  const notificationBox = document.createElement('div');
  notificationBox.style.position = 'fixed';
  notificationBox.style.top = '0'; // Display the popup at the top
  notificationBox.style.left = '50%';
  notificationBox.style.transform = 'translateX(-50%)'; // Center horizontally
  notificationBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  notificationBox.style.color = 'red';
  notificationBox.style.padding = '20px';
  notificationBox.style.fontSize = '16px';
  notificationBox.style.textAlign = 'center';
  notificationBox.style.zIndex = '9999';
  notificationBox.style.width = '100%';

  // Fade-in animation for the popup
  notificationBox.style.animation = 'popupFadeIn 1s ease-out';

  // Message element for loading state
  const statusText = document.createElement('span');
  statusText.style.opacity = '0';
  statusText.style.animation = 'textFadeIn 2s forwards'; // Apply only fade-in animation

  // Loading spinner icon
  const spinnerIcon = document.createElement('i');
  spinnerIcon.className = 'fas fa-spinner fa-pulse'; // Spinning animation
  spinnerIcon.style.marginRight = '8px'; // Space between icon and text
  spinnerIcon.style.color = 'red'; // Icon color
  statusText.appendChild(spinnerIcon);

  // Loading text
  const loadingMsg = document.createTextNode('Retrieving IP...');
  statusText.appendChild(loadingMsg);
  notificationBox.appendChild(statusText);

  // Logout button setup
  const exitButton = document.createElement('button');
  exitButton.style.position = 'absolute';
  exitButton.style.top = '12px';
  exitButton.style.right = '10px';
  exitButton.style.fontSize = '20px';
  exitButton.style.backgroundColor = 'transparent';
  exitButton.style.color = 'red';
  exitButton.style.border = 'none';
  exitButton.style.cursor = 'pointer';
  exitButton.style.padding = '5px';

  // Logout icon inside button
  const exitIcon = document.createElement('i');
  exitIcon.className = 'fas fa-sign-out-alt'; // FontAwesome logout icon
  exitButton.appendChild(exitIcon);

  // Hover effect for logout button
  exitButton.onmouseover = () => {
      exitIcon.style.color = 'green';
      exitIcon.style.transform = 'scale(1.2)';
      exitIcon.style.transition = 'transform 0.3s ease';
  };
  exitButton.onmouseout = () => {
      exitIcon.style.transform = 'scale(1)';
      exitIcon.style.color = 'red';
  };

  // Logout button click action
  exitButton.onclick = () => {
      document.body.removeChild(notificationBox); // Remove popup when clicked
  };
  notificationBox.appendChild(exitButton);

  // Append the popup to the body
  document.body.appendChild(notificationBox);

  // Fetch IP address and update the message
  setTimeout(() => {
      fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
              // Clear initial loading icon and text
              statusText.textContent = ''; // Clear the "Retrieving IP..." text

              // Add icon and IP address text
              const ipIcon = document.createElement('i');
              ipIcon.className = 'fas fa-map-marker-alt'; // Icon for IP display
              ipIcon.style.marginRight = '8px'; // Space between icon and IP text
              ipIcon.style.color = 'red'; // Color for IP icon
              statusText.appendChild(ipIcon);

              // IP address text
              statusText.appendChild(document.createTextNode(`${data.ip}`)); // IP: ${data.ip}
              statusText.style.opacity = '1'; // Ensure the IP text fades in smoothly
              statusText.style.animation = 'textFadeIn 2s forwards';
          })
          .catch(error => {
              console.error("Error fetching IP address:", error);
              statusText.textContent = 'Unable to fetch IP address'; // Handle error
          });
  }, 3000); // Delay for 3 seconds before showing the IP
}

// Add CSS for fade-in animation and other effects
const customStyles = document.createElement('style');
customStyles.innerHTML = `
  @keyframes popupFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
  }
  @keyframes textFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
  }
  @keyframes textBlink {
      50% { opacity: 0; }
  }
`;
document.head.appendChild(customStyles);

// Call the function to create the popup
generatePopupAlert();
