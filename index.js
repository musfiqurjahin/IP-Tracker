// Created by @musfiqurjahin

function createStylishPopup() {
  // Main popup container
  const stylishPopup = document.createElement('div');
  stylishPopup.style.position = 'fixed';
  stylishPopup.style.top = '50%'; // Center vertically
  stylishPopup.style.left = '50%'; // Center horizontally
  stylishPopup.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale effect starts small
  stylishPopup.style.background = 'linear-gradient(145deg, #2c2c54, #474787)';
  stylishPopup.style.color = '#fff';
  stylishPopup.style.padding = '40px';
  stylishPopup.style.borderRadius = '15px';
  stylishPopup.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
  stylishPopup.style.textAlign = 'center';
  stylishPopup.style.zIndex = '9999';
  stylishPopup.style.maxWidth = '450px';
  stylishPopup.style.width = '90%'; // Responsive width
  stylishPopup.style.animation = 'scaleIn 0.6s ease-out forwards';

  // Close button setup
  const closeButton = document.createElement('button');
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'transparent';
  closeButton.style.color = '#ff4757';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '18px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.transition = 'color 0.3s ease';

  // Hover effect for close button
  closeButton.onmouseover = () => {
      closeButton.style.color = '#1dd1a1';
  };
  closeButton.onmouseout = () => {
      closeButton.style.color = '#ff4757';
  };

  // Close button icon
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fas fa-times'; // FontAwesome close icon
  closeButton.appendChild(closeIcon);
  closeButton.onclick = () => {
      document.body.removeChild(stylishPopup); // Remove popup when clicked
  };
  stylishPopup.appendChild(closeButton);

  // Header text
  const headerText = document.createElement('h2');
  headerText.textContent = 'Fetching Your IP Address';
  headerText.style.marginBottom = '20px';
  headerText.style.fontSize = '20px';
  headerText.style.fontWeight = 'bold';
  headerText.style.color = '#ffffff';
  headerText.style.textShadow = '0 0 10px #ffffff';
  stylishPopup.appendChild(headerText);

  // Message element for loading state
  const loadingText = document.createElement('div');
  loadingText.style.display = 'flex';
  loadingText.style.justifyContent = 'center';
  loadingText.style.alignItems = 'center';
  loadingText.style.marginBottom = '15px';

  // Loading spinner icon
  const loadingSpinner = document.createElement('i');
  loadingSpinner.className = 'fas fa-spinner fa-pulse'; // Spinning animation
  loadingSpinner.style.marginRight = '8px'; // Space between icon and text
  loadingSpinner.style.color = '#1dd1a1'; // Icon color
  loadingText.appendChild(loadingSpinner);

  // Loading text
  const loadingMsg = document.createTextNode('Please wait...');
  loadingText.appendChild(loadingMsg);
  stylishPopup.appendChild(loadingText);

  // Append the popup to the body
  document.body.appendChild(stylishPopup);

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
              ipText.style.color = '#1dd1a1';
              ipText.style.textShadow = '0 0 5px #1dd1a1';
              stylishPopup.appendChild(ipText);
          })
          .catch(error => {
              console.error("Error fetching IP address:", error);
              loadingText.textContent = 'Unable to fetch IP address'; // Handle error
          });
  }, 2000); // Delay for 2 seconds before fetching the IP

  // Auto-hide popup after 7 seconds
  setTimeout(() => {
      if (document.body.contains(stylishPopup)) {
          document.body.removeChild(stylishPopup);
      }
  }, 7000);
}

// Add CSS for animations and futuristic effects
const popupStyles = document.createElement('style');
popupStyles.innerHTML = `
  @keyframes scaleIn {
      from {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
      }
      to {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
      }
  }
`;
document.head.appendChild(popupStyles);

// Call the function to create the popup
createStylishPopup();
