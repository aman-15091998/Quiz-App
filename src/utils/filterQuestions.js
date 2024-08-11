export const top10ByTagsCount=(questions, tags)=>{
    const selectedTagsSet = new Set(tags);
    const questionsWithCount = questions.map(question => {
        const matchCount = question.tags.filter(tag => selectedTagsSet.has(tag)).length;
        return { ...question, matchCount };
    });

    const sortedQuestions = questionsWithCount.sort((a, b) => b.matchCount - a.matchCount);
    return sortedQuestions.slice(0, 10);
}