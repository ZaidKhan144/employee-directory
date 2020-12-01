// Search Filter for Employees

searchBar.addEventListener('keyup', (e) => {
	const searchString = e.target.value.toUpperCase();

	const empNames = document.querySelectorAll('.card h2');

	const filteredResults = empNames.forEach((name) => {
		if (!name.textContent.toUpperCase().includes(searchString)) {
			name.closest('.card').classList.add('hidden');
		} else if (name.textContent.toUpperCase().includes(searchString)) {
			name.closest('.card').classList.remove('hidden');
		}
	});

	return filteredResults;
});