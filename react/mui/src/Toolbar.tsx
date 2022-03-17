import { Fab } from '@material-ui/core';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import {
  anoccaPalette,
  SeqAnnotationDirectionsEnum,
  CircularSelection,
  getNtComplement
} from '@anocca/sequence-viewer-utils';
import { FaEye, FaEyeSlash, FaRegCopy, FaTrash } from 'react-icons/fa';

const FabWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ paddingRight: '8px' }}>{children}</div>;
};

/**
 * A toolbar component.
 *
 * See:
 * {@link @anocca/sequence-viewer-utils#CircularSelection | CircularSelection},
 * {@link @anocca/sequence-viewer-utils#SeqAnnotationDirectionsEnum | SeqAnnotationDirectionsEnum}
 *
 * @public
 */
export const Toolbar = ({
  selectedAnnotations,
  circularSelections,
  sequence,
  createAnnotation,
  onHide,
  onShow,
  onDelete,
  onCopySuccess,
  onCopyError
}: {
  selectedAnnotations: string[];
  circularSelections: CircularSelection[];
  sequence: string;
  createAnnotation: (locations: [number, number][], direction: SeqAnnotationDirectionsEnum) => void;
  onHide: (selectionAnnotations: string[]) => void;
  onShow: (selectionAnnotations: string[]) => void;
  onDelete: (selectionAnnotations: string[]) => void;
  onCopySuccess?: () => void;
  onCopyError?: () => void;
}) => {
  const maybeSucceed = () => {
    if (onCopySuccess) {
      onCopySuccess();
    }
  };
  const maybeFail = () => {
    if (onCopyError) {
      onCopyError();
    }
  };
  const copy = () => {
    if (window.getSelection()?.type === 'Range') {
      return;
    }
    const text = circularSelections
      .map((c) => {
        if (c.antiClockwise === false) {
          if (c.start > c.end) {
            return sequence.slice(c.start) + sequence.slice(0, c.end + 1);
          } else {
            return sequence.slice(c.start, c.end + 1);
          }
        }
        if (c.antiClockwise === true) {
          const _getComp = (seq: string) => {
            return seq
              .split('')
              .reverse()
              .map((s) => getNtComplement(s))
              .join('');
          };
          if (c.start < c.end) {
            return _getComp(sequence.slice(c.end) + sequence.slice(0, c.start + 1));
          } else {
            return _getComp(sequence.slice(c.end, c.start + 1));
          }
        }
        return '';
      })
      .join('\n');
    if (text === '') {
      return;
    }
    navigator.permissions
      .query({ name: 'clipboard-write' } as any)
      .then((result: any) => {
        if (result.state == 'granted' || result.state == 'prompt') {
          navigator.clipboard.writeText(text).then(
            () => {
              maybeSucceed();
            },
            function () {
              maybeFail();
            }
          );
        } else {
          maybeFail();
        }
      })
      .catch(() => {
        maybeFail();
      });
  };

  const triggeredCopy = React.useRef(false);

  const down = (ev: KeyboardEvent) => {
    if (!triggeredCopy.current && ev.metaKey && ev.keyCode === 67) {
      triggeredCopy.current = true;
      copy();
    } else {
      triggeredCopy.current = false;
    }
  };

  const downRef = React.useRef(down);
  downRef.current = down;

  React.useEffect(() => {
    const evHdlr = (ev: KeyboardEvent) => {
      downRef.current(ev);
    };
    window.addEventListener('keydown', evHdlr, { passive: true });
    return () => {
      window.removeEventListener('keydown', evHdlr);
    };
  }, []);

  React.useEffect(() => {
    const up = () => {
      triggeredCopy.current = false;
    };
    window.addEventListener('up', up);
    return () => {
      window.removeEventListener('up', up);
    };
  }, []);

  const hasSelection = circularSelections[0]?.antiClockwise !== undefined;
  const onCopy = () => {
    copy();
  };
  const onAdd = () => {
    const ac = circularSelections[0].antiClockwise;
    const invalidSelection = circularSelections.find((selection) => {
      return selection.antiClockwise !== ac;
    });
    if (invalidSelection) {
      alert('All selections must have the same direction when creating a new annotation');
      return;
    }
    const locations = circularSelections.map((selection) => {
      return (
        selection.antiClockwise === true
          ? [selection.end + 1, selection.start + 1]
          : [selection.start + 1, selection.end + 1]
      ) as [number, number];
    });
    createAnnotation(
      locations,
      ac ? SeqAnnotationDirectionsEnum.REVERSE : SeqAnnotationDirectionsEnum.FORWARD
    );
  };
  return (
    <>
      <FabWrapper>
        <Fab disabled={!hasSelection} onClick={onAdd} color="primary" size="small">
          <MdAdd />
        </Fab>
      </FabWrapper>
      {hasSelection && (
        <>
          <FabWrapper>
            <Fab onClick={onCopy} size="small">
              <FaRegCopy />
            </Fab>
          </FabWrapper>
          <FabWrapper>
            <Fab
              size="small"
              onClick={() => {
                onHide(selectedAnnotations);
              }}
            >
              <FaEyeSlash />
            </Fab>
          </FabWrapper>
          <FabWrapper>
            <Fab
              size="small"
              onClick={() => {
                onShow(selectedAnnotations);
              }}
            >
              <FaEye />
            </Fab>
          </FabWrapper>
          <FabWrapper>
            <Fab
              size="small"
              style={{
                backgroundColor: anoccaPalette.accent4Light,
                color: anoccaPalette.secondaryBackground
              }}
              onClick={() => {
                onDelete(selectedAnnotations);
              }}
            >
              <FaTrash />
            </Fab>
          </FabWrapper>
        </>
      )}
    </>
  );
};
