/**
 * Countdown widget config (days left in the year / month / week / day)
 * Place at: src/config/countdownConfig.ts
 */

export type CountdownEvent = {
	name: string;
	/**
	 * "YYYY-MM-DD" = one-off (e.g. "2027-03-10")
	 * "MM-DD"      = repeats every year (e.g. "08-17")
	 */
	date: string;
};

export type CountdownConfig = {
	// Widget title
	title: string;
	// IANA timezone used for all calculations
	timezone: string;
	// Locale used to format the date in the header
	locale: string;
	// First day of the week: 1 = Monday, 0 = Sunday
	weekStartsOn: 0 | 1;
	// Text for each row. {n} is replaced with the remaining number
	labels: {
		year: string;
		month: string;
		week: string;
		day: string;
	};
	// "Next event" footer (optional)
	nextEvent: {
		enable: boolean;
		label: string; // small text above the event name
		today: string; // text shown when the event is today
		daysUnit: string; // unit next to the big number
		events: CountdownEvent[];
	};
};

export const countdownConfig: CountdownConfig = {
	// title: "This Year, Month & Day",
	timezone: "Asia/Jakarta",
	locale: "en-US",
	weekStartsOn: 1,
	labels: {
		year: "{n} days left this year",
		month: "{n} days left this month",
		week: "{n} days left this week",
		day: "{n} hours left today",
	},
	nextEvent: {
		enable: true,
		label: "Next event",
		today: "Today",
		daysUnit: "days",
		events: [
			{ name: "New Year's Day", date: "01-01" },
			{ name: "Isra Mi'raj Prophet Muhammad SAW", date: "01-05" },
			{ name: "Chinese New Year Joint Holiday", date: "02-06" },
			{ name: "Balinese Hindu New Year", date: "03-08" },
			{ name: "Eid Al-Fithr", date: "03-10" },
			{ name: "International May Day", date: "05-01" },
			{ name: "Eid Al-Adha", date: "05-17" },
			{ name: "Vesak Day", date: "05-20" },
			{ name: "Pancasila Day", date: "06-01" },
			{ name: "Islam New Year 1449", date: "06-06" },
			{ name: "Birthday of Prophet Muhammad SAW", date: "08-15" },
			{ name: "Indonesian Independence Day", date: "08-17" },
			// One-off event example:
			// { name: "Proposal Defense", date: "2027-02-20" },
		],
	},
};
