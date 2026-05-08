export function useStudents() {
    const students = useState<Record<string, any>>('students', () => ({}));

    function setStudents(list: any[]) {
        const map: Record<string, any> = {};

        for(const student of list) {
            map[student.id] = student;
        }

        students.value = map;
    }

    function getStudent(id: string) {
        return students.value[id];
    }

    return {
        students,
        getStudent,
        setStudents
    }
}