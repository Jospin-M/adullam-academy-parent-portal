/**
 * Composable for managing student state across the application.
 *
 * Provides a reactive shared state containing a list of students and the
 * currently selected student, along with helper functions to update them.
 * Uses Nuxt's `useState` under the hood, so the state is SSR-friendly and
 * shared across components that call this composable.
 *
 * @returns An object containing the reactive state and mutator functions.
 * @returns {Ref<{ list: any[], selectedStudent: any | null }>} students:
 *   Reactive ref holding the students `list` and the currently `selectedStudent`.
 * @returns {(list: any[]) => void} setStudents():
 *   Replaces the current students list with the provided array.
 * @returns {(index: number) => void} selectStudent():
 *   Selects a student by their index in the list and stores them as
 *   `selectedStudent`.
*/
export function useStudents() {
    const students = useState<Record<string, any>>('students', () => ({
        list: [],
        selectedStudent: null
    }));

    function setStudents(list: any[]) {
        students.value.list = list;
    }

    function selectStudent(index: number) {
        students.value.selectedStudent = students.value.list[index];
    }

    return {
        students,
        setStudents,
        selectStudent
    }
}