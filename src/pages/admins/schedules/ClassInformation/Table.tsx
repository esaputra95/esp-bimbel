import { FC, useEffect, useRef } from "react";
import { ClassInformationInterface, StudyGroup } from "../../../../interfaces/schedule/ClassInformationInterface";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

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
        <div className="w-full">
            {query?.startDate}
        <FullCalendar
            ref={calendarRef}
            plugins={[resourceTimeGridPlugin]}
            initialView="resourceTimeGridDay"
            resources={dataClassInformation.room}
            events={dataClassInformation.event}
            businessHours={businessHours}
            slotDuration="00:30:00"
            locale="en-GB"
            initialDate={query?.startDate}
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

function renderEventContent(eventInfo: {timeText: string, event: {title: string}}) {
    return (
        <div className="flex justify-between">
        <div>
            {" "}
            <strong className="text-xs font-light">{eventInfo.timeText}</strong>
            <br />
            <span>{eventInfo.event.title}</span>
            <br />
        </div>
        </div>
    );
}

export default TableClassInformation;
