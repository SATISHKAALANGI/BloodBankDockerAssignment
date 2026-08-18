# Blood Bank and Organ Donation Coordination Platform

> **College Software Engineering & DevOps Lab Assignment**  
> *Topic: Git Version Control and Docker Containerization Baseline Project*

---

## 📌 Project Overview

The **Blood Bank and Organ Donation Coordination Platform** is a clean, responsive static web application designed to connect voluntary blood and organ donors with regional blood banks, trauma centers, and hospital surgical units.

This project serves as the static front-end repository for college Git and Docker laboratory assignments.

---

## 📁 Repository Structure

```text
BloodBankDockerAssignment/
├── app/
│   ├── index.html     # Semantic HTML5 markup (Hero, Features, Inventory, About, Contact)
│   ├── style.css      # Vanilla CSS3 styling (Healthcare theme, glassmorphism header, responsive design)
│   └── script.js      # Client-side JavaScript (Smooth scrolling, alert popups, search filters)
└── README.md          # Project documentation & assignment workflow guide
```

---

## 🎨 Features & Highlights

- **Professional Healthcare Theme**: Crimson red (`#D32F2F`) and clean white palette with modern slate typography.
- **Hero Section**: Includes platform title, welcome description, live network indicator, and two action buttons (*Register as Donor* and *Find Blood*).
- **Core Feature Cards**:
  1. **Donor Registration**: Online registration and eligibility tracking.
  2. **Blood Availability**: Real-time inventory tracking by blood group (A+, A-, B+, B-, O+, O-, AB+, AB-).
  3. **Emergency Requests**: Urgent notification dispatch for critical hospital surgical needs.
  4. **Hospital Coordination**: Direct inter-facility communications and transfer requests.
- **Interactive JavaScript Features**:
  - Popup alert when clicking **"Register as Donor"** (meets assignment requirements).
  - Modal form for donor registration details.
  - Live blood availability search & filter tool.
  - Smooth scrolling navigation.
- **Zero External Framework Dependencies**: Pure HTML, CSS, and vanilla JS.

---

## 🚀 How to Run Locally

No build tools, node packages, or backend server setup required!

1. Clone or navigate to the repository directory:
   ```bash
   cd BloodBankDockerAssignment/app
   ```
2. Open `index.html` directly in any web browser:
   - **Windows**: Double-click `index.html` or run `start index.html` in PowerShell.
   - **macOS**: Run `open index.html`.
   - **Linux**: Run `xdg-open index.html`.

---

## 🛠️ College Git Workflow Instructions (For Screenshots & Submission)

To initialize and record your Git repository history for your lab assignment report:

### 1. Initialize Git Repository
```bash
cd BloodBankDockerAssignment
git init
```

### 2. Configure Local User (Optional)
```bash
git config user.name "Your Name"
git config user.email "your.email@college.edu"
```

### 3. Stage and Commit Files
```bash
git add .
git commit -m "feat: initial setup of Blood Bank & Organ Donation Coordination Platform"
```

### 4. Create Feature Branch (Good Git Practice)
```bash
git checkout -b feature/donor-registration
# Make modifications to index.html or script.js if required by teacher
git add .
git commit -m "docs: updated donor registration alert logic"
git checkout main
git merge feature/donor-registration
```

### 5. Check Git Log for Assignment Screenshots
```bash
git log --oneline --graph --all
```

---

## 🐳 Future Docker Containerization Notes (Next Assignment Phase)

When asked to containerize this web app using Nginx or Apache in the next phase of your lab:

### Example `Dockerfile` (Place in `BloodBankDockerAssignment/Dockerfile` when ready):
```dockerfile
FROM nginx:alpine
COPY ./app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Building & Running Docker Container:
```bash
# Build Docker Image
docker build -t bloodbank-app:v1 .

# Run Container on Port 8080
docker run -d -p 8080:80 --name bloodbank-container bloodbank-app:v1

# Access in browser at http://localhost:8080
```

---

## 📄 License & Academic Integrity Notice

This project is created strictly for academic demonstration and lab assignments.
All rights reserved © 2026 PulseCare Academic Initiative.
