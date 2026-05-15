import path from "node:path";
import { config } from "dotenv";

import { Client } from "@notionhq/client";

config({ path: path.resolve("../../.env") })

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getStudent(name: string) {
    return await notion.dataSources.query({
        data_source_id: process.env.NOTION_DB_DATASOURCE_ID!,
        filter: {
            property: "student_name",
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
    timestamp: { start: string, end: string, time_zone: string }
};

function flatten(data: RawNotionData): NotionData {
    return {
        score: data.properties.score.number,
        timestamp: data.properties.timestamp.date,
        content_type: data.properties.content_type.select.name,
        content_title: data.properties.content_title.title[0]!.plain_text,
    };
}

const { results: rawStudentData } = await getStudent('Kofi M.');
const studentData = (rawStudentData as unknown as RawNotionData[]).map(data => flatten(data));

const todos = studentData.filter(data => data.content_type === 'Todo');
const quizzes = studentData.filter(data => data.content_type === 'Quiz');
const lessons = studentData.filter(data => data.content_type === 'Lesson');