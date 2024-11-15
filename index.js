// Created by @musfiqurjahin

function createAnimatedPopup() {
  // Main popup container
  const animatedPopup = document.createElement('div');
  animatedPopup.style.position = 'fixed';
  animatedPopup.style.top = '50%'; // Center vertically
  animatedPopup.style.left = '50%'; // Center horizontally
  animatedPopup.style.transform = 'translate(-50%, -50%)'; // Perfect centering
  animatedPopup.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
  animatedPopup.style.color = '#3bfc00';
  animatedPopup.style.padding = '30px 40px';
  animatedPopup.style.borderRadius = '12px';
  animatedPopup.style.boxShadow = '0 8px 30px rgba(0, 255, 0, 0.5)';
  animatedPopup.style.textAlign = 'center';
  animatedPopup.style.zIndex = '9999';
  animatedPopup.style.maxWidth = '400px';
  animatedPopup.style.width = '90%';
  animatedPopup.style.animation = 'slideIn 0.8s ease-out';

  // Close button setup
  const closeButton = document.createElement('button');
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'transparent';
  closeButton.style.color = '#3bfc00';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.transition = 'color 0.3s ease';

  // Hover effect for close button
  closeButton.onmouseover = () => {
      closeButton.style.color = '#ff0033';
  };
  closeButton.onmouseout = () => {
      closeButton.style.color = '#3bfc00';
  };

  // Close button icon
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fas fa-times'; // FontAwesome close icon
  closeButton.appendChild(closeIcon);
  closeButton.onclick = () => {
      document.body.removeChild(animatedPopup); // Remove popup when clicked
  };
  animatedPopup.appendChild(closeButton);

  // Header text
  const headerText = document.createElement('h2');
  headerText.textContent = 'Fetching Your IP Address';
  headerText.style.marginBottom = '15px';
  headerText.style.fontSize = '18px';
  headerText.style.fontWeight = 'bold';
  headerText.style.color = '#3bfc00';
  headerText.style.textShadow = '0 0 10px #3bfc00';
  animatedPopup.appendChild(headerText);

  // Message element for loading state
  const loadingText = document.createElement('div');
  loadingText.style.display = 'flex';
  loadingText.style.justifyContent = 'center';
  loadingText.style.alignItems = 'center';
  loadingText.style.marginBottom = '10px';

  // Loading spinner icon
  const loadingSpinner = document.createElement('i');
  loadingSpinner.className = 'fas fa-spinner fa-pulse'; // Spinning animation
  loadingSpinner.style.marginRight = '8px'; // Space between icon and text
  loadingSpinner.style.color = '#3bfc00'; // Icon color
  loadingText.appendChild(loadingSpinner);

  // Loading text
  const loadingMsg = document.createTextNode('Please wait...');
  loadingText.appendChild(loadingMsg);
  animatedPopup.appendChild(loadingText);

  // Append the popup to the body
  document.body.appendChild(animatedPopup);

  // Fetch IP address and update the message
  setTimeout(() => {
      fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
              // Clear initial loading text
              loadingText.textContent = ''; // Clear the "Please wait..." text

              // Display IP address
              const ipText = document.createElement('p');
              ipText.textContent = `Your IP Address: ${data.ip}`;
              ipText.style.fontSize = '16px';
              ipText.style.color = '#3bfc00';
              ipText.style.textShadow = '0 0 5px #3bfc00';
              animatedPopup.appendChild(ipText);
          })
          .catch(error => {
              console.error("Error fetching IP address:", error);
              loadingText.textContent = 'Unable to fetch IP address'; // Handle error
          });
  }, 2000); // Delay for 2 seconds before fetching the IP

  // Auto-hide popup after 7 seconds
  setTimeout(() => {
      if (document.body.contains(animatedPopup)) {
          document.body.removeChild(animatedPopup);
      }
  }, 7000);
}

// Add CSS for animations and futuristic effects
const popupStyles = document.createElement('style');
popupStyles.innerHTML = `
  @keyframes slideIn {
      from {
          opacity: 0;
          transform: translate(-50%, -70%);
      }
      to {
          opacity: 1;
          transform: translate(-50%, -50%);
      }
  }
`;
document.head.appendChild(popupStyles);

// Call the function to create the popup
createAnimatedPopup();
