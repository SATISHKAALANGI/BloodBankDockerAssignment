/**
 * ==========================================================================
 * Blood Bank and Organ Donation Coordination Platform
 * College Git and Docker Assignment - Client Script
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('PulseCare Platform initialized successfully.');

    // ----------------------------------------------------------------------
    // 1. REGISTER AS DONOR - POPUP ALERT & MODAL TOGGLE
    // ----------------------------------------------------------------------
    const heroRegisterBtn = document.getElementById('heroRegisterBtn');
    const navRegisterBtn = document.getElementById('navRegisterBtn');
    const registerTriggers = document.querySelectorAll('.register-trigger');
    const donorModal = document.getElementById('donorModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const donorForm = document.getElementById('donorForm');

    /**
     * Function to trigger the registration action
     * Shows a popup alert as requested by the assignment specification,
     * then opens the detailed registration modal interface.
     */
    function handleRegisterClick(e) {
        if (e) e.preventDefault();

        // 1. Required alert notification for assignment demonstration
        alert('Welcome to PulseCare Donor Portal!\n\nThank you for choosing to register as a donor. Opening registration form...');

        // 2. Open interactive modal overlay
        if (donorModal) {
            donorModal.classList.add('active');
        }
    }

    // Attach event listener to Hero "Register as Donor" button
    if (heroRegisterBtn) {
        heroRegisterBtn.addEventListener('click', handleRegisterClick);
    }

    // Attach event listener to Navbar "Register Donor" button
    if (navRegisterBtn) {
        navRegisterBtn.addEventListener('click', handleRegisterClick);
    }

    // Attach to feature card register link
    registerTriggers.forEach(trigger => {
        trigger.addEventListener('click', handleRegisterClick);
    });

    // Close Modal handler
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            donorModal.classList.remove('active');
        });
    }

    // Close Modal when clicking outside the card
    window.addEventListener('click', (e) => {
        if (e.target === donorModal) {
            donorModal.classList.remove('active');
        }
    });

    // Form Submission Handler
    if (donorForm) {
        donorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('donorFullName').value;
            const bloodGroup = document.getElementById('donorBloodGroup').value;

            alert(`Registration Successful!\n\nThank you ${name}. Your registration for Blood Group (${bloodGroup}) has been recorded into the PulseCare system.`);
            
            donorForm.reset();
            donorModal.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------
    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ----------------------------------------------------------------------
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip default if it's just '#'
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                
                // Update active state on nav links
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. LIVE BLOOD AVAILABILITY INVENTORY FILTERING
    // ----------------------------------------------------------------------
    const bloodTypeSelect = document.getElementById('bloodTypeSelect');
    const hospitalSearchInput = document.getElementById('hospitalSearchInput');
    const inventoryCards = document.querySelectorAll('.inventory-card');

    function filterInventory() {
        const selectedBlood = bloodTypeSelect ? bloodTypeSelect.value.toUpperCase() : 'ALL';
        const searchKeyword = hospitalSearchInput ? hospitalSearchInput.value.toLowerCase().trim() : '';

        inventoryCards.forEach(card => {
            const cardBlood = card.getAttribute('data-blood').toUpperCase();
            const cardHospital = card.getAttribute('data-hospital').toLowerCase();

            const matchesBlood = (selectedBlood === 'ALL' || selectedBlood === 'ALL GROUPS (A+, A-, B+, B-, O+, O-, AB+, AB-)' || cardBlood === selectedBlood);
            const matchesSearch = searchKeyword === '' || cardHospital.includes(searchKeyword);

            if (matchesBlood && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (bloodTypeSelect) {
        bloodTypeSelect.addEventListener('change', filterInventory);
    }

    if (hospitalSearchInput) {
        hospitalSearchInput.addEventListener('input', filterInventory);
    }

    // Transfer Request Button Click Action
    const requestBtns = document.querySelectorAll('.request-btn');
    requestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.inventory-card');
            const hospital = card.getAttribute('data-hospital');
            const blood = card.getAttribute('data-blood');

            alert(`Transfer Request Initiated:\n\nHospital: ${hospital}\nBlood Group: ${blood}\nStatus: Dispatch alert queued for medical verification.`);
        });
    });
});
