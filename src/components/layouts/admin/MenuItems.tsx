const MasterMenu = [
    {
        label: 'tutors',
        path: 'tutors',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'class-types',
        path: 'class-types',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'class',
        path: 'class',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'rooms',
        path: 'rooms',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'universities',
        path: 'universities',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'majors',
        path: 'majors',
        active: false,
        access: ['admin', '']
    },
    {
        label: 'courses',
        path: 'courses',
        active: false,
        access: ['admin', 'employee']
    }
];

const ReportPayroll = [
    {
        label: 'payroll-reports',
        path: 'report/payroll-reports',
        active: false,
        access: ['admin']
    },
    {
        label: 'record-materi-reports',
        path: 'report/record-materi-reports',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'student-reports',
        path: 'report/student-reports',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'schedule-reports',
        path: 'report/schedule-reports',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'register-reports',
        path: 'report/register-reports',
        active: false,
        access: ['admin', 'employee']
    },
]

const ScheduleMenu = [
    {
        label: 'tentor-not-available',
        path: 'schedule/tentor-not-available',
        active: false,
        access: ['admin', 'tentor', 'employee']
    },
    {
        label: 'study-groups',
        path: 'schedule/study-groups',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'class-information',
        path: 'schedule/class-information',
        active: false,
        access: ['admin', 'tentor', 'employee']
    }
]

const SettingMenu = [
    {
        label: 'guidance-types',
        path: 'setting/guidance-types',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'guidance-packages',
        path: 'setting/guidance-packages',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'school-years',
        path: 'setting/school-years',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'sessions',
        path: 'setting/sessions',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'companies',
        path: 'setting/companies',
        active: false,
        access: ['admin', 'employee']
    }
];

const RecordMateri = [
    {
        label: 'record-materi',
        path: 'record-materi',
        active: false,
        access: ['admin', 'tentor', 'employee']
    },
];

const Payroll = [
    {
        label: 'payroll',
        path: 'payroll',
        active: false,
        access: ['admin', 'tentor']
    }
]

const Register = [
    {
        label: 'students',
        path: 'students',
        active: false,
        access: ['admin', 'employee']
    },
    {
        label: 'registrations',
        path: 'registrations',
        active: false,
        access: ['admin', 'employee']
    }
]

export {
    Register,
    Payroll,
    RecordMateri,
    MasterMenu,
    SettingMenu,
    ReportPayroll,
    ScheduleMenu
}
