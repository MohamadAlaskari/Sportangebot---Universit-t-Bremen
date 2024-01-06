
function getMaxMinPrice(courses) {
    if (courses.length === 0) {
        return [0, 0]; // No courses available
    }

    let minPrice = courses[0].preis;
    let maxPrice = courses[0].preis;

    for (const course of courses) {
        if (course.preis < minPrice) {
            minPrice = course.preis;
        }
        if (course.preis > maxPrice) {
            maxPrice = course.preis;
        }
    }

    return [minPrice, maxPrice];
}

export { getMaxMinPrice }
