import path from "node:path";
import { config } from "dotenv";

import { Client } from "@notionhq/client";

config({ path: path.resolve("../../.env") })

const notion = new Client({ auth: process.env.NOTION_API_KEY })

/**
 * Queries the Notion data source for records matching a given student name.
 *
 * @param name - The student's name to match exactly against the `student_name` property.
 * @returns A promise resolving to the Notion query response containing matching records.
 *
 * @throws Will throw if `NOTION_DB_DATASOURCE_ID` is not set or if the Notion API request fails.
 */
async function getStudent(name: string) {
    return await notion.dataSources.query({
        data_source_id: process.env.NOTION_DB_DATASOURCE_ID!,
        filter: {
            property: 'student_name',
            rich_text: { equals: name }
        }
    });
}

type RawNotionData = { 
    properties: {
        score: { number: number },
        content_type: { select: { name: string } },
        content_title: { title: { plain_text: string }[] },
        timestamp: { date: { start: string, end: string, time_zone: string } }
    } 
};

type NotionData = {
    score: number,
    content_type: string,
    content_title: string,
    timestamp: string
};

function flatten(data: RawNotionData): NotionData {
    return {
        score: data.properties.score.number,
        timestamp: data.properties.timestamp.date.start,
        content_type: data.properties.content_type.select.name,
        content_title: data.properties.content_title.title[0]!.plain_text,
    };
}

/**
 * Aggregates a student's activity counts by date.
 *
 * Iterates over the provided records and tallies how many quizzes, lessons,
 * and challenges occurred on each unique timestamp. Dates with no matching
 * content types are still included with zero counts.
 *
 * @param studentData - Notion records for a single student.
 * @returns An object keyed by date, where each value contains the number of
 *   quizzes, lessons, and challenges completed on that date.
 *
 * @example
 * const activity = getDailyActivity(studentData);
 * // {
 * //   "2026-05-15": { quizzes: 2, lessons: 1, challenges: 0 },
 * //   "2026-05-15": { quizzes: 0, lessons: 3, challenges: 1 }
 * // }
 */
function getDailyActivity(studentData: NotionData[]) {
    const activityDates = new Array(...new Set(studentData.map(data => data.timestamp)).keys()).sort();
    const activity = Object.fromEntries(activityDates.map(date => [date, { quizzes: 0, lessons: 0, challenges: 0 }]));

    studentData.forEach(data => {
        if(data.content_type === 'Quiz') {
            activity[data.timestamp]!.quizzes += 1;
        } else if(data.content_type === 'Lesson') {
            activity[data.timestamp]!.lessons += 1;
        } else if(data.content_type === 'Challenge') {
            activity[data.timestamp]!.challenges += 1;
        }
    });

    return activity;
}

/**
 * Calculates a student's average quiz score and challenge pass rate.
 *
 * @param studentData - Notion records for a single student.
 * @returns An object containing:
 *   - `challengePassRate`: Average score across all challenges, as a percentage.
 *   - `quizAverage`: Average score across all quizzes, as a percentage.
 *
 * @example
 * const { challengePassRate, quizAverage } = getScores(studentData);
 * // { challengePassRate: 75, quizAverage: 88 }
 */
function getScores(studentData: NotionData[]) {
    const quizzes = studentData.filter(data => data.content_type === 'Quiz');
    const challenges = studentData.filter(data => data.content_type === 'Challenge');

    function calculateAverage(tests: NotionData[]) {
        if(tests.length == 0) return 0;
        
        let scoreSum = 0;
        tests.forEach(test => scoreSum = scoreSum + test.score);

        const average = Number(((scoreSum / (tests.length * 100)) * 100).toPrecision(2));

        return average;
    }

    return { challengePassRate: calculateAverage(challenges), quizAverage: calculateAverage(quizzes) }
}

const { results: rawStudentData } = await getStudent('Kofi M.');
const studentData = (rawStudentData as unknown as RawNotionData[]).map(data => flatten(data));

const todos = studentData.filter(data => data.content_type === 'Todo');
const lessons = studentData.filter(data => data.content_type === 'Lesson');
