document.getElementById('add-profile-form').addEventListener('submit', submitProfile);

function addProfileLocally(name, role, email, bio, image, linkedin, twitter) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    const newProfile = {
        id: Date.now(),
        name: name,
        role: role,
        email: email,
        bio: bio,
        image: image || 'img/placeholder.jpg',
        linkedin: linkedin || '',
        twitter: twitter || '',
        addedBy: document.getElementById('added-by').value
    };

    profiles.push(newProfile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    updateContributorsTable();
    return newProfile.id;
}

function updateContributorsTable() {
    const contributorsTable = document.getElementById('contributors-body');
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    contributorsTable.innerHTML = ''; // Clear previous content

    profiles.forEach(profile => {
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
}

function submitProfile(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const image = document.getElementById('image').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const twitter = document.getElementById('twitter').value.trim();

    addProfileLocally(name, role, email, bio, image, linkedin, twitter);
    this.reset();
}

function editProfile(profileId) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const profile = profiles.find(profile => profile.id === profileId);

    if (!profile) {
        alert('Profile not found.');
        return;
    }

    document.getElementById('name').value = profile.name;
    document.getElementById('role').value = profile.role;
    document.getElementById('email').value = profile.email;
    document.getElementById('bio').value = profile.bio;
    document.getElementById('image').value = profile.image;
    document.getElementById('linkedin').value = profile.linkedin;
    document.getElementById('twitter').value = profile.twitter;
    document.getElementById('added-by').value = profile.addedBy;

    const addButton = document.querySelector('#add-profile-form button[type="submit"]');
    addButton.textContent = 'Update Profile';
    addButton.removeEventListener('click', submitProfile);

    addButton.addEventListener('click', function () {
        updateProfile(profileId);
    });
}

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
    updateContributorsTable();
    document.getElementById('add-profile-form').reset();
    document.querySelector('#add-profile-form button[type="submit"]').textContent = 'Add Profile';
    document.querySelector('#add-profile-form button[type="submit"]').removeEventListener('click', updateProfile);
    document.querySelector('#add-profile-form button[type="submit"]').addEventListener('click', submitProfile);
}

function deleteProfile(profileId) {
    if (confirm('Are you sure you want to delete this profile?')) {
        let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
        profiles = profiles.filter(profile => profile.id !== profileId);
        localStorage.setItem('profiles', JSON.stringify(profiles));
        updateContributorsTable();
    }
}

updateContributorsTable();
