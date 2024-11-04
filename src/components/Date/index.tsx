import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import moment, { Moment } from 'moment';
import { DatePickerWrapper, StyledDatetime } from './styled.module';
import { useLanguage } from '../../context/LanguageContext';

interface DateProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const Date: React.FC<DateProps> = ({ selected, onChange }) => {
  const [date, setDate] = useState<Moment | null>(selected ? moment(selected) : null);
  const { selectedLanguage } = useLanguage();

  const handleDateChange = (date: Moment | string) => {
    if (moment.isMoment(date)) {
      setDate(date);
      onChange(date.toDate());
    } else {
      const momentDate = moment(date, 'DD/MM/YYYY');
      setDate(momentDate);
      onChange(momentDate.toDate()); 
    }
  };

  return (
    <DatePickerWrapper>
      <label>
        {selectedLanguage === "pt-BR"
          ? "Data de Nascimento"
          : selectedLanguage === "en-US"
          ? "Birth Date"
          : "Geburtsdatum"}
      </label>
      <StyledDatetime
        value={date ? date : undefined} 
        onChange={handleDateChange}
        dateFormat="DD/MM/YYYY"
        timeFormat={false} 
        inputProps={{ placeholder: selectedLanguage === "pt-BR"
          ? "Selecione uma data"
          : selectedLanguage === "en-US"
          ? "Select a date"
          : "Wählen Sie ein Datum aus"} } 
      />
    </DatePickerWrapper>
  );
};

export default Date;
