export const fetchBonusQuestion = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/bonus");
        if (!response.ok) throw new Error("Failed to fetch bonus question");

        const data = await response.json();
        return {
            question: data.question,  // Image URL
            solution: data.solution,  // Correct answer
        };
    } catch (error) {
        console.error("Error fetching bonus question:", error);
        return null;
    }
};
