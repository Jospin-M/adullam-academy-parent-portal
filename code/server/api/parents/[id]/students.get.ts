export default defineEventHandler(async (event) => {
    const parentId = getRouterParam(event, 'id');
    
    console.log(parentId)

    return {
        students:  [
            {
                id: "xyz",
                name: "Elijah Johnson",
                insight: "Elijah is making steady progress this term, with a few areas that could use your attention this week.",
                actionItems: [
                    {
                        id: "1",
                        userId: "abc",
                        action: "Set aside 15–20 minutes this week to review the Python Functions lesson with Elijah and ensure he understands the key concepts before his next assignment."
                    },
                    {
                        id: "2",
                        userId: "abc",
                        action: "Work with Elijah to complete the two overdue tasks within the next 2–3 days to prevent them from impacting his term report."
                    },
                    {
                        id: "3",
                        userId: "abc",
                        action: "Schedule a short review session with Elijah to go over Week 12 concepts before his next quiz to help bring his average above 80%."
                    },
                    {
                        id: "4",
                        userId: "abc",
                        action: "Acknowledge Elijah’s strong progress and encourage him to maintain his current pace to stay ahead of schedule."
                    }
                ], 
                activity: {
                    "2026-05-01": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-02": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-03": { quizzes: 1, lessons: 2, challenges: 0 },
                    "2026-05-04": { quizzes: 5, lessons: 6, challenges: 3 },
                    "2026-05-05": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-06": { quizzes: 0, lessons: 1, challenges: 0 },
                    "2026-05-07": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-08": { quizzes: 4, lessons: 7, challenges: 3 },
                    "2026-05-09": { quizzes: 3, lessons: 5, challenges: 2 },
                    "2026-05-10": { quizzes: 1, lessons: 2, challenges: 1 },
                    "2026-05-11": { quizzes: 2, lessons: 4, challenges: 2 },
                    "2026-05-12": { quizzes: 6, lessons: 8, challenges: 4 },
                    "2026-05-13": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-14": { quizzes: 4, lessons: 6, challenges: 2 },
                    "2026-05-15": { quizzes: 1, lessons: 2, challenges: 0 },
                    "2026-05-16": { quizzes: 3, lessons: 5, challenges: 2 },
                    "2026-05-17": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-18": { quizzes: 5, lessons: 7, challenges: 3 },
                    "2026-05-19": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-20": { quizzes: 1, lessons: 2, challenges: 1 },
                    "2026-05-21": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-22": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-23": { quizzes: 3, lessons: 5, challenges: 2 },
                    "2026-05-24": { quizzes: 6, lessons: 8, challenges: 4 },
                    "2026-05-25": { quizzes: 2, lessons: 4, challenges: 2 },
                    "2026-05-26": { quizzes: 1, lessons: 3, challenges: 1 },
                    "2026-05-27": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-28": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-29": { quizzes: 5, lessons: 6, challenges: 3 },
                    "2026-05-30": { quizzes: 3, lessons: 4, challenges: 2 },
                },
                attendance: {
                    weeks: [
                        {
                            startDate: '29 Sep',
                            days: ['present', null, 'present', 'present', 'present', 'present', 'absent'],
                        },
                        {
                            startDate: '6 Oct',
                            days: ['absent', null, null, 'present', 'present', 'present', 'present'],
                        },
                        {
                            startDate: '13 Oct',
                            days: ['present', null, 'present', 'present', null, 'present', 'present'],
                        },
                        {
                            startDate: '20 Oct',
                            days: ['present', null, null, null, null, null, null],
                        },
                    ],
                },
                scores: { challengePassRate: 62, quizAverage: 73 },
                suggestions: [
                    {
                        id: 's1',
                        studentId: "abc",
                        title: 'Python Functions',
                        description: 'Below 50% on his last two attempts. Worth revisiting before the work compounds.',
                        concepts: ['Defining functions', 'Parameters & arguments', 'Return values'],
                        talkingPoints: [
                            { id: 's1-q1', text: 'Can you write a simple function right now that takes a name and prints a greeting?', suggestionId: 's1' },
                            { id: 's1-q2', text: 'What is the difference between a parameter and an argument?', suggestionId: 's1' },
                            { id: 's1-q3', text: 'What does the <code>return</code> keyword do — and what happens if you leave it out?', suggestionId: 's1' },
                        ],
                        done: false
                    },
                    {
                        id: 's2',
                        studentId: "abc",
                        title: 'Loops & Iteration',
                        description: 'Skipped two loop-based exercises last week without attempting them. A check-in would surface whether this is confidence or understanding.',
                        concepts: ['for loops', 'while loops', 'Break & continue'],
                        talkingPoints: [
                            { id: 's2-q1', text: 'Can you walk me through what a <code>for</code> loop does, step by step?', suggestionId: 's2' },
                            { id: 's2-q2', text: 'What is the difference between a <code>for</code> loop and a <code>while</code> loop — when would you use each?', suggestionId: 's2' },
                            { id: 's2-q3', text: 'Can you write a loop right now that prints the numbers 1 to 10?', suggestionId: 's2' },
                        ],
                        done: false
                    },
                    {
                        id: 's3',
                        studentId: "abc",
                        title: 'Lists & Indexing',
                        description: 'Consistent indexing errors across his last assignment. A quick concept to reinforce before the data structures unit.',
                        concepts: ['Zero-based indexing', 'Negative indices', 'Slicing'],
                        talkingPoints: [
                            { id: 's3-q1', text: 'If I have a list with five items, what index does the last item have — and why?', suggestionId: 's3' },
                            { id: 's3-q2', text: 'What happens when you try to access an index that doesn\'t exist in a list?', suggestionId: 's3' },
                            { id: 's3-q3', text: 'Can you show me how you\'d get the last three items from a list using slicing?', suggestionId: 's3' },
                        ],
                        done: false
                    },
                    {
                        id: 's4',
                        studentId: "abc",
                        title: 'Conditionals & Boolean Logic',
                        description: 'Mixing up <code>and</code> and <code>or</code> operators in compound conditions. A short conversation could prevent this becoming a habit.',
                        concepts: ['if / elif / else', 'Boolean operators', 'Comparison operators'],
                        talkingPoints: [
                        { id: 's4-q1', text: 'Can you tell me what this condition evaluates to: <code>True and False or True</code>?', suggestionId: 's4' },
                        { id: 's4-q2', text: 'When would you use <code>elif</code> instead of a second <code>if</code>?', suggestionId: 's4' },
                        { id: 's4-q3', text: 'Can you write a condition that checks whether a number is between 10 and 20?', suggestionId: 's4' },
                        ],
                        done: false
                    },
                ],
                lessonProgress: [
                    { label: 'Week 1', lessons: 1 },
                    { label: 'Week 2', lessons: 2 },
                    { label: 'Week 3', lessons: 1 },
                    { label: 'Week 4', lessons: 2 },
                    { label: 'Week 5', lessons: 1 },
                ],
                todos: [ 
                    { id: "t1",  complete: true, task: "Watch Python Functions lesson video" },
                    { id: "t2",  complete: false, task: "Complete Week 13 quiz" },
                    { id: "t3",  complete: false, task: "Review loops exercise feedback" },
                    { id: "t4",  complete: true, task: "Watch Week 14 introduction video" },
                    { id: "t5",  complete: false, task: "Install VS Code & Python" },
                    { id: "t6",  complete: true, task: "Complete the Python Functions coding challenge" },
                    { id: "t7",  complete: false, task: "Read Week 14 lesson notes" },
                    { id: "t8",  complete: false, task: "Submit Week 12 reflection" },
                    { id: "t9",  complete: true, task: "Practice writing functions with return values" },
                    { id: "t10", complete: false, task: "Message tutor with any questions before next session" },
                ],
                lastUpdated: "3 hours ago"
            },
            {
                id: "uvw",
                name: "Sophia Johnson",
                insight: "Sophia has been highly consistent this month and is showing strong engagement, though a few advanced concepts may need reinforcement before the next assessment.",
                actionItems: [
                    {
                        id: "5",
                        userId: "abc",
                        action: "Encourage Sophia to spend 20 minutes reviewing dictionary operations and nested data structures before next week's project work."
                    },
                    {
                        id: "6",
                        userId: "abc",
                        action: "Celebrate Sophia’s recent quiz improvement to help reinforce her confidence and consistency."
                    },
                    {
                        id: "7",
                        userId: "abc",
                        action: "Check in with Sophia about her pacing during coding challenges — she may be rushing through debugging steps."
                    },
                    {
                        id: "8",
                        userId: "abc",
                        action: "Set aside time this weekend to review her latest project submission together and discuss how she approached the problem."
                    }
                ],
                activity: {
                    "2026-05-01": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-02": { quizzes: 5, lessons: 6, challenges: 3 },
                    "2026-05-03": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-04": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-05": { quizzes: 5, lessons: 7, challenges: 3 },
                    "2026-05-06": { quizzes: 1, lessons: 2, challenges: 1 },
                    "2026-05-07": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-08": { quizzes: 6, lessons: 8, challenges: 4 },
                    "2026-05-09": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-10": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-11": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-12": { quizzes: 5, lessons: 7, challenges: 3 },
                    "2026-05-13": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-14": { quizzes: 6, lessons: 8, challenges: 4 },
                    "2026-05-15": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-16": { quizzes: 4, lessons: 6, challenges: 2 },
                    "2026-05-17": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-18": { quizzes: 5, lessons: 7, challenges: 3 },
                    "2026-05-19": { quizzes: 4, lessons: 5, challenges: 2 },
                    "2026-05-20": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-21": { quizzes: 5, lessons: 6, challenges: 3 },
                    "2026-05-22": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-23": { quizzes: 4, lessons: 6, challenges: 2 },
                    "2026-05-24": { quizzes: 6, lessons: 8, challenges: 4 },
                    "2026-05-25": { quizzes: 3, lessons: 5, challenges: 2 },
                    "2026-05-26": { quizzes: 2, lessons: 3, challenges: 1 },
                    "2026-05-27": { quizzes: 5, lessons: 7, challenges: 3 },
                    "2026-05-28": { quizzes: 3, lessons: 4, challenges: 2 },
                    "2026-05-29": { quizzes: 6, lessons: 7, challenges: 4 },
                    "2026-05-30": { quizzes: 4, lessons: 5, challenges: 2 },
                },
                attendance: {
                    weeks: [
                        {
                            startDate: '29 Sep',
                            days: ['present', 'present', 'present', 'present', 'present', null, 'present'],
                        },
                        {
                            startDate: '6 Oct',
                            days: ['present', 'present', 'present', null, 'present', 'present', 'present'],
                        },
                        {
                            startDate: '13 Oct',
                            days: ['present', 'present', 'present', 'present', 'present', 'present', null],
                        },
                        {
                            startDate: '20 Oct',
                            days: ['present', 'present', null, 'present', 'present', null, null],
                        },
                    ],
                },
                scores: { challengePassRate: 88, quizAverage: 91 },
                suggestions: [
                    {
                        id: 's5',
                        studentId: "uvw",
                        title: 'Dictionaries & Key Access',
                        description: 'Sophia understands the basics but occasionally mixes up keys and indices in nested structures.',
                        concepts: ['Dictionary syntax', 'Key lookup', 'Nested dictionaries'],
                        talkingPoints: [
                            { id: 's5-q1', text: 'What is the difference between accessing a list item and a dictionary value?', suggestionId: 's5' },
                            { id: 's5-q2', text: 'Can you explain what happens if you try to access a key that does not exist?', suggestionId: 's5' },
                            { id: 's5-q3', text: 'Can you write a small dictionary representing a student profile?', suggestionId: 's5' },
                        ],
                        done: false
                    },
                    {
                        id: 's6',
                        studentId: "uvw",
                        title: 'Debugging Strategies',
                        description: 'Sophia often solves problems quickly, but occasionally skips systematic debugging steps when errors appear.',
                        concepts: ['Reading error messages', 'Testing incrementally', 'Using print debugging'],
                        talkingPoints: [
                            { id: 's6-q1', text: 'What is the first thing you usually check when your code throws an error?', suggestionId: 's6' },
                            { id: 's6-q2', text: 'Why can printing variable values help during debugging?', suggestionId: 's6' },
                            { id: 's6-q3', text: 'Can you describe a recent bug you solved and how you found the issue?', suggestionId: 's6' },
                        ],
                        done: false
                    },
                    {
                        id: 's7',
                        studentId: "uvw",
                        title: 'Functions & Scope',
                        description: 'Sophia performs well overall, but variable scope mistakes appeared in her latest assignment.',
                        concepts: ['Local variables', 'Global variables', 'Function scope'],
                        talkingPoints: [
                            { id: 's7-q1', text: 'What happens to a variable created inside a function after the function finishes running?', suggestionId: 's7' },
                            { id: 's7-q2', text: 'Why is using too many global variables usually discouraged?', suggestionId: 's7' },
                            { id: 's7-q3', text: 'Can two functions use variables with the same name without conflicting?', suggestionId: 's7' },
                        ],
                        done: false
                    }
                ],
                lessonProgress: [
                    { label: 'Week 1', lessons: 3 },
                    { label: 'Week 2', lessons: 3 },
                    { label: 'Week 3', lessons: 3 },
                    { label: 'Week 4', lessons: 2 },
                    { label: 'Week 5', lessons: 3 },
                ],
                todos: [
                    { id: "t11", complete: true, task: "Finish debugging practice worksheet" },
                    { id: "t12", complete: false, task: "Complete nested dictionary exercises" },
                    { id: "t13", complete: true, task: "Watch lesson on variable scope" },
                    { id: "t14", complete: false, task: "Submit Week 14 coding challenge" },
                    { id: "t15", complete: false, task: "Review instructor feedback on latest assignment" },
                    { id: "t16", complete: true, task: "Practice writing reusable functions" },
                    { id: "t17", complete: false, task: "Complete dictionary quiz retry" },
                    { id: "t18", complete: true, task: "Read debugging tips article" },
                ],
                lastUpdated: "2 days ago"
            }
        ],
        totalLessons: 15
    };
});