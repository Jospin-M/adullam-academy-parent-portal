export function useStudents() {
    const students = useState<Record<string, any>>('students', () => ({}));

    function setStudents(list: any[]) {
        students.value = list;
    }

    function selectStudent(index: string) {
        students.value.selectedStudent = students.value[index];
    }

    return {
        students,
        setStudents,
        selectStudent
    }
}