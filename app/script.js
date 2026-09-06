/**
 * ==========================================================================
 * PulseCare - Blood Bank and Organ Donation Coordination Platform
 * Client-side Controller & Interactive Healthcare Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('PulseCare Platform initialized successfully.');

    // ----------------------------------------------------------------------
    // 1. TOAST NOTIFICATION SYSTEM
    // ----------------------------------------------------------------------
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success', duration = 4000) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'emergency' ? '🚨' : type === 'info' ? 'ℹ️' : '✅';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-msg">${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ----------------------------------------------------------------------
    // 2. MOBILE NAVIGATION & HAMBURGER TOGGLE
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. SMOOTH SCROLLING WITH OFFSET FOR STICKY HEADER
    // ----------------------------------------------------------------------
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();

                // Update active state
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                const activeNav = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (activeNav) activeNav.classList.add('active');

                // Header offset (approx 75px)
                const headerOffset = 75;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. MODAL MANAGEMENT (DONOR, ORGAN, TRANSFER)
    // ----------------------------------------------------------------------
    const donorModal = document.getElementById('donorModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const navRegisterBtn = document.getElementById('navRegisterBtn');
    const organModal = document.getElementById('organModal');
    const organModalCloseBtn = document.getElementById('organModalCloseBtn');
    const organPledgeModalBtn = document.getElementById('organPledgeModalBtn');
    const transferModal = document.getElementById('transferModal');
    const transferModalCloseBtn = document.getElementById('transferModalCloseBtn');

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    if (navRegisterBtn) {
        navRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const donorSection = document.getElementById('donor-registration');
            if (donorSection) {
                donorSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                openModal(donorModal);
            }
        });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => closeModal(donorModal));
    if (organModalCloseBtn) organModalCloseBtn.addEventListener('click', () => closeModal(organModal));
    if (transferModalCloseBtn) transferModalCloseBtn.addEventListener('click', () => closeModal(transferModal));

    if (organPledgeModalBtn) {
        organPledgeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(organModal);
        });
    }

    // Close on outside overlay click
    window.addEventListener('click', (e) => {
        if (e.target === donorModal) closeModal(donorModal);
        if (e.target === organModal) closeModal(organModal);
        if (e.target === transferModal) closeModal(transferModal);
    });

    // ----------------------------------------------------------------------
    // 5. LIVE BLOOD INVENTORY FILTERING & SEARCH
    // ----------------------------------------------------------------------
    const bloodPills = document.querySelectorAll('.blood-filter-btn');
    const hospitalSearchInput = document.getElementById('hospitalSearchInput');
    const cityFilterSelect = document.getElementById('cityFilterSelect');
    const statusFilterSelect = document.getElementById('statusFilterSelect');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const inventoryCards = document.querySelectorAll('.inventory-card');
    const resultsCountEl = document.getElementById('resultsCount');

    let currentBloodFilter = 'ALL';

    function filterInventory() {
        const searchKeyword = hospitalSearchInput ? hospitalSearchInput.value.toLowerCase().trim() : '';
        const selectedCity = cityFilterSelect ? cityFilterSelect.value.toLowerCase() : 'all';
        const selectedStatus = statusFilterSelect ? statusFilterSelect.value.toLowerCase() : 'all';

        let visibleCount = 0;

        inventoryCards.forEach(card => {
            const cardBlood = (card.getAttribute('data-blood') || '').toUpperCase();
            const cardHospital = (card.getAttribute('data-hospital') || '').toLowerCase();
            const cardCity = (card.getAttribute('data-city') || '').toLowerCase();
            const cardStatus = (card.getAttribute('data-status') || '').toLowerCase();
            const cardText = card.innerText.toLowerCase();

            const matchesBlood = (currentBloodFilter === 'ALL' || cardBlood === currentBloodFilter);
            const matchesSearch = searchKeyword === '' || cardHospital.includes(searchKeyword) || cardText.includes(searchKeyword);
            const matchesCity = (selectedCity === 'all' || cardCity === selectedCity || cardText.includes(selectedCity));
            const matchesStatus = (selectedStatus === 'all' || cardStatus === selectedStatus);

            if (matchesBlood && matchesSearch && matchesCity && matchesStatus) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (resultsCountEl) {
            resultsCountEl.innerText = visibleCount;
        }
    }

    // Blood Filter Pills Click
    bloodPills.forEach(pill => {
        pill.addEventListener('click', function () {
            bloodPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentBloodFilter = this.getAttribute('data-blood').toUpperCase();
            filterInventory();
        });
    });

    if (hospitalSearchInput) hospitalSearchInput.addEventListener('input', filterInventory);
    if (cityFilterSelect) cityFilterSelect.addEventListener('change', filterInventory);
    if (statusFilterSelect) statusFilterSelect.addEventListener('change', filterInventory);

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (hospitalSearchInput) hospitalSearchInput.value = '';
            if (cityFilterSelect) cityFilterSelect.value = 'all';
            if (statusFilterSelect) statusFilterSelect.value = 'all';
            bloodPills.forEach(p => p.classList.remove('active'));
            const allBtn = document.querySelector('.blood-filter-btn[data-blood="all"]');
            if (allBtn) allBtn.classList.add('active');
            currentBloodFilter = 'ALL';
            filterInventory();
            showToast('Inventory filters reset to default.', 'info');
        });
    }

    // ----------------------------------------------------------------------
    // 6. REQUEST TRANSFER BUTTON ACTION
    // ----------------------------------------------------------------------
    function setupTransferButtons() {
        const requestBtns = document.querySelectorAll('.request-btn');
        const transferFacility = document.getElementById('transferFacility');
        const transferModalSub = document.getElementById('transferModalSub');

        requestBtns.forEach(btn => {
            btn.onclick = function () {
                const card = this.closest('.inventory-card');
                const hospital = card.getAttribute('data-hospital') || 'Partner Hospital';
                const blood = card.getAttribute('data-blood') || 'Blood Unit';

                if (transferFacility) {
                    transferFacility.value = `${hospital} — Blood Group [${blood}]`;
                }
                if (transferModalSub) {
                    transferModalSub.innerText = `Requesting transfer of ${blood} units from ${hospital}`;
                }
                openModal(transferModal);
            };
        });
    }
    setupTransferButtons();

    // Handle Transfer Form Submission
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        transferForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const destination = document.getElementById('transferDestination').value;
            const units = document.getElementById('transferUnits').value;
            const facility = document.getElementById('transferFacility').value;

            closeModal(transferModal);
            showToast(`Transfer Alert Queued!\n${units} Units requested for ${destination} from ${facility}.`, 'emergency');
            transferForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 7. DONOR REGISTRATION HANDLING (LOCALSTORAGE PERSISTENCE)
    // ----------------------------------------------------------------------
    const donorForm = document.getElementById('donorRegistrationForm');
    const donorSuccessBanner = document.getElementById('donorSuccessBanner');
    const donorIdDisplay = document.getElementById('donorIdDisplay');
    const donorSuccessText = document.getElementById('donorSuccessText');

    // Dashboard elements to update
    const cardDonorName = document.getElementById('cardDonorName');
    const cardBloodGroup = document.getElementById('cardBloodGroup');
    const cardDonorId = document.getElementById('cardDonorId');
    const cardOrganStatus = document.getElementById('cardOrganStatus');
    const dashBlood = document.getElementById('dashBlood');
    const dashLastDonation = document.getElementById('dashLastDonation');
    const dashCity = document.getElementById('dashCity');

    function updateDonorDashboard(donorData) {
        if (cardDonorName) cardDonorName.innerText = donorData.name;
        if (cardBloodGroup) cardBloodGroup.innerText = donorData.blood;
        if (cardDonorId) cardDonorId.innerText = donorData.donorId;
        if (dashBlood) dashBlood.innerText = `${donorData.blood} (Verified)`;
        if (dashLastDonation) dashLastDonation.innerText = donorData.lastDonation || 'First Time Donor';
        if (dashCity) dashCity.innerText = donorData.city;

        if (cardOrganStatus) {
            if (donorData.organPledged) {
                cardOrganStatus.innerText = '🫀 Organ Donor Opted';
                cardOrganStatus.style.display = 'inline-block';
            } else {
                cardOrganStatus.style.display = 'none';
            }
        }
    }

    // Load saved donor if available
    try {
        const savedDonor = localStorage.getItem('pulsecare_donor');
        if (savedDonor) {
            const parsed = JSON.parse(savedDonor);
            updateDonorDashboard(parsed);
        }
    } catch (err) {
        console.log('No previous localStorage donor data.');
    }

    if (donorForm) {
        donorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('donorName').value.trim();
            const age = parseInt(document.getElementById('donorAge').value, 10);
            const blood = document.getElementById('donorBlood').value;
            const phone = document.getElementById('donorPhone').value.trim();
            const email = document.getElementById('donorEmail').value.trim();
            const city = document.getElementById('donorCity').value.trim();
            const lastDonation = document.getElementById('donorLastDonation').value;
            const organPledge = document.getElementById('donorOrganPledge').checked;

            // Basic Validation
            if (age < 18 || age > 65) {
                alert('Donors must be between 18 and 65 years of age.');
                return;
            }

            if (!blood) {
                alert('Please select a valid blood group.');
                return;
            }

            // Generate unique donor ID
            const randomCode = Math.floor(10000 + Math.random() * 90000);
            const donorId = `PULSE-D${randomCode}`;

            const donorData = {
                name,
                age,
                blood,
                phone,
                email,
                city,
                lastDonation: lastDonation ? new Date(lastDonation).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'First Time Donor',
                organPledged: organPledge,
                donorId,
                registeredAt: new Date().toISOString()
            };

            // Save to localStorage for demo persistence
            try {
                localStorage.setItem('pulsecare_donor', JSON.stringify(donorData));
            } catch (err) {
                console.warn('LocalStorage unavailable.');
            }

            // Update Success Banner
            if (donorIdDisplay) donorIdDisplay.innerText = donorId;
            if (donorSuccessText) {
                donorSuccessText.innerText = `Thank you ${name}. Your registration for Blood Group (${blood}) is verified. Welcome to PulseCare!`;
            }
            if (donorSuccessBanner) {
                donorSuccessBanner.classList.add('active');
                donorSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Update Dashboard
            updateDonorDashboard(donorData);

            // Toast Alert
            showToast(`Donor registration successful! Donor ID: ${donorId}`, 'success');

            donorForm.reset();
        });
    }

    // Modal Donor Form
    const modalDonorForm = document.getElementById('modalDonorForm');
    if (modalDonorForm) {
        modalDonorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modalDonorName').value.trim();
            const blood = document.getElementById('modalDonorBlood').value;
            const organPledged = document.getElementById('modalOrganPledge').checked;

            const randomCode = Math.floor(10000 + Math.random() * 90000);
            const donorId = `PULSE-D${randomCode}`;

            const donorData = {
                name,
                blood,
                city: 'Chennai',
                lastDonation: 'First Time Donor',
                organPledged,
                donorId
            };

            try {
                localStorage.setItem('pulsecare_donor', JSON.stringify(donorData));
            } catch (err) {}

            updateDonorDashboard(donorData);
            closeModal(donorModal);
            showToast(`Donor registration successful! Generated ID: ${donorId}`, 'success');
            modalDonorForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 8. PATIENT BLOOD REQUEST HANDLING
    // ----------------------------------------------------------------------
    const patientForm = document.getElementById('patientRequestForm');
    const patientSuccessBanner = document.getElementById('patientSuccessBanner');
    const requestIdDisplay = document.getElementById('requestIdDisplay');
    const patientSuccessText = document.getElementById('patientSuccessText');
    const requestsTableBody = document.getElementById('requestsTableBody');
    const emergencyFeed = document.getElementById('emergencyFeed');

    if (patientForm) {
        patientForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('patientName').value.trim();
            const blood = document.getElementById('patientBlood').value;
            const units = document.getElementById('patientUnits').value;
            const hospital = document.getElementById('patientHospital').value.trim();
            const location = document.getElementById('patientLocation').value.trim();
            const condition = document.getElementById('patientCondition').value.trim();
            const isUrgent = document.getElementById('patientUrgent').checked;

            const randomReqCode = Math.floor(1000 + Math.random() * 9000);
            const reqId = `REQ-2026-${randomReqCode}`;
            const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

            if (requestIdDisplay) requestIdDisplay.innerText = reqId;
            if (patientSuccessText) {
                patientSuccessText.innerText = `Request of ${units} Units [${blood}] for ${name} at ${hospital} has been dispatched with priority: ${isUrgent ? 'URGENT' : 'STANDARD'}.`;
            }
            if (patientSuccessBanner) {
                patientSuccessBanner.classList.add('active');
                patientSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Append to table
            if (requestsTableBody) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><code>${reqId}</code></td>
                    <td><strong>${name}</strong></td>
                    <td><span class="blood-pill-sm">${blood}</span></td>
                    <td>${units} Units</td>
                    <td>${hospital}, ${location}</td>
                    <td><span class="status-pill ${isUrgent ? 'status-urgent' : 'status-available'}">${isUrgent ? 'URGENT' : 'Standard'}</span></td>
                    <td><span class="status-pill status-searching">Searching Donors</span></td>
                    <td>${todayStr}</td>
                `;
                requestsTableBody.insertBefore(tr, requestsTableBody.firstChild);
            }

            // If urgent, prepend to emergency feed
            if (isUrgent && emergencyFeed) {
                const card = document.createElement('div');
                card.className = 'emergency-card-item';
                card.innerHTML = `
                    <div class="emergency-group-badge">${blood}</div>
                    <div class="emergency-req-info">
                        <h4>${hospital} &bull; ${condition}</h4>
                        <p>Patient: ${name} &bull; ${units} Units Needed Urgently &bull; Contact: Hospital Desk</p>
                    </div>
                    <span class="status-pill status-urgent">URGENT</span>
                `;
                emergencyFeed.insertBefore(card, emergencyFeed.firstChild);
            }

            showToast(`Blood request submitted successfully (${reqId})`, isUrgent ? 'emergency' : 'success');
            patientForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 9. EMERGENCY BUTTON ACTION
    // ----------------------------------------------------------------------
    const createEmergencyBtn = document.getElementById('createEmergencyBtn');
    if (createEmergencyBtn) {
        createEmergencyBtn.addEventListener('click', () => {
            const patientSection = document.getElementById('patient-request');
            const urgentCheckbox = document.getElementById('patientUrgent');
            if (patientSection) {
                patientSection.scrollIntoView({ behavior: 'smooth' });
                if (urgentCheckbox) urgentCheckbox.checked = true;
                showToast('Emergency request mode enabled in form.', 'emergency');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 10. ORGAN DONATION PLEDGE SUBMISSION
    // ----------------------------------------------------------------------
    const organPledgeForm = document.getElementById('organPledgeForm');
    if (organPledgeForm) {
        organPledgeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const organDonorName = document.getElementById('organDonorName').value.trim();
            const organBlood = document.getElementById('organDonorBlood').value;

            closeModal(organModal);
            if (cardOrganStatus) {
                cardOrganStatus.innerText = '🫀 Organ Donor Opted';
                cardOrganStatus.style.display = 'inline-block';
            }

            showToast(`Thank you, ${organDonorName}! Your Organ Donation Pledge is registered.`, 'success');
            organPledgeForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 11. DASHBOARD TAB SWITCHER
    // ----------------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.dash-tab-btn');
    const tabContents = document.querySelectorAll('.dash-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            const contentEl = document.getElementById(targetTab);
            if (contentEl) contentEl.classList.add('active');
        });
    });

    // ----------------------------------------------------------------------
    // 12. CONTACT FORM SUBMISSION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            showToast(`Thank you, ${name}! Your message has been received. Our team will respond shortly.`, 'success');
            contactForm.reset();
        });
    }
});
