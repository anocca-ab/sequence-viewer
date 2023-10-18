import React from 'react'
import { FilterChromatogramType } from '../../shared/lib'
import { FormControl, FormLabel, FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { dnaColors } from '../../../utils/lib';

const options = ["A", "C", "G", "T", "phred"]

const getBaseColor = (ntOrAa: string) => {
  if (ntOrAa === 'phred') return 'rgba(0,0,0,0.2)'
  return dnaColors[ntOrAa];
};
/**
 * See {@link @anocca/sequence-viewer-react-shared#FilterChromatogram | FilterChromatogram}
 *
 * @public
 */
export const FilterChromatogram: FilterChromatogramType = ({ optionsToRender, setOptionsToRender }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setOptionsToRender([...optionsToRender, e.target.value])
    } else {
      const filteredOptions = optionsToRender.filter(option => option !== e.target.value)
      setOptionsToRender(filteredOptions)
    }
  }

  return (
    <FormControl component="fieldset" sx={{ border: '1px solid rgba(0,0,0,0.15)' }}>
      <FormLabel sx={{ fontSize: '20px', px: 1 }} component="legend">Filter Chomatogram</FormLabel>
      <FormGroup row>
        {options.map(option =>
          <FormControlLabel
            key={option}
            sx={{ color: getBaseColor(option), fontWeight: 'bold' }}
            control={<Checkbox
              size="small"
              onChange={handleChange}
              value={option}
              checked={optionsToRender.includes(option)}
              name={option}
              sx={{
                color: getBaseColor(option),
                '&.Mui-checked': {
                  color: getBaseColor(option),
                },
              }}
            />
            }
            label={option}
            labelPlacement="bottom"
          />
        )
        }
      </FormGroup>
    </FormControl>
  )
}
