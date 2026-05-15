import path from "node:path";
import { config } from "dotenv";

import { Client } from "@notionhq/client";
import { randomUUID } from "node:crypto";

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
export async function getStudent(name: string) {   
    const { results } = await notion.dataSources.query({
        data_source_id: process.env.NOTION_DB_DATASOURCE_ID!,
        filter: {
            property: 'student_name',
            rich_text: { equals: name }
        }
    });

    function flatten(data: RawNotionData): NotionData {
        return {
            score: data.properties.score.number,
            timestamp: data.properties.timestamp.date.start,
            content_type: data.properties.content_type.select.name,
            content_title: data.properties.content_title.title[0]!.plain_text,
        };
    }

    const studentData = (results as unknown as RawNotionData[]).map(data => flatten(data));

    return studentData;
}

type RawNotionData = { 
    properties: {
        score: { number: number },
        content_type: { select: { name: string } },
        content_title: { title: { plain_text: string }[] },
        timestamp: { date: { start: string, end: string, time_zone: string } }
    } 
};

export type NotionData = {
    score: number,
    content_type: string,
    content_title: string,
    timestamp: string
};

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
export function getDailyActivity(studentData: NotionData[]) {
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
export function getScores(studentData: NotionData[]) {
    const quizzes = studentData.filter(data => data.content_type === 'Quiz');
    const challenges = studentData.filter(data => data.content_type === 'Challenge');

    function calculateAverage(tests: NotionData[]) {
        if(tests.length == 0) return 0;
        
        let scoreSum = 0;
        tests.forEach(test => scoreSum = scoreSum + test.score);

        const average = Number(((scoreSum / (tests.length * 100)) * 100).toPrecision(2));

        return average;
    }

    return { challengePassRate: calculateAverage(challenges), quizAverage: calculateAverage(quizzes) };
}

/**
 * Groups a student's lesson activity into weekly buckets starting from a course start date.
 *
 * @param studentData - Notion records for a single student.
 * @param courseStartDate - ISO date string marking the start of the course.
 * @returns An array of objects, each containing a week label and lesson count.
 *
 * @example
 * const weekly = getWeeklyLessons(studentData, '2026-01-05');
 * // [
 * //   { label: 'Week 1', lessons: 3 },
 * //   { label: 'Week 2', lessons: 2 },
 * //   ...
 * // ]
 */
export function getWeeklyLessons(studentData: NotionData[], courseStartDate: string) {
    const lessons = studentData.filter(data => data.content_type === 'Lesson');
    if (lessons.length === 0) return [];

    // Convert timestamps to Date objects and sort chronologically.
const lessonDates = lessons
    .map(lesson => new Date(lesson.timestamp))
    .sort((a, b) => a.getTime() - b.getTime());

    // Anchor the reference to midnight UTC on the Sunday on or before the course start date.
    // Subtracting getUTCDay() (0 for Sunday, 1 for Monday, ...) snaps back to that Sunday.
    const reference = new Date(courseStartDate);
    reference.setUTCHours(0, 0, 0, 0);
    reference.setUTCDate(reference.getUTCDate() - reference.getUTCDay());

    // Compute which week a given date falls into, relative to the reference Sunday.
    const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
    const weekIndexFor = (date: Date) =>
        Math.floor((date.getTime() - reference.getTime()) / MS_PER_WEEK);

    // Drop any lessons that occurred before the course start (negative week index).
    const validDates = lessonDates.filter(date => weekIndexFor(date) >= 0);
    if (validDates.length === 0) return [];

    // Determine how many weeks to render, based on the most recent valid lesson.
    const totalWeeks = weekIndexFor(validDates[validDates.length - 1]!) + 1;

    // Pre-fill every week with a zero count so gaps in activity still appear in the output.
    const weeks = Array.from({ length: totalWeeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        lessons: 0,
    }));

    validDates.forEach(date => {
        weeks[weekIndexFor(date)]!.lessons += 1;
    });

    return weeks;
}

/**
 * Extracts and formats a student's todo items from their Notion records.
 *
 * @param studentData - Notion records for a single student.
 * @returns An array of todo objects, each containing:
 *   - `id`: A generated UUID.
 *   - `complete`: Whether the todo is marked done (`score === 1`).
 *   - `task`: The todo's title.
 *
 * @example
 * const todos = getTodos(studentData);
 * // [
 * //   { id: '...', complete: true, task: 'Read chapter 3' },
 * //   { id: '...', complete: false, task: 'Submit assignment' }
 * // ]
 */
export function getTodos(studentData: NotionData[]) {
    const todos = studentData.filter(data => data.content_type === 'Todo')
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map(todo => ({ id: randomUUID(), complete: todo.score == 1 ? true : false, task: todo.content_title }));

    return todos;
}