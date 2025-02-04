// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Replace 'matthewjdoyle' with your GitHub username if necessary
  const username = 'matthewjdoyle';
  const apiURL = `https://api.github.com/users/${username}`;

  // Fetch data from GitHub API
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Select the container where the profile info will be displayed
      const profileContainer = document.getElementById('github-profile-content');


      // Build some HTML content with the fetched data
      profileContainer.innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar of ${data.name}" width="100" style="border-radius:50%;">
        <h3>${data.name || data.login}</h3>
        <p>${data.bio ? data.bio : 'No bio available.'}</p>
        <p><strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
        <a href="${data.html_url}" target="_blank">Visit my GitHub Profile</a>
      `;
    })
    .catch(error => {
      // Log the error and show a friendly message
      console.error('Error fetching GitHub profile:', error);
      const profileContainer = document.getElementById('github-profile-content');
      profileContainer.innerHTML = `<p>Sorry, there was a problem loading the profile data.</p>`;
    });
});
