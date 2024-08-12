// export const top10ByTagsCount=(questions, tags)=>{
//     const selectedTagsSet = new Set(tags);  //storing the tags in Set for O(1) lookup time
//     const questionsWithCount = questions.map(question => {
//         const matchCount = question.tags.filter(tag => selectedTagsSet.has(tag)).length;    //Counting the the number of matching tags in a question
//         return { ...question, matchCount }; //storing the matchCount
//     });

//     const sortedQuestions = questionsWithCount.sort((a, b) => b.matchCount - a.matchCount); //Sorting in descending order    
//     return sortedQuestions.slice(0, 10);
// } //TC is O(n*k) + O(nlogn)


import { Heap } from 'heap-js';

export const top10ByTagsCount = (questions, tags) => {
    const selectedTagsSet = new Set(tags); //O(1) lookup time
    const minHeap = new Heap((a, b) => a.matchCount - b.matchCount); //Min-heap to store top 10 questions

    questions.forEach(question => {
        const matchCount = question.tags.filter(tag => selectedTagsSet.has(tag)).length; //O(k) per question
        if (minHeap.size() < 10) {
            minHeap.push({ ...question, matchCount });
        } else if (matchCount > minHeap.peek().matchCount) {
            minHeap.pop();
            minHeap.push({ ...question, matchCount });
        }
    });
    const resultArr=minHeap.toArray().sort((a, b) => b.matchCount - a.matchCount); //Sorting the final top 10;
    return resultArr;
};
//TC O(n*k)
