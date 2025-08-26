   let activeButton = null;
        
        function toggleCountryOptions(buttonId) {
            const button = document.getElementById(buttonId);
            const allButtons = document.querySelectorAll('.contact-main-btn');
            
            // If clicking the same button that's already active, deactivate it
            if (activeButton === buttonId) {
                button.classList.remove('active');
                activeButton = null;
            } else {
                // Deactivate all other buttons first
                allButtons.forEach(btn => btn.classList.remove('active'));
                
                // Activate the clicked button
                button.classList.add('active');
                activeButton = buttonId;
            }
        }
        
        // Close options when clicking outside
        document.addEventListener('click', function(event) {
            const contactWidget = document.querySelector('.floating-contact-widget');
            
            // Check if the click is outside the contact widget
            if (!contactWidget.contains(event.target)) {
                // Close all active buttons
                document.querySelectorAll('.contact-main-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                activeButton = null;
            }
        });
        
        // Prevent event bubbling on country button clicks
        document.querySelectorAll('.country-btn').forEach(btn => {
            btn.addEventListener('click', function(event) {
                // Don't close the options when clicking a country button
                event.stopPropagation();
            });
        });