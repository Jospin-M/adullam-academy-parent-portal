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