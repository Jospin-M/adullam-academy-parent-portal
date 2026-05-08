export default defineEventHandler(async (event) => {
    const responses = await readBody(event);
    const questionId = getRouterParam(event, 'id');

    console.log(responses, questionId)

    return { message: "suggestion response saved" };
});