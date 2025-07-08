function updateForm() {
    const tripType = document.getElementById('tripType').value;
    const submitBtn = document.getElementById('submitBtn');
    
    // Hide all forms first
    document.getElementById('airportToCityForm').style.display = 'none';
    document.getElementById('cityToAirportForm').style.display = 'none';
    document.getElementById('europeTripForm').style.display = 'none';
    
    // Show the selected form
    if (tripType) {
        document.getElementById(tripType + 'Form').style.display = 'block';
        submitBtn.style.display = 'block';
    } else {
        submitBtn.style.display = 'none';
    }
}

// Initialize datepickers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all datepickers
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    // Initialize all timepickers
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 15,
        minTime: '00:00',
        maxTime: '23:59',
        defaultTime: '09:00',
        startTime: '00:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    // Add tooltips to vehicle options
    const vehicleSelects = document.querySelectorAll('select');
    vehicleSelects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            if (option.value) {
                const infoIcon = option.querySelector('.info-icon');
                if (infoIcon) {
                    infoIcon.addEventListener('mouseover', function(e) {
                        const tooltip = this.querySelector('.tooltip-text');
                        tooltip.style.visibility = 'visible';
                        tooltip.style.opacity = '1';
                    });
                    
                    infoIcon.addEventListener('mouseout', function(e) {
                        const tooltip = this.querySelector('.tooltip-text');
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.opacity = '0';
                    });
                }
            }
        });
    });

    // Handle vehicle selection
    const vehicleOptions = document.querySelectorAll('.vehicle-option');
    vehicleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            vehicleOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    // Handle time selection
    const timeSelects = document.querySelectorAll('.time-select');
    timeSelects.forEach(select => {
        select.addEventListener('change', function() {
            const icon = this.parentElement.querySelector('.icon');
            if (this.value) {
                icon.style.color = '#43A421';
            } else {
                icon.style.color = '#666';
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('input[required], select[required]');
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Vehicle validation
            const selectedVehicle = form.querySelector('input[name="vehicle"]:checked');
            if (!selectedVehicle) {
                isValid = false;
                const vehicleSelect = form.querySelector('.vehicle-select');
                vehicleSelect.classList.add('is-invalid');
            }

            if (isValid) {
                // Here you would typically submit the form
                console.log('Form is valid, ready to submit');
                // form.submit();
            }
        });
    });
}); 