function searchCourse(courses, query) {
    // Trim the query to remove leading/trailing whitespace
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return courses; // If no query after trim, return all courses

    return courses.filter(course => {
        // Convert the fields and the query to lowercase for case-insensitive comparison
        const titleLower = course.titel.toLowerCase();
        const descriptionLower = course.beschreibung.toLowerCase();
        const categorieLower = course.kategorie.toLowerCase();
        const zielgruppeLower = course.zielgruppe.toLowerCase();

        const queryLower = trimmedQuery.toLowerCase();

        // Check if the query is in the title or description
        return titleLower.includes(queryLower) || descriptionLower.includes(queryLower) || categorieLower.includes(queryLower)|| zielgruppeLower.includes(queryLower);
    });
}

export { searchCourse };
