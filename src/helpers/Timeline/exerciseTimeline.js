import formatDate from '@/helpers/formatDate';
import isDate from '@/helpers/isDate';

const createQT = (data) => {
  let date = isDate(data.sjcaTestDate) && formatDate(data.sjcaTestDate) || null;
  let start = isDate(data.sjcaTestStartTime) && formatDate(data.sjcaTestStartTime, 'time') || null;
  let end = isDate(data.sjcaTestEndTime) && formatDate(data.sjcaTestEndTime, 'time') || null;

  if(!date && !start && !end) {
    return null;
  }

  return `${date} - ${start} to ${end}`;
};

const createScenariotest = (data) => {
  let date = isDate(data.scenarioTestDate) && formatDate(data.scenarioTestDate) || null;
  let start = isDate(data.scenarioTestStartTime) && formatDate(data.scenarioTestStartTime, 'time') || null;
  let end = isDate(data.scenarioTestEndTime) && formatDate(data.scenarioTestEndTime, 'time') || null;

  if(!date && !start && !end) {
    return null;
  }

  return `${date} - ${start} to ${end}`;
};

const createSelectionDay = (data) => {
  let selectionDayStart = data.selectionDays && data.selectionDays[0] && isDate(data.selectionDays[0].selectionDayStart) && formatDate(data.selectionDays[0].selectionDayStart) || null;
  let selectionDayEnd = data.selectionDays && data.selectionDays[0] && isDate(data.selectionDays[0].selectionDayEnd) && formatDate(data.selectionDays[0].selectionDayEnd) || null;

  if(!selectionDayStart && !selectionDayEnd) {
    return null;
  }

  return `${selectionDayStart} to ${selectionDayEnd}`;
};

const exerciseTimeline = (data) => {
  return [
  {
    entry: 'Open for applications', 
    date: isDate(data.applicationOpenDate) ? formatDate(data.applicationOpenDate) : null,
  },
  {
    entry: 'Closed for applications', 
    date: isDate(data.applicationCloseDate) ? formatDate(data.applicationCloseDate) : null,
  },
  {
    entry: 'QT', 
    date: createQT(data),
  },
  {
    entry: 'Paper sift', 
    date: isDate(data.paperSiftDate) ? formatDate(data.paperSiftDate) : null,
  },
  {
    entry: 'QT outcome to candidates', 
    date: isDate(data.sjcaTestOutcome) ? formatDate(data.sjcaTestOutcome, 'month') : null,
  },
  {
    entry: 'Scenario test', 
    date: createScenariotest(data),
  },
  {
    entry: 'Scenario test outcome to candidates', 
    date: isDate(data.scenarioTestOutcome) ? formatDate(data.scenarioTestOutcome) : null,
  },
  {
    entry: 'Contact independent assessors', 
    date: isDate(data.contactIndependentAssessors) ? formatDate(data.contactIndependentAssessors) : null,
  },
  {
    entry: 'Selection day', 
    date: createSelectionDay(data),
  },
  {
    entry: 'Character checks', 
    date: isDate(data.characterChecks) ? formatDate(data.characterChecks, 'month') : null,
  },
  {
    entry: 'Statutory consultation', 
    date: isDate(data.statutoryConsultation) ? formatDate(data.statutoryConsultation, 'month') : null,
  },
  {
    entry: 'Selection process outcome', 
    date: isDate(data.finalOutcome) ? formatDate(data.finalOutcome, 'month') : null,
  }];
};

export default exerciseTimeline;