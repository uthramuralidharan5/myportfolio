// Function to add a new profile locally (using localStorage) and update table
function addProfileLocally(name, role, email, bio, image, linkedin, twitter) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Generate a unique ID (for simplicity, using timestamp)
    const newProfile = {
        id: Date.now(),
        name: name,
        role: role,
        email: email,
        bio: bio,
        image: image || 'img/placeholder.jpg',  // Default image if none provided
        linkedin: linkedin || '',
        twitter: twitter || '',
        addedBy: document.getElementById('added-by').value  // Name of the person adding the profile
    };

    profiles.push(newProfile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    updateContributorsTable();  // Update contributors table
    return newProfile.id;
}

// Function to update the contributors table
function updateContributorsTable() {
    const contributorsTable = document.getElementById('contributors-body');
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    console.log('Updating contributors table with profiles:', profiles);

    contributorsTable.innerHTML = ''; // Clear previous content

    profiles.forEach(profile => {
        console.log('Adding profile:', profile);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${profile.name}</td>
            <td>${profile.email}</td>
            <td>${profile.role}</td>
            <td>${profile.bio}</td>
            <td>
                <button type="button" class="btn btn-secondary btn-sm" onclick="editProfile(${profile.id})">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteProfile(${profile.id})">Delete</button>
            </td>
        `;
        contributorsTable.appendChild(row);
    });

    console.log('Table updated successfully.');
}

// Function to handle form submission for adding new profile
function submitProfile(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const image = document.getElementById('image').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const twitter = document.getElementById('twitter').value.trim();

    // Add profile locally
    addProfileLocally(name, role, email, bio, image, linkedin, twitter);

    // Clear form fields after submission
    this.reset();
}

// Function to edit a profile
function editProfile(profileId) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const profile = profiles.find(profile => profile.id === profileId);

    if (!profile) {
        alert('Profile not found.');
        return;
    }

    // Populate form fields with existing profile data
    document.getElementById('name').value = profile.name;
    document.getElementById('role').value = profile.role;
    document.getElementById('email').value = profile.email;
    document.getElementById('bio').value = profile.bio;
    document.getElementById('image').value = profile.image;
    document.getElementById('linkedin').value = profile.linkedin;
    document.getElementById('twitter').value = profile.twitter;
    document.getElementById('added-by').value = profile.addedBy;

    // Replace add button with update button
    const addButton = document.querySelector('#add-profile-form button[type="submit"]');
    addButton.textContent = 'Update Profile';
    addButton.removeEventListener('click', submitProfile);  // Remove old event listener

    // Add event listener for update button
    addButton.addEventListener('click', function() {
        updateProfile(profileId);
    });
}

// Function to update an existing profile
function updateProfile(profileId) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const updatedProfiles = profiles.map(profile => {
        if (profile.id === profileId) {
            profile.name = document.getElementById('name').value.trim();
            profile.role = document.getElementById('role').value.trim();
            profile.email = document.getElementById('email').value.trim();
            profile.bio = document.getElementById('bio').value.trim();
            profile.image = document.getElementById('image').value.trim();
            profile.linkedin = document.getElementById('linkedin').value.trim();
            profile.twitter = document.getElementById('twitter').value.trim();
            profile.addedBy = document.getElementById('added-by').value;
        }
        return profile;
    });

    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    updateContributorsTable();  // Update table
    document.getElementById('add-profile-form').reset();  // Reset form
    document.querySelector('#add-profile-form button[type="submit"]').textContent = 'Add Profile';  // Restore button text
    document.querySelector('#add-profile-form button[type="submit"]').removeEventListener('click', updateProfile);  // Remove update event listener
    document.querySelector('#add-profile-form button[type="submit"]').addEventListener('click', submitProfile);  // Add add event listener
}

// Function to delete a profile
function deleteProfile(profileId) {
    if (confirm('Are you sure you want to delete this profile?')) {
        let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
        profiles = profiles.filter(profile => profile.id !== profileId);
        localStorage.setItem('profiles', JSON.stringify(profiles));
        updateContributorsTable();  // Update table
    }
}

// Initial setup: Display contributors table on page load
updateContributorsTable();
