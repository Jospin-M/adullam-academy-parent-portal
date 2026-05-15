import { getDailyActivity, getScores, getStudent, getTodos, getWeeklyLessons } from "../../../../app/lib/notion";

export default defineEventHandler(async (event) => {
    const parentId = getRouterParam(event, 'id'); // will be used to query for student names
    
    const insights = [
        "Daniel N. is making steady progress this term, with a few areas that could use your attention this week.",
        "Kofi M. has been highly consistent this month and is showing strong engagement, though a few advanced concepts may need reinforcement before the next assessment."
    ];

    const actionItemsList = [
        [
            {
                id: "1",
                studentId: "abc",
                action: "Set aside 15–20 minutes this week to review the Python Functions lesson with Daniel and ensure he understands the key concepts before his next assignment."
            },
            {
                id: "2",
                studentId: "abc",
                action: "Work with Daniel to complete the two overdue tasks within the next 2–3 days to prevent them from impacting his term report."
            },
            {
                id: "3",
                studentId: "abc",
                action: "Schedule a short review session with Daniel to go over Week 12 concepts before his next quiz to help bring his average above 80%."
            },
            {
                id: "4",
                studentId: "abc",
                action: "Acknowledge Daniel's strong progress and encourage him to maintain his current pace to stay ahead of schedule."
            }
        ],
        [
            {
                id: "5",
                studentId: "uvw",
                action: "Encourage Kofi to spend 20 minutes reviewing dictionary operations and nested data structures before next week's project work."
            },
            {
                id: "6",
                studentId: "uvw",
                action: "Celebrate Kofi recent quiz improvement to help reinforce her confidence and consistency."
            },
            {
                id: "7",
                studentId: "uvw",
                action: "Check in with Kofi about her pacing during coding challenges — she may be rushing through debugging steps."
            },
            {
                id: "8",
                studentId: "uvw",
                action: "Set aside time Kofi weekend to review her latest project submission together and discuss how she approached the problem."
            }
        ]
    ];

    const attendanceList = [
        {
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
        {
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
        }
    ];

    const suggestionsList = [
        [
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
        [
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
        ]
    ];

    const studentNames = ["Daniel N.", "Kofi M."];
    const studentDataPromises = studentNames.map(async (name, index) => {
        const data = await getStudent(name);

        return {
            name,
            insight: insights[index],
            actionItems: actionItemsList[index],
            suggestions: suggestionsList[index],

            attendance: attendanceList[index],

            activity: getDailyActivity(data),
            scores: getScores(data),
            lessonProgress: getWeeklyLessons(data, '2026-04-16'),
            todos: getTodos(data),

            lastUpdated: "2 days ago"
        };
    });

    const studentData = await Promise.all(studentDataPromises);

    return {
        students: studentData,
        totalLessons: 20
    };
});