export const top10ByTagsCount=(questions, tags)=>{
    const selectedTagsSet = new Set(tags);
    const questionsWithCount = questions.map(question => {
        const matchCount = question.tags.filter(tag => selectedTagsSet.has(tag)).length;
        return { ...question, matchCount };
    });

    const sortedQuestions = questionsWithCount.sort((a, b) => b.matchCount - a.matchCount);
    return sortedQuestions.slice(0, 10);
}

// import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// export const top10ByTagsCount = (questions, tags) => {
//     const selectedTagsSet = new Set(tags);
//     const minHeap = new MinPriorityQueue({ priority: (question) => question.matchCount });

//     questions.forEach(question => {
//         const matchCount = question.tags.filter(tag => selectedTagsSet.has(tag)).length;
//         const questionWithCount = { ...question, matchCount };

//         if (minHeap.size() < 10) {
//             minHeap.enqueue(questionWithCount);
//         } else if (minHeap.front().matchCount < matchCount) {
//             minHeap.dequeue();
//             minHeap.enqueue(questionWithCount);
//         }
//     });

//     const topQuestions = [];
//     while (minHeap.size() > 0) {
//         topQuestions.push(minHeap.dequeue());
//     }
    
//     return topQuestions.sort((a, b) => b.matchCount - a.matchCount);
// }
