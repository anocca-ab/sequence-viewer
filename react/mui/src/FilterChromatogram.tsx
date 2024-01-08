import React from 'react';
import { FilterChromatogramType } from '@anocca/sequence-viewer-react-shared';
import { Box, FormControl, FormGroup, Checkbox } from '@mui/material';
import { dnaColors } from '@anocca/sequence-viewer-utils';

const options = ['A', 'C', 'G', 'T', 'phred'];

const getBaseColor = (ntOrAa: string) => {
  if (ntOrAa === 'phred') return '#1976d2';
  return dnaColors[ntOrAa];
};

const CheckboxComponent = ({ base, checked }: { base: string; checked: boolean }) => {
  return (
    <Box
      sx={{
        px: 1.5,
        minWidth: '30px',
        border: `1px solid ${getBaseColor(base)}`,
        color: checked ? 'white' : getBaseColor(base),
        backgroundColor: checked ? getBaseColor(base) : 'rgba(0,0,0,0.01)',
        borderRadius: '40px',
        boxShadow: checked ? 3 : 0,
        opacity: checked ? 1 : 0.75
      }}
    >
      {base}
    </Box>
  );
};
/**
 * See {@link @anocca/sequence-viewer-react-shared#FilterChromatogram | FilterChromatogram}
 *
 * @public
 */
export const FilterChromatogram: FilterChromatogramType = ({ optionsToRender, setOptionsToRender }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setOptionsToRender([...optionsToRender, e.target.value]);
    } else {
      const filteredOptions = optionsToRender.filter((option) => option !== e.target.value);
      setOptionsToRender(filteredOptions);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {options.map((option) => (
        <Checkbox
          sx={{ px: 0.5 }}
          key={option}
          size="small"
          icon={<CheckboxComponent base={option} checked={false} />}
          checkedIcon={<CheckboxComponent base={option} checked={true} />}
          onChange={handleChange}
          value={option}
          checked={optionsToRender.includes(option)}
          name={option}
          disableRipple
        />
      ))}
    </Box>
  );
};
