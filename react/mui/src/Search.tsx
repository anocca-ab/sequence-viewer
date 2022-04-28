import React from 'react';
import { getReverseComplement, SearchResult, sequenceMatch } from '@anocca/sequence-viewer-utils';
import { ClickAwayListener, IconButton, Input, Tooltip } from '@mui/material';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { Flex, SearchComponent } from '@anocca/sequence-viewer-react-shared';

/**
 * See {@link @anocca/sequence-viewer-react-shared#SearchComponent | SearchComponent}
 *
 * @public
 */
export const Search: SearchComponent = ({
  sequence,
  zoomOnResult,
  onSearchResults,
  spinOnResult,
  isProtein
}) => {
  const [_searchResultIndex, _setSearchResultIndex] = React.useState(-1);
  const [_searchByReverseComplement, _setSearchByReverseComplement] = React.useState(false);
  const [_searchValue, _setSearchValue] = React.useState('');

  const maybeReverseSearchValue = React.useCallback(
    (searchValue: string, searchByReverseComplement: boolean) => {
      if (searchByReverseComplement) {
        try {
          return getReverseComplement(false, searchValue);
        } catch (err) {
          return '';
        }
      }
      return searchValue;
    },
    []
  );

  const getSearchResults = (
    searchValue: string,
    searchByReverseComplement: boolean,
    searchResultIndex: number
  ) => {
    const v = maybeReverseSearchValue(searchValue, searchByReverseComplement);
    const seq = sequence.toUpperCase();
    if (!v.length) {
      return [];
    }
    const results: SearchResult[] = [];
    for (let i = 0; i < seq.length - v.length; i += 1) {
      if (sequenceMatch(isProtein, seq.substr(i, v.length), v)) {
        results.push({
          start: i,
          end: i + v.length,
          active: results.length === searchResultIndex,
          complement: searchByReverseComplement
        });
      }
    }
    return results;
  };

  const setSearchValue = (
    searchValue: string,
    searchByReverseComplement: boolean,
    searchResultIndex: number,
    _spin: boolean
  ) => {
    let __searchResultIndex = searchResultIndex;
    let spin = _spin;

    const results = getSearchResults(searchValue, searchByReverseComplement, __searchResultIndex);

    if (results.length > 0 && __searchResultIndex === -1) {
      __searchResultIndex = 0;
      results[0].active = true;
      spin = true;
    }
    _setSearchValue(searchValue);
    _setSearchByReverseComplement(searchByReverseComplement);
    _setSearchResultIndex(__searchResultIndex);

    onSearchResults(results);
    if (spin) {
      spinOnResult({
        start: results[__searchResultIndex].start,
        end: results[__searchResultIndex].end,
        active: results[__searchResultIndex].active,
        complement: searchByReverseComplement
      });
    }
  };
  const searchResults = getSearchResults(_searchValue, _searchByReverseComplement, _searchResultIndex);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none'
      }}
    >
      <div style={{ paddingRight: '0px' }}>
        <Input
          placeholder="AHNRKYCDGT"
          endAdornment={
            <Flex alignItems="center">
              {!isProtein && (
                <Tooltip title={`Search by reverse complement`}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearchValue(_searchValue, !_searchByReverseComplement, -1, false);
                    }}
                  >
                    {_searchByReverseComplement ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={'Zoom on result'}>
                <IconButton
                  onClick={() => {
                    if (searchResults.length > 0 && _searchResultIndex !== -1) {
                      zoomOnResult({
                        start: searchResults[_searchResultIndex].start,
                        end: searchResults[_searchResultIndex].end,
                        active: searchResults[_searchResultIndex].active,
                        complement: _searchByReverseComplement
                      });
                    }
                  }}
                  size="small"
                >
                  <IoIosSearch />
                </IconButton>
              </Tooltip>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                  <Tooltip
                    title={'Search by IUPAC nucleotide codes: https://www.bioinformatics.org/sms/iupac.html'}
                    disableHoverListener
                    disableFocusListener
                    disableTouchListener
                    open={tooltipOpen}
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={handleTooltipClose}
                  >
                    <IconButton size="small" onClick={handleTooltipOpen}>
                      <AiOutlineQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </Flex>
          }
          value={_searchValue}
          onChange={(ev) => {
            setSearchValue(ev.currentTarget.value.toUpperCase(), _searchByReverseComplement, -1, false);
          }}
        />
      </div>
      <div style={{ paddingLeft: '8px' }}>
        {_searchResultIndex + 1}/{searchResults.length}
      </div>
      <div>
        <IconButton
          size="small"
          onClick={() => {
            if (searchResults.length === 0) {
              return;
            }
            let nextIndex = _searchResultIndex + 1;
            if (nextIndex >= searchResults.length) {
              nextIndex = 0;
            }
            setSearchValue(_searchValue, _searchByReverseComplement, nextIndex, true);
          }}
        >
          <FaCaretUp />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            if (searchResults.length === 0) {
              return;
            }
            let nextIndex = _searchResultIndex - 1;
            if (nextIndex < 0) {
              nextIndex = searchResults.length - 1;
            }
            setSearchValue(_searchValue, _searchByReverseComplement, nextIndex, true);
          }}
        >
          <FaCaretDown />
        </IconButton>
      </div>
    </div>
  );
};
