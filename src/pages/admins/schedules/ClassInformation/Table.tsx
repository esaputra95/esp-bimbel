import { FC, useEffect, useRef } from "react";
import { ClassInformationInterface, EventCalender, StudyGroup } from "../../../../interfaces/schedule/ClassInformationInterface";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import './calender.css'

type TableType = {
    dataClassInformation: StudyGroup;
    query?: ClassInformationInterface
};

const TableClassInformation: FC<TableType> = (props) => {
    const calendarRef = useRef<FullCalendar>(null);
    const { dataClassInformation, query } = props;

    const businessHours = {
        startTime: "07:00",
        endTime: "21:00",
    };

    useEffect(() => {
        if (query?.startDate && calendarRef.current) {
            const calendarApi = calendarRef.current?.getApi();
            calendarApi.gotoDate(query.startDate); // Ganti tanggal sesuai query.startDate
        }
    }, [query?.startDate]);
    

    return (
        <div className="w-full overflow-auto">
        <FullCalendar
            ref={calendarRef}
            plugins={[resourceTimeGridPlugin]}
            initialView="resourceTimeGridDay"
            resources={dataClassInformation.room}
            events={dataClassInformation.event}
            businessHours={businessHours}
            slotDuration="00:30:00"
            locale="id-ID"
            initialDate={query?.startDate}
            contentHeight={600}
            // slotDuration="00:15:00" // Ubah grid jadi per 15 menit
            slotLabelInterval="00:15:00" // Label muncul tiap 15 menit
            slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: false,
            }}
            headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "resourceTimeGridWeek,resourceTimeGridDay",
            }}
            validRange={{
                start: '2024-07-01',
                end: '2026-12-31',
            }}
            slotEventOverlap={false}
            eventContent={renderEventContent}
        />
        </div>
    );
};

function renderEventContent(eventInfo: {timeText: string, event: EventCalender}) {
    return (
        <div className="flex flex-col text-center overflow-auto">
        {/* <div className="flex flex-col"> */}
            <strong className="text-xs font-extralight">{eventInfo?.timeText}</strong>
            <span className="text-xs font-extralight">{eventInfo?.event?.title}</span>
            <span className="text-xs font-extralight">{eventInfo?.event?.extendedProps?.group}</span>
            <span className="text-xs font-extralight">{eventInfo?.event?.extendedProps?.course}</span>
            <span className="text-xs font-extralight">{eventInfo?.event?.extendedProps?.room}</span>
        {/* </div> */}
        </div>
    );
}

export default TableClassInformation;
