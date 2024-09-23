import * as React from 'react';
import { ComboBox, Popover } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

export default function Page() {
  const [searchParams] = useSearchParams();

  if (searchParams.get('nestedComboBox')) {
    return <NestedComboBoxTest />;
  }

  return <FocusTest />;
}

// ----------------------------------------------------------------------------

function NestedComboBoxTest() {
  return (
    <Popover
      applyBackground
      content={
        <div>
          <h2>Popover title</h2>
          <ComboBox
            options={React.useMemo(
              () => [
                { label: 'Item 1', value: 1 },
                { label: 'Item 2', value: 2 },
                { label: 'Item 3', value: 3 },
              ],
              [],
            )}
          />
        </div>
      }
    >
      <button>Open</button>
    </Popover>
  );
}

// ----------------------------------------------------------------------------

function FocusTest() {
  const [searchParams] = useSearchParams();

  const shouldImperativeFocus = searchParams.get('imperativeFocus') === 'true';
  const shouldFocusInput = searchParams.get('focusInput') === 'true';

  return (
    <Popover
      applyBackground
      content={
        <div>
          <h2
            tabIndex={-1}
            ref={shouldImperativeFocus ? (el) => el?.focus() : undefined}
          >
            Popover title
          </h2>
          <p>Popover content</p>
          {shouldFocusInput && <input />}
        </div>
      }
    >
      <button>Open</button>
    </Popover>
  );
}
