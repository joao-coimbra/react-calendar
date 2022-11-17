import { useState } from "react";

import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";

import ptBR from "date-fns/locale/pt-BR";
import { getDay, getDate, setHours, setMinutes, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("br", ptBR);

function Calendar() {
	const [selectDate, setSelectDate] = useState(null);

    const disableDates = [
        setHours(setMinutes(new Date(), 30), 16),
        setHours(setMinutes(addDays(new Date(), 1), 30), 16),
        setHours(setMinutes(addDays(new Date(), 1), 30), 8),
        setHours(setMinutes(new Date(), 30), 17),
        setHours(setMinutes(new Date(), 0), 10),
    ]

	const isWeekday = (date) => {
		const day = getDay(date);
		return day !== 0 && day !== 6;
	};

	const renderDayContents = (day, date) => {
		const tooltipText = `Tooltip for date: ${date}`;
		return (
			<span className='font-bold' title={tooltipText}>
				{getDate(date)}
			</span>
		);
	};

    const dayClassName = (date) =>
    date.toLocaleDateString() !==
    selectDate?.toLocaleDateString()
        ? "duration-200 bg-sky-600 !text-white !rounded hover:bg-sky-400"
        : undefined

	return (
		<div className='mx-auto h-screen flex flex-col gap-4 items-center justify-center'>
			<h1>
				{selectDate
					?.toLocaleDateString("pt-br", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					})
					.split(" ")
					.join(" ás ")}
			</h1>
            <div className="lol flex">
            <DatePicker
				selected={selectDate}
				onChange={(date) => setSelectDate(date)}
				minDate={new Date()}
				maxDate={addDays(new Date(), 7)}
				filterDate={isWeekday}
				renderDayContents={renderDayContents}
				dayClassName={dayClassName}
				disabledKeyboardNavigation
				showTimeSelect
				locale='br'
				dateFormat="dd 'de' MMMM, yyyy 'ás' hh:mm aa"
                // excludeDates={disableDates}
				minTime={setHours(setMinutes(new Date(), 0), 8)}
				maxTime={setHours(setMinutes(new Date(), 0), 18)}
                excludeTimes={disableDates}
				timeFormat='HH:mm'
				timeCaption='Horário'
				inline
			>
                <div className="text-red-600 p-2 text-xs">{selectDate
					?.toLocaleDateString("pt-br", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					})
					.split(" ")
					.join(" ás ").substring(14)  === "00:00" && 'Selecione um horário válido!'}</div>
                    </DatePicker>
            </div>
			
            
		</div>
	);
}

export default Calendar;
